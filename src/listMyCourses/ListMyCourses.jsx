import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyCourse from "./MyCourse";
import { actionViewContentCourse } from "../redux-store/actions/actions";
import { useEffect, useState } from "react";
import config from "../config";

const ListMyCourses = () => {
  //Lấy danh sách các khóa học đã đăng ký của người dùng
  const [listCoursesOfUser, setListCoursesOfUser] = useState([]);
  const userLogged = useSelector((state) => state.userLogged);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Lấy dữ data Courses
  useEffect(() => {
    const fetchData = async () => {
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

  return (
    <div className="list_my_courses">
      <p className="title_h1">My Courses</p>
      {listCoursesOfUser !== null &&
        listCoursesOfUser.map((course) => (
          <MyCourse
            key={course.id}
            course={course}
            handleClickCourse={handleClickCourse}
          ></MyCourse>
        ))}
    </div>
  );
};

export default ListMyCourses;
