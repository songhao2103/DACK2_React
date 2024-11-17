import { useSelector } from "react-redux";

const InfoCourse = () => {
  const course = useSelector((state) => state.courseViewed);

  return (
    <div className="info_course">
      <div className="info">
        <p className="desc">
          by <span>Determined-Poitras</span>
        </p>
        <p className="title_h2">{course.name}</p>
        <div className="bottom">
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
            <p className="desc">{course.students} Studens</p>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-chart-simple"></i>
            </div>
            <p className="desc">All Levels</p>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-clipboard"></i>
            </div>
            <p className="desc">
              {course.lessons ? course.lessons.length : ""} Lessons
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCourse;
