import { useState, useMemo, useEffect } from "react";
import PopupUser from "./PopupUser";
import { useDebounce } from "../hookCustoms/useDebounce";

const ListUsersOfEdupress = () => {
  const listUsersLocal = useMemo(
    () => JSON.parse(localStorage.getItem("listUsers")) || [],
    []
  );
  const [listUsers, setListUsers] = useState(() =>
    listUsersLocal.filter((user) => user.account.key === "student")
  );

  const [listUsersFiltered, setListUsersFiltered] = useState([]);
  const [userViewed, setUserViewed] = useState(null); //Lưu user đang được xem
  const [inputValue, setInputValue] = useState(""); //Lưu giá trị của input
  const debouncedSearch = useDebounce(inputValue, 1000);

  //cập nhật listUsersFiltered
  useEffect(() => {
    setListUsersFiltered(listUsers);
  }, [listUsers]);

  //hàm cử lý click để xem thông tin chi tiết của user
  const handleViewInfoUser = (id) => {
    const newUserViewed = listUsers.find((user) => user.account.id === id);
    setUserViewed(newUserViewed);
  };

  //Hàm xử lý đóng popup user
  const handleClosePopup = () => {
    setUserViewed(null);
  };

  //Hàm xử lý xóa user
  const handleDeleteUser = (id) => {
    const newListUsers = listUsers.filter((user) => user.account.id !== id);
    setListUsers(newListUsers);
    const newListUsersLocal = listUsersLocal.filter(
      (user) => user.account.id !== id
    );
    localStorage.setItem("listUsers", JSON.stringify(newListUsersLocal));
    setUserViewed(null);
  };

  // hàm theo dõi thay đổi của input search
  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  // tìm kiếm user
  useEffect(() => {
    setListUsersFiltered(() =>
      listUsers.filter((user) =>
        user.account.email.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [debouncedSearch]);

  return (
    <div className="list_users_of_edupress">
      <div className="title_h2">List users</div>

      <div className="box_options">
        <div className="options">
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              onChange={handleChangeInput}
              value={inputValue}
            />
          </div>
        </div>
      </div>
      <table className="table">
        <thead className="title">
          <tr>
            <th className="title_h5">STT</th>
            <th className="title_h5">Email</th>
            <th className="title_h5">Password</th>
            <th className="title_h5">Number of courses registered</th>
          </tr>
        </thead>
        <tbody>
          {listUsersFiltered.map((user, index) => (
            <tr
              key={user.account.id}
              className={index % 2 === 1 ? "active" : ""}
              onClick={() => handleViewInfoUser(user.account.id)}
            >
              <th className="desc">{index + 1}</th>
              <th className="desc">{user.account.email}</th>
              <th className="desc">{user.account.password}</th>
              <th className="desc">{user.courses.length}</th>
            </tr>
          ))}
        </tbody>
      </table>

      {userViewed ? (
        <PopupUser
          userViewed={userViewed}
          handleClosePopup={handleClosePopup}
          handleDeleteUser={handleDeleteUser}
        ></PopupUser>
      ) : null}
    </div>
  );
};

export default ListUsersOfEdupress;
