import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyCourse from "./MyCourse";
import { actionViewContentCourse } from "../redux-store/actions/actions";

const ListMyCourses = () => {
  //Lấy danh sách các khóa học đã đăng ký của người dùng
  const listCourses = useSelector((state) =>
    state.userLogged ? state.userLogged.courses : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      {listCourses !== null &&
        listCourses.map((course) => (
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
