import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import "./style/main.scss";
import config from "./config";
import createAppRouter from "./appRouter/BrowserRouter";
import AppContent from "./AppContent";

function App() {
  const courseViewed = useSelector((state) => state.courseViewed);

  const fetchData = async () => {
    try {
      const response = await fetch(config.endpoint1 + "list-data-courses");
      if (!response.ok) {
        throw new Error("tải dữ liệu bị lỗi", response.status);
      }
      const listDataCourses = await response.json();

      const listCoursesOfKennyWhite = listDataCourses.filter(
        (course) => course.instructor === "Kenny White"
      );
      const listCoursesOfJohnDoe = listDataCourses.filter(
        (course) => course.instructor === "John Doe"
      );
      const listIdCourseOfKennyWhite = listCoursesOfKennyWhite.map(
        (course) => course.idCourse
      );
      const listIdCourseOfJohnDoe = listCoursesOfJohnDoe.map(
        (course) => course.idCourse
      );
      return {
        kennyWhite: listIdCourseOfKennyWhite,
        johnDoe: listIdCourseOfJohnDoe,
      };
    } catch (error) {
      console.log("Tải dữ liệu bị lỗi", error);
      return { kennyWhite: [], johnDoe: [] };
    }
  };

  useEffect(() => {
    (async () => {
      const coursesData = await fetchData();

      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      if (!listUsers) {
        const newListUsers = [
          {
            account: {
              email: "admin",
              password: "123456",
              id: "admin",
              key: "admin",
            },
          },
          {
            account: {
              email: "kennyWhite",
              password: "123456",
              id: "kennyWhite",
              key: "menter",
            },
            courses: coursesData.kennyWhite,
          },
          {
            account: {
              email: "johnDoe",
              password: "123456",
              id: "johnDoe",
              key: "menter",
            },
            courses: coursesData.johnDoe,
          },
        ];
        localStorage.setItem("listUsers", JSON.stringify(newListUsers));
      }
    })();
  }, []);

  const router = createAppRouter(courseViewed);

  return (
    <div className="main_content">
      <RouterProvider router={router}>
        <AppContent></AppContent>
      </RouterProvider>
    </div>
  );
}

export default App;
