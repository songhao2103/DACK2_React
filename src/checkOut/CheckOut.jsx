import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionAddCourse } from "../redux-store/actions/actions";
import { useState, useMemo } from "react";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userLogged);
  const courseOrder = useSelector((state) => state.courseViewed); //Lấy xuống course dangd được order
  const [changeInput, setChangeInput] = useState(Array(3).fill(false)); //Lưu trạng thái của các ô input
  const [alertLogIn, setAlertLogIn] = useState(false); //Lưu trạng thái thông báo lỗi chưa đăng nhập
  const [alertPay, setAlertPay] = useState(false); //Lưu trạng thái thông báo lỗi chọn phương thức thanh toán

  //Kiểm tra xem đã đăng nhập hay chưa, dùng useMemo để lưu kết quả tránh tính toán lại
  const checkLogIn = useMemo(() => {
    return userLogged === null ? false : true;
  }, [userLogged]);

  //Kiểm tra đã chọn phương thức thanh toán hay chưa
  const CheckPay = useMemo(() => {
    if (changeInput.some((item) => item === true)) {
      return true;
    }
    return false;
  }, [changeInput]);

  //hàm changeInput
  const handleChangeInput = (value) => {
    setChangeInput((prevChangeInput) =>
      prevChangeInput.map((_, index) => index === value)
    );
  };

  //hàm xử lí khi click vào place order
  const handleClickPlaceOrder = () => {
    checkLogIn ? setAlertLogIn(false) : setAlertLogIn(true);

    CheckPay ? setAlertPay(false) : setAlertPay(true);

    if (checkLogIn && CheckPay) {
      dispatch({
        type: actionAddCourse.type,
        payload: {
          navigate,
        },
      });
    }
  };

  //Hàm lựa chọn click button ở thông báo

  const handleClickAlert = (value) => {
    switch (value) {
      case "to log in":
        {
          navigate("/log-in");
        }
        break;

      case "continue": {
        setAlertLogIn(false);
        setAlertPay(false);
      }
    }
  };
  return (
    <div className="check_out">
      <div className="title_h1">Check Out</div>
      <div className="content">
        <div className="course_order">
          <div className="top">
            <img src={courseOrder.img} alt="" />
            <p className="name title_h5">{courseOrder.name}</p>
            <p className="desc">${courseOrder.price}</p>
          </div>
          <div className="subtotal">
            <p className="desc">Subtotal</p>
            <div className="box_price">
              {courseOrder.sale != 0 ? (
                <p className="desc sale">- {courseOrder.sale}%</p>
              ) : null}
              <p className="desc">
                ${(courseOrder.price * (100 - courseOrder.sale)) / 100}
              </p>
            </div>
          </div>
          <div className="total">
            <p className="desc">Total</p>
            <p className="desc">
              ${(courseOrder.price * (100 - courseOrder.sale)) / 100}
            </p>
          </div>
        </div>
        <div className="pay_course">
          <p className="title_h2">Payment</p>
          <div className="box_input">
            <input
              type="checkbox"
              name="paypal"
              id="paypal"
              onChange={() => handleChangeInput(0)}
              checked={changeInput[0]}
            />
            <label className="icon" htmlFor="paypal">
              <span>Pay</span>
              <span>Pal</span>
            </label>
          </div>
          <div className="box_input">
            <input
              type="checkbox"
              name="cash"
              id="cash"
              onChange={() => handleChangeInput(1)}
              checked={changeInput[1]}
            />
            <label className="desc" htmlFor="cash">
              Make a payment with cash.
            </label>
          </div>
          <div className="box_input">
            <input
              type="checkbox"
              name="debt"
              id="debt"
              onChange={() => handleChangeInput(2)}
              checked={changeInput[2]}
            />
            <label className="desc" htmlFor="debt">
              Post-payment debt
            </label>
          </div>
          <button className="btn_primary" onClick={handleClickPlaceOrder}>
            Place Order
          </button>
        </div>

        {alertLogIn && (
          <div className="alert_error">
            <p className="desc">
              Bạn cần phải đăng nhập để đăng ký được khóa học
            </p>
            <div className="btns">
              <button
                className="btn_white"
                onClick={() => handleClickAlert("to log in")}
              >
                OK
              </button>
              <button
                className="btn_white"
                onClick={() => handleClickAlert("continue")}
              >
                NO
              </button>
            </div>
          </div>
        )}

        {alertPay && !alertLogIn && (
          <div className="alert_error">
            <p className="desc">Bạn cần phải chọn phương thức thanh toán</p>
            <div className="btns">
              <button
                className="btn_white"
                onClick={() => handleClickAlert("continue")}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
