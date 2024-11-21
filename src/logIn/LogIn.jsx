import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionUserLogged } from "../redux-store/actions/actions";

const initialState = {
  formData: { email: "", password: "" },
  checkedError: {
    email: false,
    password: false,
  },

  textError: {
    email: "",
    password: "",
  },

  hiddenPassword: false,
  valueCheckbox: false,
};

const logInReducer = (state, action) => {
  switch (action.type) {
    case "CHANGEINPUT": {
      const element = action.payload.element;
      const { name, value } = element;
      return { ...state, formData: { ...state.formData, [name]: value } };
    }

    case "SUBMITFORM": {
      let newCheckedError = { ...state.checkedError };
      let newTextError = { ...state.textError };

      //check lỗi email
      if (!state.formData.email) {
        (newCheckedError.email = true),
          (newTextError.email = "Email không được để trống");
      } else {
        if (
          action.payload.listUsers === null
            ? true
            : !action.payload.listUsers.find(
                (user) => user.account.email === state.formData.email
              )
        ) {
          (newCheckedError.email = true),
            (newTextError.email = "Email không đúng, thử lại");
        } else {
          newCheckedError.email = false;

          //check lỗi password
          if (!state.formData.password) {
            (newCheckedError.password = true),
              (newTextError.password = "Password không được để trống");
          } else {
            if (
              !action.payload.listUsers.find(
                (user) => user.account.password === state.formData.password
              )
            ) {
              (newCheckedError.password = true),
                (newTextError.password = "Password không đúng, thử lại");
            } else {
              newCheckedError.password = false;
            }
          }
        }
      }

      if (!newCheckedError.email && !newCheckedError.password) {
        action.payload.dispatchRedux({
          type: actionUserLogged.type,
          payload: {
            formData: state.formData,
          },
        });

        //Lưu tài khoản đăng nhập lên local nếu người dùng chọn lưu tài khoản
        if (state.valueCheckbox) {
          const listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
          const userLogged = listUsers.find(
            (user) => user.account.email === state.formData.email
          );
          console.log(userLogged);

          localStorage.setItem("  ", JSON.stringify(userLogged));
        } else {
          localStorage.removeItem("accountIsSaved");
        }

        // Nếu không có lỗi, điều hướng đến trang home
        setTimeout(() => {
          action.payload.navigate("/");
        }, 100);

        return {
          ...state,
          formData: {
            email: "",
            password: "",
          },
          checkedError: newCheckedError,
          textError: newTextError,
        };
      } else {
        return {
          ...state,
          checkedError: newCheckedError,
          textError: newTextError,
        };
      }
    }

    case "HIDDENPASSWORD":
      return { ...state, hiddenPassword: !state.hiddenPassword };

    case "CHANGECHECKBOX":
      return { ...state, valueCheckbox: action.payload.value };
    default:
      return state;
  }
};

const LogIn = () => {
  const [state, dispatch] = useReducer(logInReducer, initialState);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const listUsers = JSON.parse(localStorage.getItem("listUsers"));

  //Hàm xử lí change input
  const handleChangeInput = (e) => {
    const element = e.target;
    dispatch({
      type: "CHANGEINPUT",
      payload: {
        element,
      },
    });
  };

  //hàm xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMITFORM",
      payload: {
        listUsers,
        navigate,
        dispatchRedux,
      },
    });
  };

  //Hàm xử lí xem mật khẩu
  const handleHiddenPassword = () => {
    dispatch({
      type: "HIDDENPASSWORD",
    });
  };

  //hàm theo dõi trạng thái của input checkbox
  const handleChangeCheckbox = (e) => {
    const value = e.target.checked;
    dispatch({
      type: "CHANGECHECKBOX",
      payload: {
        value,
      },
    });
  };

  return (
    <div className="log_in">
      <div className="media">
        <img
          src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/studen_post_comment.png"
          alt=""
        />
      </div>
      <form action="" className="form_log_in" onSubmit={handleSubmit}>
        <p className="title_h2">Log In</p>
        <label htmlFor="">Email:</label>
        <input
          type="text"
          onChange={handleChangeInput}
          value={state.formData.email}
          name="email"
        />
        <p className={`error ${state.checkedError.email ? "active" : ""}`}>
          {state.textError.email}
        </p>

        <label htmlFor="">Password</label>
        <div className="box_input">
          <input
            type={state.hiddenPassword ? "text" : "password"}
            onChange={handleChangeInput}
            value={state.formData.password}
            name="password"
          />
          <div
            className="box_eye"
            onClick={() => handleHiddenPassword("rePassword")}
          >
            <i className="fa-solid fa-eye"></i>
            <i
              className={`fa-solid fa-eye-slash ${
                state.hiddenPassword ? "active" : ""
              }`}
            ></i>
          </div>
        </div>

        <p className={`error ${state.checkedError.password ? "active" : ""}`}>
          {state.textError.password}
        </p>
        <div className="bottom">
          <div className="box_left">
            <div className="save_account">
              <input
                type="checkbox"
                name="saveAccount"
                id="saveAccount"
                onChange={handleChangeCheckbox}
                value={state.valueCheckbox}
              />
              <label htmlFor="saveAccount" className="desc">
                Save your login account
              </label>
            </div>
            <Link to="/register" className="desc">
              Don't have an account yet
            </Link>
          </div>

          <button className="btn_primary" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
