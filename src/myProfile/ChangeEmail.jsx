import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionChangeEmail } from "../redux-store/actions/actions";
const initialState = {
  formData: {
    email: "",
    password: "",
  },

  checkError: {
    email: false,
    password: false,
  },

  textError: {
    email: "",
    password: "",
  },

  alert: false,

  hiddenPassword: false,
};

const changeEmailReducer = (state, action) => {
  switch (action.type) {
    case "CHANGEINPUT": {
      const { name, value } = action.payload.element;
      return { ...state, formData: { ...state.formData, [name]: value } };
    }

    case "SUBMIT": {
      if (action.payload.hasError) {
        return {
          ...state,
          formData: {
            email: "",
            password: "",
          },

          checkError: {
            email: false,
            password: false,
          },

          textError: {
            email: "",
            password: "",
          },
          alert: true,
        };
      }

      return {
        ...state,
        checkError: action.payload.newCheckError,
        textError: action.payload.newTextError,
      };
    }

    case "CLICKALERT":
      return { ...state, alert: false };

    case "HIDDENPASSWORD":
      return { ...state, hiddenPassword: !state.hiddenPassword };
    default:
      return state;
  }
};
const ChangeEmail = () => {
  const [state, dispatch] = useReducer(changeEmailReducer, initialState);
  const userLogged = useSelector((state) => state.userLogged);
  const dispatchRedux = useDispatch();

  //Hàm theo dõi sự thay đổi của input
  const handleChangeInput = (e) => {
    const element = e.target;
    dispatch({
      type: "CHANGEINPUT",
      payload: {
        element,
      },
    });
  };

  //Hàm xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = state.formData;
    const newCheckError = { ...state.checkError };
    const newTextError = { ...state.textError };
    const listUsers = JSON.parse(localStorage.getItem("listUsers"));
    let hasError = true;

    if (!email) {
      newCheckError.email = true;
      newTextError.email = "Email không được để trống";
      hasError = false;
    } else if (listUsers.some((user) => user.account.email === email)) {
      newCheckError.email = true;
      newTextError.email = "Email này đã được đăng ký, thử lại";
      hasError = false;
    } else if (!password) {
      newCheckError.email = false;
      newCheckError.password = true;
      newTextError.password = "Password không được để trống";
      hasError = false;
    } else if (password !== userLogged.account.password) {
      newCheckError.password = true;
      newCheckError.email = false;
      newTextError.password = "Password không đúng, thử lại";
      hasError = false;
    } else {
      newCheckError.password = false;
      hasError = true;
    }

    if (hasError) {
      //đưa lên reducer của redux để cập nhật thông tin người dùng đang đăng nhập
      dispatchRedux({
        type: actionChangeEmail.type,
        payload: {
          email: state.formData.email,
        },
      });
    }

    dispatch({
      type: "SUBMIT",
      payload: {
        hasError,
        newCheckError,
        newTextError,
      },
    });
  };

  //hàm xử lý click alert
  const handleClickAlert = () => {
    dispatch({
      type: "CLICKALERT",
    });
  };

  //hàm xử lý khi click hiddenPassword
  const handleHiddenPassword = () => {
    dispatch({
      type: "HIDDENPASSWORD",
    });
  };

  return (
    <form className="change_email" onSubmit={handleSubmit}>
      <div className="item_input">
        <label htmlFor="" className="desc">
          New email:
        </label>
        <input
          type="email"
          placeholder="Enter your new email"
          id="email"
          name="email"
          value={state.formData.email}
          onChange={handleChangeInput}
        />
        {state.checkError.email && (
          <p className="desc error">{state.textError.email}</p>
        )}
      </div>
      <div className="item_input">
        <label htmlFor="" className="desc">
          Password:
        </label>
        <div className="box_input">
          <input
            type={state.hiddenPassword ? "text" : "password"}
            placeholder="Enter your password"
            id="password"
            name="password"
            value={state.formData.password}
            onChange={handleChangeInput}
          />
          <div className="icon" onClick={handleHiddenPassword}>
            {state.hiddenPassword ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </div>
        </div>

        {state.checkError.password && (
          <p className="desc error">{state.textError.password}</p>
        )}
      </div>

      <button className="btn_primary">Update email</button>

      {state.alert && (
        <div className="alert">
          <p className="desc">Bạn đã thay đổi mật khẩu thành công</p>
          <button className="btn_primary" onClick={handleClickAlert}>
            OK
          </button>
        </div>
      )}
    </form>
  );
};

export default ChangeEmail;
