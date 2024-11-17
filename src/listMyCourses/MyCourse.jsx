import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { actionUserDeleteCourseFromMyList } from "../redux-store/actions/actions";

const MyCourse = ({ course, handleClickCourse }) => {
  const dispatch = useDispatch();
  const [hiddenAlert, setHiddenAlert] = useState(false);
  const userLogged = useSelector((state) => state.userLogged);

  //hàm hiển thị thông báo
  const handleHiddenAlert = (value) => {
    setHiddenAlert(() => (value === "display" ? true : false));
  };

  //hàm xử lý xác nhận xóa khóa học
  const handleDeleteCourseFromMyList = (idCourse) => {
    const accountIsSaved = JSON.parse(localStorage.getItem("accountIsSaved"));
    const listUsers = JSON.parse(localStorage.getItem("listUsers"));
    console.log(userLogged);

    const newListCoursesOfUser = userLogged.courses.filter(
      (id) => id !== idCourse
    );
    const newUserLogged = { ...userLogged, courses: newListCoursesOfUser };

    dispatch({
      type: actionUserDeleteCourseFromMyList.type,
      payload: {
        newUserLogged,
      },
    });

    if (accountIsSaved) {
      localStorage.setItem("accountIsSaved", JSON.stringify(newUserLogged));
    }

    const newListUsers = listUsers.map((user) =>
      user.account.email === userLogged.account.email ? newUserLogged : user
    );
    localStorage.setItem("listUsers", JSON.stringify(newListUsers));

    setHiddenAlert(false);
  };
  return (
    <div className="box_my_course">
      <div className="my_course" onClick={() => handleClickCourse(course)}>
        <div className="image">
          <img src={course.img} alt="" />
        </div>

        <div className="right">
          <p className="title_h4">{course.name}</p>
          <div className="bottom">
            <div className="item">
              <div className="icon">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <p className="desc">{course.students} Student</p>
            </div>
            <div className="item">
              <div className="icon">
                <i className="fa-solid fa-clipboard"></i>
              </div>
              <p className="desc">{course.lessons.length} Lessons</p>
            </div>
          </div>
        </div>
      </div>
      <div className="icon_delete" onClick={() => handleHiddenAlert("display")}>
        <i className="fa-solid fa-trash-can"></i>
      </div>

      {hiddenAlert && (
        <div className="box_alert">
          <div className="alert">
            <p className="desc">Xác nhận xóa khóa học</p>
            <div className="btn">
              <button
                className="btn_white"
                onClick={() => handleHiddenAlert("")}
              >
                Cancel
              </button>
              <button
                className="btn_primary"
                onClick={() => handleDeleteCourseFromMyList(course.idCourse)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourse;
