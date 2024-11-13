import { useSelector } from "react-redux";

const MyProfile = () => {
  const userLogged = useSelector((state) => state.userLogged); //Lấy thông tin người dùng đang đăng nhập từ state
  return (
    <div className="my_profile">
      {userLogged !== null && (
        <div className="information">
          <div className="item">
            <p className="desc">Name:</p>
            <p className="desc">{userLogged.account.name}</p>
          </div>
          <div className="item">
            <p className="desc">Email:</p>
            <p className="desc">{userLogged.account.email}</p>
          </div>
          <div className="item">
            <p className="desc">Date of birth:</p>
            <p className="desc">
              {userLogged.account.birth || (
                <span className="not_update"> Bạn chưa cập nhật ngày sinh</span>
              )}
            </p>
          </div>

          <div className="item">
            <p className="desc">Current job:</p>
            <p className="desc">
              {userLogged.account.job || (
                <span className="not_update">
                  Bạn chưa cập nhật công việc của mình
                </span>
              )}
            </p>
          </div>
          <div className="item">
            <p className="desc">Address:</p>
            <p className="desc">
              {userLogged.account.address || (
                <span className="not_update"> Bạn chưa cập nhật địa chỉ</span>
              )}
            </p>
          </div>
          <div className="item">
            <p className="desc">Phone number:</p>
            <p className="desc">
              {userLogged.account.phone || (
                <span className="not_update">
                  Bạn chưa cập nhật số điện thoại
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
