const MyCourse = ({ course, handleClickCourse }) => {
  return (
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
  );
};

export default MyCourse;
