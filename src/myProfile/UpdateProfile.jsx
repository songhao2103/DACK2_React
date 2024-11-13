import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateProfile } from "../redux-store/actions/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const accountUserLogged = useSelector((state) => state.userLogged.account);
  // lưu dữ liệu của form
  const [formData, setFormData] = useState({
    name: "",
    birth: "",
    address: "",
    phone: "",
    password: "",
    job: "",
  });

  const [checkErrorPassword, setCheckErrorPassword] = useState(false);
  const [textError, setTextError] = useState("");
  const [hiddenAlert, setHiddenAlert] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState(false);
  //hàm xử lý thay đổi của form
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Hàm xử lý submit form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      !formData.name &&
      !formData.birth &&
      !formData.address &&
      !formData.phone &&
      !formData.job
    ) {
      setCheckErrorPassword(true);
      setTextError("Bạn chưa cập nhật gì cả");
    } else if (!formData.password) {
      setCheckErrorPassword(true);
      setTextError("Mật khẩu không được để trống");
    } else if (accountUserLogged.password !== formData.password) {
      setCheckErrorPassword(true);
      setTextError("Mật khẩu không đúng, thử lại");
    } else {
      setTextError(false);
      dispatch({
        type: actionUpdateProfile.type,
        payload: {
          formData,
        },
      });
      setFormData({
        name: "",
        birth: "",
        address: "",
        phone: "",
        password: "",
        job: "",
      });
      setHiddenAlert(true);
    }
  };

  //ham click vào alert
  const handleClickAlert = () => {
    setHiddenAlert(false);
  };

  //hàm xử lý khi click vào hidden password
  const handleHiddenPassword = () => {
    setHiddenPassword(!hiddenPassword);
  };
  return (
    <div className="update_profile">
      <form action="" onSubmit={handleSubmitForm}>
        <div className="item_input">
          <label htmlFor="" className="desc">
            Full name:
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            onChange={handleChangeInput}
            value={formData.name}
          />
        </div>
        <div className="item_input">
          <label htmlFor="" className="desc">
            Date of birth:
          </label>
          <input
            type="date"
            id="birth"
            name="birth"
            onChange={handleChangeInput}
            value={formData.birth}
          />
        </div>
        <div className="item_input">
          <label htmlFor="" className="desc">
            Current job:
          </label>
          <input
            type="text"
            id="job"
            name="job"
            onChange={handleChangeInput}
            value={formData.job}
            placeholder="Current job"
          />
        </div>
        <div className="item_input">
          <label htmlFor="" className="desc">
            Address:
          </label>
          <input
            type="text"
            placeholder="Enter your address"
            id="address"
            name="address"
            onChange={handleChangeInput}
            value={formData.address}
          />
        </div>
        <div className="item_input">
          <label htmlFor="" className="desc">
            Phone number:
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            id="phone"
            name="phone"
            onChange={handleChangeInput}
            value={formData.phone}
          />
        </div>
        <div className="item_input">
          <label htmlFor="" className="desc">
            Password:
          </label>
          <div className="box_input">
            <input
              type={hiddenPassword ? "text" : "password"}
              placeholder="Enter your password"
              id="password"
              name="password"
              onChange={handleChangeInput}
              value={formData.password}
            />
            <div className="icon" onClick={handleHiddenPassword}>
              {hiddenPassword ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </div>
          </div>

          {checkErrorPassword && <p className="desc error">{textError}</p>}
        </div>
        <button className="btn_primary" type="submit">
          Update
        </button>
      </form>
      {hiddenAlert && (
        <div className="alert_profile">
          <p className="desc">Bạn đã cập nhật thành công</p>
          <button className="btn_primary" onClick={handleClickAlert}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
