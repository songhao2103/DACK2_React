import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Course from "./Course";
import { getListDataCourses } from "../api";
import Loader from "../loader/Loader";

//Component==================================================================
const ListCourses = () => {
  const [indexPageList, setIndexPageList] = useState(0); //Lưu vị trí trang khi click vào các số chuyển trang
  const [changeArrangement, setChangeArrangement] = useState("rows");
  const [inputValue, setInputValue] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const list = useRef(null); //lấy element list
  const coursePrice = useSelector((state) => state.coursePrice); //lấy ra trạng thái của các ô input ở phần giá
  const courseInstructors = useSelector((state) => state.courseInstructors); // Lấy ra trạng thái của các ô input phần instructors
  const [listDataCourses, setListDataCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //lấy danh sách courses từ sever
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const listDataCourses = await getListDataCourses();
        setListDataCourses(listDataCourses);
        setFilteredCourses(listDataCourses);
      } catch (error) {
        console.log("Lỗi khi fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //lọc course theo instructor
  const filteredInstructorCourses = useMemo(() => {
    let prevListCourses = listDataCourses;
    if (courseInstructors.all) {
      prevListCourses = listDataCourses;
    } else if (courseInstructors.kennyWhite) {
      prevListCourses = prevListCourses.filter(
        (course) => course.instructor === "Kenny White"
      );
    } else if (courseInstructors.johnDoe) {
      prevListCourses = prevListCourses.filter(
        (course) => course.instructor === "John Doe"
      );
    }
    return prevListCourses;
  }, [courseInstructors]);

  //sắp xếp lại danh sách courses theo giá
  const sortedCourses = useMemo(() => {
    let sortedCourses = filteredInstructorCourses;
    if (coursePrice.free) {
      sortedCourses = sortedCourses.filter((course) => course.sale == 100);
    } else if (coursePrice.increase) {
      sortedCourses = filteredInstructorCourses;
      sortedCourses.sort(
        (a, b) =>
          (a.price * (100 - a.sale)) / 100 - (b.price * (100 - b.sale)) / 100
      );
    } else if (coursePrice.reduce) {
      sortedCourses = filteredInstructorCourses;
      sortedCourses.sort(
        (a, b) =>
          (b.price * (100 - b.sale)) / 100 - (a.price * (100 - a.sale)) / 100
      );
    }
    return sortedCourses;
  }, [coursePrice, filteredInstructorCourses]);

  //cập nhật lại danh sách render
  useEffect(() => {
    setFilteredCourses(sortedCourses);
  }, [sortedCourses]);

  let countPage = Math.ceil(filteredCourses.length / 4); // Tính số trang của danh sách courses

  //Đưa về đầu trang mỗi khi render lại
  useEffect(() => {
    setIndexPageList(0);
  }, [coursePrice, courseInstructors, filteredCourses]);

  //Hàm xử lí khi click vào danh sách trang
  const handleClickCountPage = (value) => {
    setIndexPageList(value);
    // setIndexPageList(0);
  };

  // Hàm xử lí khi click vào mũi tên chuyển trang
  const handleClickArrow = (value) => {
    if (
      (indexPageList > 0 && value === -1) ||
      (indexPageList < countPage - 1 && value === 1)
    ) {
      setIndexPageList((prevIndex) => prevIndex + value);
    }
  };

  //xử lí translateY khi indexPageList thay đổi
  useEffect(() => {
    if (list.current) {
      if (changeArrangement === "rows") {
        list.current.style.transform = `translateY(${-indexPageList * 1144}px)`;
      } else {
        list.current.style.transform = `translateY(${-indexPageList * 1021}px)`;
      }
    }
  }, [indexPageList, changeArrangement]);

  //hàm xử lí đổi cách sắp xếp các danh sách courses
  const handleChangeArrangement = (value) => {
    setChangeArrangement(value);
  };

  //Hàm xử lí tìm kiếm courses
  const handleChangeInput = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    setFilteredCourses(() =>
      listDataCourses.filter((item) =>
        item.name.toLowerCase().includes(newInputValue.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div className="list_coursesC">
        <div className="top">
          <div className="left">
            <p className="title_h2">All Coueses</p>
          </div>

          <div className="right">
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                value={inputValue}
                onChange={handleChangeInput}
              />
              <div className="icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div className="icon_menu">
              <i
                onClick={() => handleChangeArrangement("table")}
                className={`fa-solid fa-table-cells-large ${
                  changeArrangement === "table" ? "active" : ""
                }`}
              ></i>
              <i
                onClick={() => handleChangeArrangement("rows")}
                className={`fa-solid fa-list ${
                  changeArrangement === "rows" ? "active" : ""
                }`}
              ></i>
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={`box_list ${changeArrangement}`}>
            <div className={`list ${changeArrangement}`} ref={list}>
              {filteredCourses.map((course, index) => (
                <Course
                  key={index}
                  course={course}
                  changeArrangement={changeArrangement}
                ></Course>
              ))}
            </div>
          </div>
        )}

        {countPage > 1 && (
          <div className="list_page">
            <div
              className={`icon ${indexPageList === 0 ? "block" : ""}`}
              onClick={() => handleClickArrow(-1)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </div>

            {Array.from({ length: countPage }, (_, i) => i).map((_, index) => (
              <p
                className={`stt ${index === indexPageList ? "active" : ""}`}
                key={index}
                onClick={() => handleClickCountPage(index)}
              >
                {index + 1}
              </p>
            ))}

            <div
              className={`icon ${
                indexPageList === countPage - 1 ? "block" : ""
              }`}
              onClick={() => handleClickArrow(1)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCourses;
