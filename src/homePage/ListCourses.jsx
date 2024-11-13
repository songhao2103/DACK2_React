import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCourseViewed } from "../redux-store/actions/actions";
import Course from "./Course";
import { getListDataCourses } from "../api";

const ListCourses = () => {
  const [clickAllCourses, setClickAllCourses] = useState(false); // lưu trạng thái của nút xem tất cả courses
  const dispath = useDispatch();
  const [listDataCourses, setListDataCourses] = useState([]);

  //Lấy dữ liệu từ sever
  useEffect(() => {
    const fetchData = async () => {
      const listDataCourses = await getListDataCourses();
      setListDataCourses(listDataCourses);
    };
    fetchData();
  }, []);

  //Hàm xử lí khi click vào view all
  const handleClickAllCourses = () => {
    setClickAllCourses(!clickAllCourses);
  };

  //Hàm xử lí khi click vào course
  const handleViewCourse = (course) => {
    dispath({
      type: actionCourseViewed.type,
      payload: {
        courseViewed: course,
      },
    });
  };

  //Return========================================================
  return (
    <div className="box_list_courses">
      <div className="top">
        <div className="left">
          <p className="title_h2">Featured courses</p>
          <p className="desc">Explore our Popular Courses</p>
        </div>
        <div className="right">
          <button className="btn_white" onClick={handleClickAllCourses}>
            {clickAllCourses ? "Close All" : "All courses"}
          </button>
        </div>
      </div>
      <div className={`list_courses ${clickAllCourses ? "all" : ""}`}>
        {listDataCourses.map((course, index) => (
          <Link
            key={index}
            to="info_course"
            onClick={() => handleViewCourse(course)}
          >
            <Course course={course}></Course>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListCourses;
