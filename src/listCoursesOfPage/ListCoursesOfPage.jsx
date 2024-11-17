import { useEffect, useReducer, useState } from "react";
import Loader from "../loader/Loader";
import Course from "./Course";
import LostsOfEditing from "./LostsOfEditing";
import config from "../config";

//phần khởi tọa state
const initialState = {
  //lưu danh sách course ban đâu
  listDataCourses: [],

  //lưu danh sách course sau khi lọc
  listDataCoursesFiltered: [],

  //lưu value của form data
  formData: {
    img: "",
    name: "",
    price: "",
    sale: "",
    instructor: "",
  },

  //lưu trạng thái hiển thị của form
  hiddenFormData: "",

  //Lưu id của course đang được chỉnh sửa
  idCourseEditing: null,

  //Lưu trạng thái các ô chọn
  hiddenChoose: false,

  //Lưu giá trị của các ô input checkbox
  listChecked: [],

  //Lưu các khóa học được chọn
  listSelectedCourses: [],

  //lưu trạng thái hiển thị của list of editing
  hiddenLostsOfEditing: false,

  //lưu giá trị của input search
  valueInputSearch: "",

  //lưu giá trị của debounce
};

//====================================================================================================================================
//phần reducer
const reducer = (state, action) => {
  switch (action.type) {
    //khởi tạo giá trị ban đầu cho listDataCourses và listDataCoursesFiltered
    case "INITIALIZATION": {
      return {
        ...state,
        listDataCourses: action.payload.listDataCourses,
        listDataCoursesFiltered: action.payload.listDataCourses,
        listChecked: action.payload.listChecked,
      };
    }

    //Theo dõi sự thay đổi của form data
    case "CHANGEFORMDATA": {
      const { name, value, type, files } = action.payload.element;
      const newValue = type === "file" ? files[0] : value;
      return {
        ...state,
        formData: { ...state.formData, [name]: newValue },
      };
    }

    //xử lý hiển thị form data
    case "HIDDENFORMDATA":
      return {
        ...state,
        hiddenFormData: action.payload.value,
        formData: { img: "", name: "", price: "", sale: "", instructor: "" },
      };

    //xử lý add courses
    case "ADDCOURSE": {
      return {
        ...state,
        formData: {
          img: "",
          name: "",
          price: "",
          sale: "",
          instructor: "",
        },
        hiddenFormData: "",
      };
    }

    //Xử lý đóng form data
    case "CLOSEFORMDATA":
      return { ...state, hiddenFormData: "" };

    //Xử lý khi click vào edit information
    case "CLICKEDITINFORMATION":
      return {
        ...state,
        hiddenFormData: action.payload.value,
        idCourseEditing: action.payload.id,
      };

    //Chỉnh sửa thông tin course
    case "EDITINFORMATION":
      return {
        ...state,
        formData: {
          img: "",
          name: "",
          price: "",
          sale: "",
          instructor: "",
        },
        hiddenFormData: "",
      };

    //hàm xử lý lọc course free
    case "FILTERFREECOURSE": {
      switch (action.payload.key) {
        case "FREE": {
          const newListDataCoursesFiltered = state.listDataCourses.filter(
            (course) => course.sale === 100
          );
          return {
            ...state,
            listDataCoursesFiltered: newListDataCoursesFiltered,
          };
        }
        case "ARRANGE": {
          const prevlistDataCourses = [...state.listDataCourses];
          const newListDataCoursesFiltered = prevlistDataCourses.sort(
            (a, b) =>
              (a.price * (100 - a.sale) - b.price * (100 - b.sale)) *
              action.payload.value
          );

          return {
            ...state,
            listDataCoursesFiltered: newListDataCoursesFiltered,
          };
        }

        default:
          return { ...state, listDataCoursesFiltered: state.listDataCourses };
      }
    }

    //xử lý hiển thị các ô input chọn các course
    case "HIDDENCHOOSE": {
      const newListChecked = state.listChecked.fill(false);
      return {
        ...state,
        hiddenChoose: !state.hiddenChoose,
        listChecked: newListChecked,
      };
    }

    //Xử lý lưu giá trị của các ô input checkbox
    case "CHANGEINPUTCHECKBOX": {
      const newListChecked = state.listChecked.map((value, index) =>
        index === action.payload.index ? !value : value
      );
      return { ...state, listChecked: newListChecked };
    }

    //Xử lý chọn tất cả các courses
    case "SELECTALLCOURSE": {
      const newListChecked = state.listChecked.fill(true);
      return { ...state, listChecked: newListChecked };
    }

    //Xử lý khi click confirm
    case "CLICKCONFIRM": {
      const newListSelectedCourses = state.listDataCoursesFiltered.filter(
        (_, index) => state.listChecked[index]
      );

      return {
        ...state,
        listSelectedCourses: newListSelectedCourses,
        hiddenLostsOfEditing: true,
      };
    }

    //xử lý khi click đóng lostsOfEditing
    case "CLOSELOSTSOFEDITING": {
      const newListChecked = state.listChecked.fill(false);
      return {
        ...state,
        hiddenLostsOfEditing: false,
        listChecked: newListChecked,
      };
    }

    //xử lý thay đổi của input search
    case "CHANGEINPUTSEARCH":
      return { ...state, valueInputSearch: action.payload.value };

    //xử lý cập nhập giá trị của debounce
    case "DEBOUNCEINPUTSEARCH":
      return { ...state, debounceInputSearch: action.payload.value };

    //xử lý tìm kiếm course
    case "SEARCHCOURSE": {
      const newListDataCoursesFiltered = state.debounceInputSearch
        ? state.listDataCourses.filter((course) =>
            course.name
              .toLowerCase()
              .includes(state.debounceInputSearch.toLowerCase())
          )
        : state.listDataCourses;

      return { ...state, listDataCoursesFiltered: newListDataCoursesFiltered };
    }
    default:
      return state;
  }
};

