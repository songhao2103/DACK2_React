import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  //lưu giá trị của form
  formData: {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    id: "",
  },

  //lưu trạng thái lỗi của các ô input
  checkedError: {
    name: false,
    email: false,
    password: false,
    rePassword: false,
  },

  //lưu thông báo lỗi của các ô input
  textError: {
    name: "",
    email: "",
    password: "",
    rePassword: "",
  },
  //Lưu trạng thái hiện thị của ô input type password
  hidden: {
    password: false,
    rePassword: false,
  },
};

const registerReducer = (state, action) => {
  switch (action.type) {
    //xử lý thay đổi của input
    case "CHANGEINPUT": {
      const element = action.payload.element;
      const { name, value } = element;
      const formDataCopy = { ...state.formData };
      formDataCopy[name] = value;
      return { ...state, formData: formDataCopy };
    }
    //xử lý submit form
    case "SUBMITFORM": {
      const newCheckedError = { ...state.checkedError }; // copy trạng thái lỗi của các ô input từ state
      const newTextError = { ...state.textError }; // copy thông báo lỗi của các ô input từ state
      const formDataCopy = { ...state.formData }; //copy data của form từ state
      const listUsersCopy = JSON.parse(localStorage.getItem("listUsers")) || [];

      //kiểm tra lỗi name
      if (!formDataCopy.name) {
        newCheckedError.name = true;
        newTextError.name = "Name không được để trống";
      } else {
        newCheckedError.name = false;
      }

      //Kiểm tra lỗi email
      if (!formDataCopy.email) {
        newCheckedError.email = true;
        newTextError.email = "Email không được để trống";
      } else if (Array.isArray(listUsersCopy) && listUsersCopy.length > 0) {
        if (
          listUsersCopy.find(
            (item) => item.account.email === formDataCopy.email
          )
        ) {
          newCheckedError.email = true;
          newTextError.email = "Email này đã được đăng ký, thử lại";
        } else {
          newCheckedError.email = false;
        }
      } else {
        newCheckedError.email = false;
      }

      //Kiểm tra lỗi password
      if (!formDataCopy.password) {
        newCheckedError.password = true;
        newTextError.password = "Password không được để trống";
      } else if (formDataCopy.password.length < 6) {
        newCheckedError.password = true;
        newTextError.password = "Password phải dài hơn 6 ký tự";
      } else {
        newCheckedError.password = false;
      }

      //Kiểm tra re-password
      if (!formDataCopy.rePassword) {
        newCheckedError.rePassword = true;
        newTextError.rePassword = "Re-Password không được để trống";
      } else if (formDataCopy.password !== formDataCopy.rePassword) {
        newCheckedError.rePassword = true;
        newTextError.rePassword = "Password không khớp, thử lại";
      } else {
        newCheckedError.rePassword = false;
      }

      if (Object.values(newCheckedError).every((item) => !item)) {
        const registrationAccount = {
          ...formDataCopy,
          id: new Date().getTime(),
        };

        //Cập nhật tài khoản vừa đăng ký lên localStorage
        const newUser = {
          account: { ...registrationAccount },
          courses: [],
        };
        const newListUsers = [...listUsersCopy, newUser];
        localStorage.setItem("listUsers", JSON.stringify(newListUsers));

        setTimeout(() => {
          action.payload.navigate("/log-in");
        }, 100);
        return {
          ...state,
          checkedError: {
            name: false,
            email: false,
            password: false,
            rePassword: false,
          },
          textError: { name: "", email: "", password: "", rePassword: "" },
          formData: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            id: "",
          },
        };
      } else {
        return {
          ...state,
          checkedError: newCheckedError,
          textError: newTextError,
        };
      }
    }
    //xử lí hidden password
    case "HIDDENPASSWORD": {
      return {
        ...state,
        hidden: {
          ...state.hidden,
          [action.payload.name]: !state.hidden[action.payload.name],
        },
      };
    }
    default:
      return state;
  }
};

//component/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Register = () => {
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const navigate = useNavigate();

  //Lấy ra các thông báo lỗi của input
  const textError = state.textError;
  // lấy ra các trạng thái lỗi của input
  const checkedError = state.checkedError;

  //hàm xử lý thay đổi của input
  const handleChangeInput = (event) => {
    const element = event.target;
    dispatch({
      type: "CHANGEINPUT",
      payload: {
        element,
      },
    });
  };

  //hàm xử lý submit
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "SUBMITFORM",
      payload: {
        navigate,
      },
    });
  };

  //hàm xử lí hidden password và re-password
  const handleHiddenPassword = (name) => {
    dispatch({
      type: "HIDDENPASSWORD",
      payload: {
        name,
      },
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="register">
      <div className="media">
        <img
          src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/studen_post_comment.png"
          alt=""
        />
      </div>

      <form action="" className="form_register" onSubmit={handleSubmit}>
        <div className="title_h2">Register</div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChangeInput}
          value={state.formData.name}
        />
        <p className={`error ${checkedError.name ? "active" : ""}`}>
          {textError.name}
        </p>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChangeInput}
          value={state.formData.email}
        />
        <p className={`error ${checkedError.email ? "active" : ""}`}>
          {textError.email}
        </p>

        <label htmlFor="password">Password:</label>
        <div className="box_input">
          <input
            type={state.hidden.password ? "text" : "password"}
            name="password"
            id="password"
            onChange={handleChangeInput}
            value={state.formData.password}
          />
          <div
            className="box_eye"
            onClick={() => handleHiddenPassword("password")}
          >
            <i className="fa-solid fa-eye"></i>
            <i
              className={`fa-solid fa-eye-slash ${
                state.hidden.password ? "active" : ""
              }`}
            ></i>
          </div>
        </div>

        <p className={`error ${checkedError.password ? "active" : ""}`}>
          {textError.password}
        </p>

        <label htmlFor="re-password">Re-Password:</label>
        <div className="box_input">
          <input
            type={state.hidden.rePassword ? "text" : "password"}
            name="rePassword"
            id="re-password"
            onChange={handleChangeInput}
            value={state.formData.rePassword}
          />
          <div
            className="box_eye"
            onClick={() => handleHiddenPassword("rePassword")}
          >
            <i className="fa-solid fa-eye"></i>
            <i
              className={`fa-solid fa-eye-slash ${
                state.hidden.rePassword ? "active" : ""
              }`}
            ></i>
          </div>
        </div>

        <p className={`error ${checkedError.rePassword ? "active" : ""}`}>
          {textError.rePassword}
        </p>

        <div className="bottom">
          <Link to={"/log-in"} className="desc">
            Already have an account
          </Link>
          <button className="btn_primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
