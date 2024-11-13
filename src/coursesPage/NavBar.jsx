import { useDispatch, useSelector } from "react-redux";
import {
  actionSelectPrice,
  actionSelectInstructors,
} from "../redux-store/actions/actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const seclectPrice = useSelector((state) => state.coursePrice); //lấy các trạng thái của các ô input phần price
  const seclectInstructor = useSelector((state) => state.courseInstructors); //lấy các trạng thái của các ô input phần price

  //Hàm xử lí khi click vào các ô input phần price
  const handleClickInputPrice = (key) => {
    dispatch({
      type: actionSelectPrice.type,
      payload: {
        key,
      },
    });
  };

  //Hàm xử lí khi click vào các ô input instructors

  const handleClickInputInstructors = (key) => {
    dispatch({
      type: actionSelectInstructors.type,
      payload: {
        key,
      },
    });
  };

  return (
    <div className="nav_bar">
      <ul className="type">
        <div className="title_h4">Course category</div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Commercial </p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Office </p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Shop </p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Educate</p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Academy </p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Single family home </p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">Studio </p>
        </div>
        <div className="option">
          <input type="checkbox" />
          <p className="desc">University </p>
        </div>
      </ul>

      <ul className="type">
        <div className="title_h4">Instructors</div>
        <div className="option">
          <input
            type="checkbox"
            checked={seclectInstructor.all}
            onChange={() => handleClickInputInstructors("all")}
          />
          <p className="desc">All</p>
        </div>

        <div className="option">
          <input
            type="checkbox"
            checked={seclectInstructor.kennyWhite}
            onChange={() => handleClickInputInstructors("kennyWhite")}
          />
          <p className="desc">Kenny White </p>
        </div>
        <div className="option">
          <input
            type="checkbox"
            checked={seclectInstructor.johnDoe}
            onChange={() => handleClickInputInstructors("johnDoe")}
          />
          <p className="desc">John Doe</p>
        </div>
      </ul>

      <ul className="type">
        <ul className="type">
          <div className="title_h4">Price</div>
          <div className="option">
            <input
              type="checkbox"
              onChange={() => handleClickInputPrice("all")}
              checked={seclectPrice.all}
            />
            <p className="desc">All</p>
          </div>
          <div className="option">
            <input
              type="checkbox"
              onChange={() => handleClickInputPrice("free")}
              checked={seclectPrice.free}
            />
            <p className="desc">Free</p>
          </div>
          <div className="option">
            <input
              type="checkbox"
              onChange={() => handleClickInputPrice("increase")}
              checked={seclectPrice.increase}
            />
            <p className="desc">Increase</p>
          </div>
          <div className="option">
            <input
              type="checkbox"
              onChange={() => handleClickInputPrice("reduce")}
              checked={seclectPrice.reduce}
            />
            <p className="desc">Reduce</p>
          </div>
        </ul>
      </ul>

      <ul className="type">
        <ul className="type">
          <div className="title_h4">Rating</div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="option">
            <input type="checkbox" />
            <div className="list_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
        </ul>
      </ul>
      <ul className="type">
        <ul className="type">
          <div className="title_h4">Level</div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">All levels </p>
          </div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">Beginner</p>
          </div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">Expert</p>
          </div>
          <div className="option">
            <input type="checkbox" />
            <p className="desc">Intermidiate</p>
          </div>
        </ul>
      </ul>
    </div>
  );
};

export default NavBar;
