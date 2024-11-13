import { useState } from "react";
import config from "../config";

const LostsOfEditing = ({
  listSelectedCourses,
  handleCloseLostsOfEditing,
  fetchListDataCourses,
}) => {
  const [formData, setFormData] = useState({
    price: "",
    sale: "",
  });
  const [hiddenAlert, setHiddenAlert] = useState(false); //trạng thái hiển thị thông báo
  const [textAlert, setTextAlert] = useState("");

  //hàm xử lý thay đổi của form
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //hàm xử lý khi click update courses
  const handleClickUpdateCourses = async (e) => {
    e.preventDefault();
    await Promise.all(
      listSelectedCourses.map(async (course) => {
        const newCourse = {
          ...course,
          price: formData.price ? formData.price : course.price,
          sale: formData.sale ? formData.sale : course.sale,
        };
        try {
          const response = await fetch(
            config.endpoint1 + `list-data-courses/${course.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newCourse),
            }
          );
          if (!response.ok) {
            throw new Error(
              "Sửa nhiều course không thành công",
              response.status
            );
          }
        } catch (error) {
          console.log("Sửa nhiều course không thành công", error);
        }
      })
    );

    setHiddenAlert(true);
    setTextAlert("Bạn đã cập nhật thành công");
    setFormData({ ...formData, price: "", sale: "" });
    await fetchListDataCourses();
  };

  //Hàm xử lý khi xóa toàn bộ courses được chọn
  const handleDeleteAllSelectedCourses = async (e) => {
    e.preventDefault();
    await Promise.all(
      listSelectedCourses.map(async (course) => {
        try {
          const response = await fetch(
            config.endpoint1 + `list-data-courses/${course.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error(
              "Xoas nhiều course không thành công",
              response.status
            );
          }
        } catch (error) {
          console.log("Xoas nhiều course không thành công", error);
        }
      })
    );

    setHiddenAlert(true);
    setTextAlert("Bạn đã xóa thành công");
    await fetchListDataCourses();
  };

  return (
    <div className="losts_of_editing">
      <div className="box_content">
        <form action="">
          <div className="item">
            <label htmlFor="price">Price editing:</label>
            <input
              type="text"
              name="price"
              id="price"
              onChange={handleChangeForm}
              value={formData.price}
            />
          </div>
          <div className="item">
            <label htmlFor="sale">Discount editing:</label>
            <input
              type="text"
              name="sale"
              id="sale"
              onChange={handleChangeForm}
              value={formData.sale}
            />
          </div>
          <div className="item">
            <button
              className="btn_primary"
              onClick={handleDeleteAllSelectedCourses}
            >
              Delete all course
            </button>
            <button className="btn_primary" onClick={handleClickUpdateCourses}>
              Update courses
            </button>
          </div>
        </form>
        <div className="list_selected_courses">
          {listSelectedCourses.map((course) => (
            <div key={course.id} className="course_selected">
              <div className="image">
                <img src={course.img} alt="" />
              </div>
              <div className="content">
                <p className="desc">{course.name}</p>
                <div className="info">
                  <p className="price">
                    <p
                      className={`old desc ${course.sale !== 0 ? "sale" : ""}`}
                    >
                      ${course.price}
                    </p>
                    {course.sale !== 0 && (
                      <p
                        className={`new desc ${
                          ((course.price * (100 - course.sale)) / 100).toFixed(
                            1
                          ) == 0
                            ? "free"
                            : ""
                        }`}
                      >
                        {((course.price * (100 - course.sale)) / 100).toFixed(
                          1
                        ) == 0
                          ? "Free"
                          : `$${(
                              (course.price * (100 - course.sale)) /
                              100
                            ).toFixed(1)}`}
                      </p>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="close" onClick={handleCloseLostsOfEditing}>
          x
        </div>
        {hiddenAlert && (
          <div className="alert">
            <p className="desc">{textAlert}</p>
            <button className="btn_primary" onClick={handleCloseLostsOfEditing}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostsOfEditing;
