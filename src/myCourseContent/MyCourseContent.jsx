import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import config from "../config";
import { actionInstructorAddLesson } from "../redux-store/actions/actions";

const MyCourseContent = () => {
  const dataCourseFromRedux = useSelector((state) => state.courseViewed); //lấy dữ liệu về course đang được xem
  const userLogged = useSelector((state) => state.userLogged);
  const dispatch = useDispatch();
  const [dataCourse, setDataCourse] = useState(dataCourseFromRedux);

  //lưu trạng hiện thị các file của lessons
  const [hiddenFile, setHiddenFile] = useState(() => {
    const arr = Array(dataCourse.lessons.length).fill(false);
    arr[0] = true;
    return arr;
  });
  const [nameLesson, setNameLesson] = useState(""); //lưu trạng thái của name
  const [pdfViewed, setPdfViewed] = useState(0); //lưu file pdf được render ra
  const [fileAdded, setFileAdded] = useState(null); //lưu file được upload lên
  const [hiddenBoxUpload, setHiddenBoxUpload] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  //   =================================================================================================================================

  //Kiểm tra xem course là của instructor nào
  const instructor = useMemo(() => {
    if (dataCourse.instructor === "Kenny White") {
      return "kennyWhite";
    } else if (dataCourse.instructor === "John Doe") {
      return "johnDoe";
    } else {
      return "";
    }
  }, []);
  //hàm xử lý hiển thị danh sách file của từng lesson
  const handleHiddenFile = (value) => {
    setHiddenFile(hiddenFile.map((_, index) => index === value));
  };

  //hàm xử lí khi click vào các file pdf để hiển thị nội dung bên cạnh
  const handleHiddenContentFile = (value) => {
    setPdfViewed(value);
  };

  //Hàm hiển thị box up load
  const handleHiddenBoxUpload = () => {
    setHiddenBoxUpload(true);
  };

  //Hàm thao dõi giá trị của input name lesson
  const handleChangeInputName = (e) => {
    setNameLesson(e.target.value);
  };

  //Hàm xử lý thay đổi của input upload file
  const handleChangeInput = (e) => {
    setFileAdded(e.target.files[0]);
  };

  //Cập nhật lại hiddenFile mỗi khi dataCourse thay đổi
  useEffect(() => {
    const arr = Array(dataCourse.lessons.length).fill(false);
    arr[0] = true;
    setHiddenFile(arr);
  }, [dataCourse]);

  //Cập nhật lại dataCourse mỗi khi thêm 1 lesson
  useEffect(() => {
    if (fileAdded) {
      const newFileUrl = URL.createObjectURL(fileAdded);
      setFileUrl(newFileUrl);
    }
    // Release the object URL after setting dataCourse
    return () => URL.revokeObjectURL(fileUrl);
  }, [fileAdded]);

  //Hàm xử lý khi click vào confirm
  const handleClickConfirm = async () => {
    setHiddenBoxUpload(false);
    if (fileAdded instanceof File) {
      const newLesson = {
        pdf: fileUrl,
        id: `${dataCourse.id}_lesson${dataCourse.lessons.length + 1}`,
        name: nameLesson,
      };

      const updatedDataCourse = {
        ...dataCourse,
        lessons: [...dataCourse.lessons, newLesson],
      };

      try {
        const response = await fetch(
          config.endpoint1 + `list-data-courses/${dataCourse.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDataCourse),
          }
        );

        if (!response.ok) {
          throw new Error("Thêm lesson không thành công", response.status);
        }
      } catch (error) {
        console.log("Thêm lesson không thành công", error);
      }

      setDataCourse(updatedDataCourse);
      setNameLesson("");
      setFileAdded(null); 
      dispatch({
        type: actionInstructorAddLesson.type,
      });
    }
  };

  //hàm để xóa các lesson
  const handleDeleteLesson = async (id) => {
    const newLessons = dataCourse.lessons.filter((lesson) => lesson.id !== id);
    const updateDataCourse = { ...dataCourse, lessons: newLessons };
    try {
      const response = await fetch(
        config.endpoint1 + `list-data-courses/${updateDataCourse.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateDataCourse),
        }
      );

      if (!response.ok) {
        throw new Error("Xóa lesson không thành công", response.status);
      }
    } catch (error) {
      console.log("Xóa lesson không thành công", error);
    }
    setPdfViewed(0);
    setDataCourse(updateDataCourse);
    const listUsers = JSON.parse(localStorage.getItem("listUsers"));
    const listCoursesOfUser = [...userLogged.courses];
    const newListCoursesOfUser = listCoursesOfUser.map((course) =>
      course.id === updateDataCourse.id ? updateDataCourse : course
    );
    const newUser = { ...userLogged, courses: newListCoursesOfUser };
    const newListUsers = listUsers.map((user) =>
      user.email === userLogged.email ? newUser : user
    );

    localStorage.setItem("listUsers", JSON.stringify(newListUsers));
  };

  return (
    <div className="my_course_content">
      <div className="title_h2">{dataCourse.name}</div>
      <div className="content">
        <div className="list_lessons">
          {dataCourse.lessons.map((lesson, index) => (
            <div className="lesson" key={index}>
              <p className="title_h5" onClick={() => handleHiddenFile(index)}>
                Lesson {index + 1}
              </p>
              {hiddenFile[index] && (
                <div className="box_file">
                  <p
                    className="desc"
                    onClick={() => handleHiddenContentFile(index)}
                  >
                    {lesson.name}
                  </p>
                  {instructor === userLogged.account.email && (
                    <button className="delete desc">
                      <i
                        className="fa-solid fa-xmark"
                        onClick={() => handleDeleteLesson(lesson.id)}
                      ></i>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {instructor === userLogged.account.email && (
            <p className="desc add" onClick={handleHiddenBoxUpload}>
              Add Lesson
            </p>
          )}
        </div>

        {hiddenBoxUpload && (
          <div className="add_lesson">
            <input type="file" onChange={handleChangeInput} />
            <input
              type="text"
              className="name"
              placeholder="Nhập tên bài học"
              onChange={handleChangeInputName}
              value={nameLesson}
            />
            <div className="file_upload">
              <button className="add" onClick={handleClickConfirm}>
                Confirm
              </button>
            </div>
          </div>
        )}

        <Worker workerUrl="//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
          <div className="box_view">
            <Viewer fileUrl={dataCourse.lessons[pdfViewed].pdf}></Viewer>
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default MyCourseContent;
