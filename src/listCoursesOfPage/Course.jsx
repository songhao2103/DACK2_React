const Course = ({
  course,
  handleDeleteCourse,
  handleClickEditInformation,
  hiddenChoose,
  handleChangeInputCheckbox,
  index,
  valueCheckbox,
}) => {
  //Tính khoảng thời gian đã update lại hoặc thêm mới course
  const updateTimed =
    (Date.now() - new Date(course.createdAt).getTime()) / 1000; // Tính ra số giây đã update
  let displayTime; //thời gian hiển thị lên trang
  let textTime = "";
  if (updateTimed < 60) {
    displayTime = Math.floor(updateTimed);
    textTime = "Seconds";
  } else if (updateTimed < 3600) {
    displayTime = Math.floor(updateTimed / 60);
    textTime = "Minutes";
  } else if (updateTimed < 86400) {
    displayTime = Math.floor(updateTimed / 3600);
    textTime = "Hours";
  } else if (updateTimed < 604800) {
    displayTime = Math.floor(updateTimed / 86400);
    textTime = "Days";
  } else if (updateTimed < 2592000) {
    displayTime = Math.floor(updateTimed / 604800);
    textTime = "Weeks";
  } else {
    displayTime = Math.floor(updateTimed / 2592000);
    textTime = "Month";
  }

  //Tính giá của course
  const displayPrice = ((course.price * (100 - course.sale)) / 100).toFixed(1);

  return (
    <div className="course_admin">
      <div className="image">
        <img src={course.img} alt="" />
        <div className="option">
          <p className="desc" onClick={() => handleDeleteCourse(course.id)}>
            Erase course
          </p>
          <p
            className="desc"
            onClick={() => handleClickEditInformation("edit", course.id)}
          >
            Edit informaiton
          </p>
        </div>
      </div>
      <div className="content">
        <p className="desc">
          by <span> Determined-Poitras</span>
        </p>
        <p className="name title_h4">{course.name}</p>

        <div className="info">
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-clock"></i>
            </div>
            <p className="desc">
              {displayTime} {textTime}
            </p>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <p className="desc">{course.students}</p>
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
          <p className="view_course desc">View More</p>
        </div>
      </div>
      {hiddenChoose && (
        <div className="choose">
          <input
            type="checkbox"
            onChange={handleChangeInputCheckbox}
            checked={valueCheckbox}
          />
        </div>
      )}
    </div>
  );
};

export default Course;
