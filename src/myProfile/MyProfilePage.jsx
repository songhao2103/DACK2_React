import { useState } from "react";
import ChangePassword from "./ChangePassword";
import MyProfile from "./MyProfile";
import UpdateProfile from "./UpdateProfile";
import ChangeEmail from "./ChangeEmail";

const MyProfilePage = () => {
  const [hiddenOption, setHiddenOption] = useState(() => {
    const arr = Array(4).fill(false);
    arr[0] = true;
    return arr;
  });

  //Hàm xử lí click các option
  const handleClickOption = (value) => {
    setHiddenOption(hiddenOption.map((_, index) => index === value));
  };

  return (
    <div className="my_profile_page">
      <div className="title_h1">My Profile</div>
      <div className="content">
        <ul className="nav_bar_profile">
          <li
            className={`title_h5 ${hiddenOption[0] ? "active" : ""}`}
            onClick={() => handleClickOption(0)}
          >
            My profile
          </li>
          <li
            className={`title_h5 ${hiddenOption[1] ? "active" : ""}`}
            onClick={() => handleClickOption(1)}
          >
            Update Profile
          </li>
          <li
            className={`title_h5 ${hiddenOption[2] ? "active" : ""}`}
            onClick={() => handleClickOption(2)}
          >
            Change password
          </li>
          <li
            className={`title_h5 ${hiddenOption[3] ? "active" : ""}`}
            onClick={() => handleClickOption(3)}
          >
            Change email
          </li>
        </ul>
        {hiddenOption[0] && <MyProfile></MyProfile>}
        {hiddenOption[1] && <UpdateProfile></UpdateProfile>}
        {hiddenOption[2] && <ChangePassword></ChangePassword>}
        {hiddenOption[3] && <ChangeEmail></ChangeEmail>}
      </div>
    </div>
  );
};

export default MyProfilePage;
