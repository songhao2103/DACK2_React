import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Curriculum from "./Curriculum";
import FAQs from "./FAQs";
import Instructor from "./Instructor";
import Overview from "./Overview";
import Reviews from "./Reviews";

const CourseContent = () => {
  const navigate = useNavigate();
  const [hiddenContent, setHiddenContent] = useState(() => {
    // Tạo mảng có 5 phần tử là false
    let arr = new Array(5).fill(false);
    arr[0] = true;
    return arr;
  });
  const [hiddenAlert, setHiddenAlert] = useState(""); //lưu trạng thái hiển thị thông báo
  const userLogged = useSelector((state) => state.userLogged); //lấy thông tin của người dùng đang đăng nhập ở state
  const courseViewed = useSelector((state) => state.courseViewed); //Lấy thông tin của sản phẩm đang được xem

  //Hàm ẩn hiện các contents
  const handleHiddenContent = (value) => {
    if (value === 1) {
      //Kiểm tra đã đăng nhập hay chưa
      if (userLogged !== null) {
        //kiểm tra người dùng đã đăng ký khóa học hay chưa
        const findCourse =
          userLogged.courses.length === 0
            ? null
            : userLogged.courses.find(
                (course) => course.id === courseViewed.id
              );
        //Nếu đã đăng ký tài khoản
        if (findCourse !== null && findCourse !== undefined) {
          setHiddenContent((prevHiddenContent) =>
            prevHiddenContent.map((_, index) => index === 1)
          );
          setHiddenAlert("");
        } else {
          setHiddenAlert("not course");
        }
      } else {
        setHiddenAlert("not log in");
      }
    } else {
      setHiddenContent((prevHiddenContent) =>
        prevHiddenContent.map((_, index) => index === value)
      );
    }
  };

  //Hàm click các lựa chọn của thông báo
  const handleClickAlert = (value) => {
    switch (value) {
      case "to log in": {
        navigate("/log-in");
        break;
      }

      case "continue":
        {
          setHiddenAlert("");
        }

        break;
    }
  };

  return (
    <div className="course_content">
      <div className="nav_content">
        <ul>
          <li
            className={`title_h4 ${hiddenContent[0] ? "active" : ""}`}
            onClick={() => handleHiddenContent(0)}
          >
            Overview
          </li>
          <li
            className={`title_h4 ${hiddenContent[1] ? "active" : ""}`}
            onClick={() => handleHiddenContent(1)}
          >
            Curriculum
          </li>
          <li
            className={`title_h4 ${hiddenContent[2] ? "active" : ""}`}
            onClick={() => handleHiddenContent(2)}
          >
            Instructor
          </li>
          <li
            className={`title_h4 ${hiddenContent[3] ? "active" : ""}`}
            onClick={() => handleHiddenContent(3)}
          >
            FAQs
          </li>
          <li
            className={`title_h4 ${hiddenContent[4] ? "active" : ""}`}
            onClick={() => handleHiddenContent(4)}
          >
            Reviews
          </li>
        </ul>
      </div>
      {hiddenContent[0] && (
        <div className="box_content">
          <Overview></Overview>
        </div>
      )}

      {hiddenContent[1] && (
        <div className="box_content">
          <Curriculum></Curriculum>
        </div>
      )}

      {hiddenContent[2] && (
        <div className="box_content">
          <Instructor></Instructor>
        </div>
      )}

      {hiddenContent[3] && (
        <div className="box_content">
          <FAQs></FAQs>
        </div>
      )}
      {hiddenContent[4] && (
        <div className="box_content">
          <Reviews></Reviews>
        </div>
      )}

      {hiddenAlert === "not log in" && (
        <div className="alert alert_log_in">
          <p className="desc">
            Bạn cần đăng nhập để xem thông tin của khóa học
          </p>
          <div className="btns">
            <button
              className="btn_primary"
              onClick={() => handleClickAlert("to log in")}
            >
              OK
            </button>
            <button
              className="btn_primary"
              onClick={() => handleClickAlert("continue")}
            >
              NO
            </button>
          </div>
        </div>
      )}

      {hiddenAlert === "not course" && (
        <div className="alert alert_course">
          <p className="desc">
            Bạn cần đăng ký khóa học để xem được thông tin này
          </p>
          <div className="btns">
            <button
              className="btn_primary"
              onClick={() => handleClickAlert("continue")}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
