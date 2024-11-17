import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyCourse from "./MyCourse";
import { actionViewContentCourse } from "../redux-store/actions/actions";
import { useEffect, useState } from "react";
import config from "../config";
import { actionUserDeleteCourseFromMyList } from "../redux-store/actions/actions";
import Loader from "../loader/Loader";

const ListMyCourses = () => {
  //Lấy danh sách các khóa học đã đăng ký của người dùng
  const [listCoursesOfUser, setListCoursesOfUser] = useState([]);
  const userLogged = useSelector((state) => state.userLogged);
  const dispatch = useDispatch();
  const [hiddenAlert, setHiddenAlert] = useState({});
  const [isLoading, setIsLoadding] = useState(true);

  const navigate = useNavigate();

  //Lấy dữ data Courses
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadding(true);
      try {
        const response = await fetch(config.endpoint1 + `list-data-courses`);
        if (!response.ok) {
          throw new Error("Lấy data bị lỗi", response.status);
        }
        const listDataCourses = await response.json();
        const listDataCoursesOfUser = listDataCourses.filter((course) =>
          userLogged.courses.includes(course.idCourse)
        );
        setListCoursesOfUser(listDataCoursesOfUser);
      } catch (error) {
        console.log("Lấy data bị lỗi", error);
      }
    };
    fetchData();
    setIsLoadding(false);
  }, []);

  //Hàm xử lý đưa dữ liệu của courses lên state của redux khi được click
  const handleClickCourse = (course) => {
    dispatch({
      type: actionViewContentCourse.type,
      payload: {
        course,
        navigate,
      },
    });
  };

  //hàm hiển thị thông báo
  const handleHiddenAlert = (idCourse, value) => {
    setHiddenAlert((prevHiddenAlert) => ({
      ...prevHiddenAlert,
      [idCourse]: value === "display",
    }));
  };

  //hàm xử lý xác nhận xóa khóa học
  const handleDeleteCourseFromMyList = (idCourse) => {
    const accountIsSaved = JSON.parse(localStorage.getItem("accountIsSaved"));
    const listUsers = JSON.parse(localStorage.getItem("listUsers"));

    const newListCoursesOfUser = userLogged.courses.filter(
      (id) => id !== idCourse
    );
    setListCoursesOfUser((prevListCoursesOfUser) =>
      prevListCoursesOfUser.filter((course) => course.idCourse !== idCourse)
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

    setHiddenAlert((prevHiddenAlert) => {
      const newHiddenAlert = { ...prevHiddenAlert };
      delete newHiddenAlert[idCourse];
      return newHiddenAlert;
    });
  };

  return (
    <div className="box_list_my_courses">
      {isLoading ? (
        <div className="box_loader_list_my_courses">
          <Loader />
        </div>
      ) : (
        <div className="list_my_courses">
          <p className="title_h1">My Courses</p>
          {listCoursesOfUser !== null &&
            listCoursesOfUser.map((course) => (
              <MyCourse
                handleDeleteCourseFromMyList={handleDeleteCourseFromMyList}
                key={course.idCourse}
                course={course}
                handleClickCourse={handleClickCourse}
                handleHiddenAlert={(value) =>
                  handleHiddenAlert(course.idCourse, value)
                }
                hiddenAlert={hiddenAlert[course.idCourse] || false}
              ></MyCourse>
            ))}
        </div>
      )}
    </div>
  );
};

export default ListMyCourses;
