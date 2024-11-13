import { useDispatch } from "react-redux";
import { actionCourseViewed } from "../redux-store/actions/actions";
import { Link } from "react-router-dom";

const Course = ({ course, changeArrangement }) => {
  const dispatch = useDispatch();

  //Tính giá tiền sau khi giả giá
  const displayPrice = ((course.price * (100 - course.sale)) / 100).toFixed(1);

  //Hàm xử lí khi click vào view more
  const handleCourseViewed = (course) => {
    dispatch({
      type: actionCourseViewed.type,
      payload: {
        courseViewed: course,
      },
    });
  };

  return (
    <div className={`courseC ${changeArrangement}`}>
      <div className="image">
        <img src={course.img} alt="" />
      </div>

      <div className="content">
        <p className="desc">
          by <span>Determined-Poitras</span>
        </p>
        <p className="title_h4">{course.name}</p>
        <div className="info">
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-clock"></i>
            </div>
            <p className="desc">2Weeks</p>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <p className="desc">{course.students} Students</p>
          </div>
          {changeArrangement === "rows" && (
            <div className="item">
              <div className="icon">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
              <p className="desc">All Levels</p>
            </div>
          )}

          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-clipboard"></i>
            </div>
            <p className="desc">{course.lessons.length} Lesson</p>
          </div>
        </div>

        <div className="bottom">
          <div className="price">
            <p className={`old desc ${course.sale !== 0 ? "sale" : ""}`}>
              ${course.price}
            </p>
            {course.sale !== 0 && (
              <p className={`new desc ${displayPrice == 0 ? "free" : ""}`}>
                {displayPrice == 0 ? "Free" : `$${displayPrice}`}
              </p>
            )}
          </div>
          <Link
            to={"/info_course"}
            className="view_course desc"
            onClick={() => handleCourseViewed(course)}
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;
