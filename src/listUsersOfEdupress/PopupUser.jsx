const PopupUser = ({ userViewed, handleClosePopup, handleDeleteUser }) => {
  console.log(userViewed.courses.length);

  return (
    <div className="box_popup">
      <div className="popup_user">
        <div className="content">
          <div className="title_h4">Information</div>
          <div className="item">
            <p className="desc">Name:</p>
            <p className="desc">{userViewed.account.name}</p>
          </div>
          <div className="item">
            <p className="desc">Email:</p>
            <p className="desc">{userViewed.account.email}</p>
          </div>
          <div className="item">
            <p className="desc">Password:</p>
            <p className="desc">{userViewed.account.password}</p>
          </div>
          <div className="item">
            <p className="desc">Date of birth:</p>
            <p className="desc">
              {userViewed.account.birth
                ? userViewed.account.birth
                : "Ngày sinh chưa được cập nhật"}
            </p>
          </div>
          <div className="item">
            <p className="desc">Address:</p>
            <p className="desc">
              {userViewed.account.address
                ? userViewed.account.address
                : "Địa chỉ chưa được cập nhật"}
            </p>
          </div>
          <div className="item">
            <p className="desc">Address:</p>
            <p className="desc">
              {userViewed.account.phone
                ? userViewed.account.phone
                : "Địa chỉ chưa được cập nhật"}
            </p>
          </div>
        </div>
        <div className="list_courses_popup">
          {userViewed.courses.length !== 0 && (
            <p className="title_h4">List courses</p>
          )}
          {userViewed.courses.length !== 0 &&
            userViewed.courses.map((course) => (
              <div className="item" key={course.id}>
                <img src={course.img} alt="" />
                <p className="title_h5">{course.name}</p>
              </div>
            ))}
        </div>
        <button
          className="btn_primary"
          onClick={() => handleDeleteUser(userViewed.account.id)}
        >
          Delete user
        </button>
        <div className="close" onClick={handleClosePopup}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default PopupUser;
