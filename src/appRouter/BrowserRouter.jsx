import { createBrowserRouter } from "react-router-dom";
import HomePage from "../homePage/HomePage";
import CoursesPage from "../coursesPage/CoursesPage";
import InfoCoursePage from "../infoCoursePage/InfoCoursePage";
import Register from "../register/Register";
import LogIn from "../logIn/LogIn";
import CheckOut from "../checkOut/CheckOut";
import ListMyCourses from "../listMyCourses/ListMyCourses";
import MyProfilePage from "../myProfile/MyProfilePage";
import MyCourseContent from "../myCourseContent/MyCourseContent";
import ListCoursesOfPage from "../listCoursesOfPage/ListCoursesOfPage";
import BlogPage from "../blog/BlogPage";
import AppContent from "../AppContent";
import CourseContent from "../infoCoursePage/CourseContent";
import Contact from "../contact/Contact";
import FAQsPage from "../FAQsPage/FAQsPage";

//BrowserRouter
const createAppRouter = (course) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppContent></AppContent>,

      children: [
        {
          index: true,
          element: <HomePage></HomePage>,
        },
        {
          path: "/info_course",
          element: <InfoCoursePage></InfoCoursePage>,
          handle: { breadcrumb: course.name },
        },
        {
          path: "/check-out",
          element: <CheckOut></CheckOut>,
          handle: { breadcrumb: "Check Out" },
        },
        {
          path: "/courses_page",
          element: <CoursesPage></CoursesPage>,
          handle: { breadcrumb: "Courses Page" },
        },

        {
          path: "/my-courses",
          element: <ListMyCourses></ListMyCourses>,
          handle: { breadcrumb: "My Courses" },
        },
        {
          path: "/register",
          element: <Register></Register>,
          handle: { breadcrumb: "Register" },
        },
        {
          path: "/log-in",
          element: <LogIn></LogIn>,
          handle: { breadcrumb: "Log In" },
        },
        {
          path: "/my-profile",
          element: <MyProfilePage></MyProfilePage>,
          handle: { breadcrumb: "My Profile" },
        },
        {
          path: "/list-courses-of-page",
          element: <ListCoursesOfPage></ListCoursesOfPage>,
          handle: { breadcrumb: "List Courses Of Page" },
        },
        {
          path: "/blog",
          element: <BlogPage></BlogPage>,
          handle: { breadcrumb: "Blog" },
        },
        {
          path: "/course-content",
          element: <MyCourseContent></MyCourseContent>,
          handle: { breadcrumb: "Course content" },
        },
        {
          path: "/contact",
          element: <Contact></Contact>,
          handle: { breadcrumb: "Contact" },
        },
        {
          path: "/FAQs",
          element: <FAQsPage></FAQsPage>,
          handle: { breadcrumb: "FAQs" },
        },
      ],
    },
  ]);
};

export default createAppRouter;
