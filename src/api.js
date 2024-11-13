//các hàm xử lý api để lấy data từ sever về
import config from "./config";

//hàm để lấy toàn bộ data courses về
export const getListDataCourses = async () => {
  try {
    const listDataCourses = await fetch(config.endpoint1 + "list-data-courses");
    if (!listDataCourses.ok) {
      throw new Error(`HTTP error! Status: ${listDataCourses.status}`);
    }
    return await listDataCourses.json();
  } catch (error) {
    console.log("Không thể tải dữ liệu:", error);
  }
};

//Hàm để post thêm 1 course và data
export const postCourses = async (course) => {
  await fetch(config.endpoint1 + "list-data-courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
};

//Hàm để xóa 1 course
export const deleteCourse = async (id) => {
  try {
    const response = await fetch(config.endpoint1 + `list-data-courses/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Xóa course bị lôix");
    }
  } catch (error) {
    console.log("Xóa course bị lỗi", error);
  }
};

//hàm để chỉnh sửa 1 course
export const updateCourse = async (newCourse, id) => {
  await fetch(config.endpoint1 + `list-data-courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCourse),
  });
};