//function Component=================================================================================
const ListCoursesOfPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [statusFetchData, setStatusFetchData] = useState(false);
  const [listDataCourses, setListDataCourses] = useState([]);

  //lấy dữ liệu từ server
  const fetchListDataCourses = async () => {
    setStatusFetchData(true);
    try {
      const response = await fetch(config.endpoint1 + "list-data-courses");
      if (!response.ok) {
        throw new Error("Lấy data từ server bị lỗi", response.status);
      }
      const listDatas = await response.json();
      setListDataCourses(listDatas);
    } catch (error) {
      console.log("Lấy data từ server bị lỗi", error);
    } finally {
      setStatusFetchData(false);
    }
  };

  useEffect(() => {
    fetchListDataCourses();
  }, []);

  //Khởi tạo lại giá trị của listDataCourses, và listDataCoursesFiltered
  useEffect(() => {
    const listChecked = Array(listDataCourses.length).fill(false);
    dispatch({
      type: "INITIALIZATION",
      payload: {
        listDataCourses: listDataCourses,
        listChecked,
      },
    });
  }, [listDataCourses]);

  //ham theo dõi sự thay đổi của form
  const handleChangeFormData = (e) => {
    dispatch({
      type: "CHANGEFORMDATA",
      payload: {
        element: e.target,
      },
    });
  };

  //hàm xử lý để hiển thị lên form data
  const handleHiddenFormData = (value) => {
    dispatch({
      type: "HIDDENFORMDATA",
      payload: {
        value,
      },
    });
  };

  //hàm xử lý khi add course
  const handleAddCourse = (e) => {
    e.preventDefault();

    const imgUrl = URL.createObjectURL(state.formData.img);
    const newCourse = {
      ...state.formData,
      img: imgUrl,
      id: crypto.randomUUID(),
      students: 156,
      lessons: [
        {
          pdf: "/learning_materials/file_PDF/1-toan-de-tham-khao-2024.pdf",
          name: "Bài học 1-Đề toán",
          id: "866062b3-dd8a-4f48-b215-514f9e9c8231_lesson1",
        },
        {
          pdf: "/learning_materials/file_PDF/10-tieng-nga-de-tham-khao-2024.pdf",
          name: "Bài học 2-Đề Tiếng Nga",
          id: "866062b3-dd8a-4f48-b215-514f9e9c8231_lesson2",
        },
        {
          pdf: "/learning_materials/file_PDF/2-vat-li-de-tham-khao-2024.pdf",
          name: "Bài học 3-Đề Vật lý",
          id: "866062b3-dd8a-4f48-b215-514f9e9c8231_lesson3",
        },
        {
          pdf: "/learning_materials/file_PDF/5-ngu-van-de-tham-khao-2024.pdf",
          name: "Bài học 4-Đề Ngữ Văn",
          id: "866062b3-dd8a-4f48-b215-514f9e9c8231_lesson4",
        },
      ],
    };

    const postCourse = async () => {
      try {
        const response = await fetch(config.endpoint1 + `list-data-courses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCourse),
        });
        if (!response.ok) {
          throw new Error("Post course bị lỗi", response.status);
        }
      } catch (error) {
        console.log("post course bị lỗi", error);
      }
    };

    (async () => {
      await postCourse();
      await fetchListDataCourses();
    })();

    dispatch({
      type: "ADDCOURSE",
    });
  };

  //hàm đóng form data
  const handleCloseFormData = () => {
    dispatch({
      type: "CLOSEFORMDATA",
    });
  };

  //hàm xóa course
  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(
        config.endpoint1 + `list-data-courses/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Xóa course không thành công", response.status);
      }
    } catch (error) {
      console.log("Xóa course không thành công", error);
    }

    fetchListDataCourses();
  };

  //hàm xử lý khi lick vào edit information
  const handleClickEditInformation = (value, id) => {
    dispatch({
      type: "CLICKEDITINFORMATION",
      payload: {
        value,
        id,
      },
    });
  };

  //hàm để chỉnh sửa thông tin của 1 course
  const handleEditInformationCourse = async (e) => {
    e.preventDefault();
    const prevCourse = state.listDataCourses.find(
      (course) => course.id === state.idCourseEditing
    );
    const newImgUrl = state.formData.img
      ? URL.createObjectURL(state.formData.img)
      : null;
    const newCourse = {
      ...prevCourse,
      img: newImgUrl || prevCourse.img,
      name: state.formData.name || prevCourse.name,
      price: state.formData.price || prevCourse.price,
      sale: state.formData.sale || prevCourse.sale,
      instructor: state.formData.instructor || prevCourse.instructor,
    };

    try {
      const response = await fetch(
        config.endpoint1 + `list-data-courses/${state.idCourseEditing}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCourse),
        }
      );

      if (!response.ok) {
        throw new Error("sửa thông tin course bị lỗi", response.status);
      }
    } catch (error) {
      console.log("Sửa thông tin course bị lỗi", error);
    }
    fetchListDataCourses();

    dispatch({
      type: "EDITINFORMATION",
    });
  };

  //hàm lọc các coursecó giá là free
  const handleFilterCourse = (key, value) => {
    dispatch({
      type: "FILTERFREECOURSE",
      payload: {
        key,
        value,
      },
    });
  };

  //hàm hiển thị các ô chọn khi click vào choose multiple
  const handleHiddenChoose = () => {
    dispatch({
      type: "HIDDENCHOOSE",
    });
  };

  //hàm lưu giá trị của các ô input checkbox
  const handleChangeInputCheckbox = (index) => {
    dispatch({
      type: "CHANGEINPUTCHECKBOX",
      payload: {
        index,
      },
    });
  };

  //hàm xử lý chọn tất cae các courses
  const handleSelectAllCourses = () => {
    dispatch({
      type: "SELECTALLCOURSE",
    });
  };

  //hàm xử lý khi click confirm
  const handleClickConfirm = () => {
    dispatch({
      type: "CLICKCONFIRM",
    });
  };

  //hàm xử lý khi đóng lostsOfEditing
  const handleCloseLostsOfEditing = () => {
    dispatch({
      type: "CLOSELOSTSOFEDITING",
    });
  };

  //hàm xử lý thay đổi của input search
  const handleChangeInputSearch = (e) => {
    dispatch({
      type: "CHANGEINPUTSEARCH",
      payload: {
        value: e.target.value,
      },
    });
  };

  //hàm xử lý debounce
  useEffect(() => {
    const timerID = setTimeout(() => {
      dispatch({
        type: "DEBOUNCEINPUTSEARCH",
        payload: {
          value: state.valueInputSearch,
        },
      });
    }, 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, [state.valueInputSearch]);

  //thực hiện tìm kiếm ở ô input
  useEffect(() => {
    dispatch({
      type: "SEARCHCOURSE",
    });
  }, [state.debounceInputSearch]);

  return (
    <div className="list_courses_of_page">
      <div className="nav_bar">
        <ul className="menu">
          <li className="item desc" onClick={() => handleHiddenFormData("add")}>
            Add course
          </li>
          <li className="item desc" onClick={handleHiddenChoose}>
            Choose multiple
          </li>
          {state.hiddenChoose && (
            <li className="item desc" onClick={handleSelectAllCourses}>
              Choose all
            </li>
          )}
          {state.listChecked.some((item) => item) &&
            !state.hiddenLostsOfEditing && (
              <li className="item desc" onClick={handleClickConfirm}>
                Confirm
              </li>
            )}
          <li className="filter">
            <p className="desc">Filter</p>
            <ul className="box_option">
              <li className="desc" onClick={() => handleFilterCourse("")}>
                All
              </li>
              <li className="desc" onClick={() => handleFilterCourse("FREE")}>
                Is on sale
              </li>
              <li
                className="desc"
                onClick={() => handleFilterCourse("ARRANGE", 1)}
              >
                Prices gradually increase
              </li>
              <li
                className="desc"
                onClick={() => handleFilterCourse("ARRANGE", -1)}
              >
                Prices gradually decrease
              </li>
            </ul>
          </li>
        </ul>
        <div className="search">
          <input
            type="text"
            placeholder="Search course"
            onChange={handleChangeInputSearch}
            value={state.valueInputSearch}
          />
        </div>
      </div>

      {/* add_courses */}
      {state.hiddenFormData && (
        <div className="box_add_course">
          <form action="" className="add_course">
            <div className="item">
              <label htmlFor="img">Upload avatar:</label>
              <input
                type="file"
                name="img"
                id="img"
                onChange={handleChangeFormData}
              />
            </div>
            <div className="item">
              <label htmlFor="name">Course name:</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChangeFormData}
                value={state.formData.name}
              />
            </div>
            <div className="item">
              <label htmlFor="price">Course price:</label>
              <input
                type="text"
                id="price"
                name="price"
                onChange={handleChangeFormData}
                value={state.formData.price}
              />
            </div>
            <div className="item">
              <label htmlFor="sale">Discount:</label>
              <input
                type="text"
                id="sale"
                name="sale"
                onChange={handleChangeFormData}
                value={state.formData.sale}
              />
            </div>
            <div className="item">
              <label htmlFor="instructor">Course instructor:</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                onChange={handleChangeFormData}
                value={state.formData.instructor}
              />
            </div>
            {state.hiddenFormData === "add" && (
              <button className="btn_primary" onClick={handleAddCourse}>
                Add Course
              </button>
            )}
            {state.hiddenFormData === "edit" && (
              <button
                className="btn_primary"
                onClick={handleEditInformationCourse}
              >
                Update
              </button>
            )}

            <p className="close" onClick={handleCloseFormData}>
              x
            </p>
          </form>
        </div>
      )}

      {state.hiddenLostsOfEditing && (
        <LostsOfEditing
          listSelectedCourses={state.listSelectedCourses}
          handleCloseLostsOfEditing={handleCloseLostsOfEditing}
          fetchListDataCourses={fetchListDataCourses}
        ></LostsOfEditing>
      )}

      {/* list courses */}

      {statusFetchData ? (
        <Loader />
      ) : (
        <div className="list_courses">
          {state.listDataCoursesFiltered.map((course, index) => (
            <Course
              index
              key={course.id}
              course={course}
              handleDeleteCourse={handleDeleteCourse}
              handleClickEditInformation={handleClickEditInformation}
              hiddenChoose={state.hiddenChoose}
              handleChangeInputCheckbox={() => handleChangeInputCheckbox(index)}
              valueCheckbox={state.listChecked[index]}
            ></Course>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListCoursesOfPage;
