import { useSelector } from "react-redux";
import { useMemo } from "react";
import CourseContent from "./CourseContent";
import InfoCourse from "./InfoCourse";
import MediaStart from "./MediaStart";

const InfoCoursePage = () => {
  const userLogged = useSelector((state) => state.userLogged); //Lấy danh thông tin tài khoản đang đăng nhập từ state
  const courseViewed = useSelector((state) => state.courseViewed); // lấy thông tin khóa học đang được xem

  const checkMedia = useMemo(() => {
    if (userLogged === null) {
      return true;
    }

    const checkCourse = userLogged.courses.find(
      (course) => course.id === courseViewed.id
    );

    if (!checkCourse) {
      return true;
    }
    return false;
  }, [userLogged, courseViewed]);

  return (
    <div className="info_course_page">
      <InfoCourse></InfoCourse>
      <CourseContent></CourseContent>
      {checkMedia && <MediaStart></MediaStart>}
    </div>
  );
};

export default InfoCoursePage;
