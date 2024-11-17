const MyCourse = ({
  course,
  handleClickCourse,
  handleDeleteCourseFromMyList,
  handleHiddenAlert,
  hiddenAlert,
}) => {
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

      <div className={`box_alert ${hiddenAlert ? "active" : ""}`}>
        <div className="alert">
          <p className="desc">Xác nhận xóa khóa học</p>
          <div className="btn">
            <button className="btn_white" onClick={() => handleHiddenAlert("")}>
              Cancel
            </button>
            <button
              className="btn_primary"
              onClick={() => handleDeleteCourseFromMyList(course.idCourse)}
            >
              <h1>{course.idCourse}</h1>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
