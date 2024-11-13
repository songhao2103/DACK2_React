import { NavLink } from "react-router-dom";
const Navigations = () => {
  return (
    <div className="navigations">
      <ul className="list_menus">
        <NavLink
          to="/"
          className={({ isActive }) => `item_menu ${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/courses_page"
          className={({ isActive }) => `item_menu ${isActive ? "active" : ""}`}
        >
          Courses
        </NavLink>
        <NavLink
          to={"/blog"}
          className={({ isActive }) => `item_menu ${isActive ? "active" : ""}`}
        >
          Blog
        </NavLink>
        <li className="item page">
          <div className="box_page">
            <p className="item_menu">Page</p>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <ul className="menu_page">
            <NavLink className="item_page" to={"/contact"}>
              Contact
            </NavLink>
            <NavLink className="item_page" to={"/FAQs"}>
              FAQs
            </NavLink>
            <li className="item_page">Menu 3</li>
          </ul>
        </li>
        <li className="item_menu">LearnPress Add-On</li>
        <li className="item_menu">Premium Theme</li>
      </ul>
    </div>
  );
};

export default Navigations;
