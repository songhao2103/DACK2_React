const Student = () => {
  return (
    <div className="student">
      <div className="left">
        <div className="icon">
          <img
            src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/student_LMS.svg"
            alt=""
          />
        </div>
        <p className="desc">Let’s Start With Academy LMS</p>
      </div>

      <div className="right">
        <button className="btn_primary">I’m a student</button>
        <button className="btn_primary">Become an Instructor</button>
      </div>
    </div>
  );
};

export default Student;
