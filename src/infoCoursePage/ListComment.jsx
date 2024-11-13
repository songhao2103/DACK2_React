import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

const ListComment = () => {
  const navigate = useNavigate();
  const courseViewed = useSelector((state) => state.courseViewed); //Lấy xuống course đang được xem
  const userLogged = useSelector((state) => state.userLogged); //lấy xuống người dùng đang đăng nhập
  const [hiddenAlert, setHiddenAlert] = useState(false); //Lưu phần hiển thị alert khi comment mà chưa đăng nhập
  const textareaElement = useRef(null); //lấy ra phần tử textarea
  const [commentValue, setCommentValue] = useState(""); //Lưu giá trị của ô comment
  const [ojbCommentCourse, setOjbCommentCourse] = useState({});

  //hàm lấy list comments từ server
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(config.endpoint1 + `list-comment-of-page/`);
      if (!response.ok) {
        throw new Error(`Lỗi khi lấy dữ liệu ${response.status}`);
      }
      const listCommentOfPage = await response.json();

      const ojbCommentCourse = listCommentOfPage.find(
        (course) => course.idCourse === courseViewed.idCourse
      );

      setOjbCommentCourse(ojbCommentCourse || {});
    } catch (error) {
      console.log("Có lỗi xảy ra" + error);
      setOjbCommentCourse({});
    }
  }, [courseViewed.idCourse]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  //hàm xử lý thay đổi của ô comment
  const handleChangeCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  //tính toán chiều cao cho ô comment
  useEffect(() => {
    if (textareaElement.current) {
      textareaElement.current.style.height = "auto";
      textareaElement.current.style.height = `${textareaElement.current.scrollHeight}px`;
    }
  }, [commentValue]);

  //hàm xử lý khi post comment
  const handlePostComment = async () => {
    if (userLogged === null) {
      setHiddenAlert(true);
    } else {
      const newComment = {
        name: userLogged.account.name,
        content: commentValue,
        date: new Date(),
        emailUser: userLogged.account.email,
        id: new Date().getTime(),
      };

      const newOjbCommentCourse = {
        ...ojbCommentCourse,
        listComments: [newComment, ...ojbCommentCourse.listComments],
      };

      const putOjbCommentCourse = async () => {
        try {
          const response = await fetch(
            config.endpoint1 + `list-comment-of-page/${ojbCommentCourse.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newOjbCommentCourse),
            }
          );
          if (!response.ok) {
            throw new Error(
              "Cập nhật comment không thành công" + response.status
            );
          }
        } catch (error) {
          console.error("Có lỗi xảy ra khi cập nhật bình luận:", error);
        }
      };



      await putOjbCommentCourse();
      await fetchComments();
      setCommentValue("");
    }
  };

  //hàm xử lý ngày tháng
  const formattedDate = (date) => {
    const newDate = new Date(date);

    const options = { year: "numeric", month: "long", day: "2-digit" };
    return newDate.toLocaleDateString("en-US", options);
  };

  //hàm xóa comment
  const handleDeleteComment = async (id) => {
    const newListComments = ojbCommentCourse.listComments.filter(
      (comment) => comment.id !== id
    );

    const newOjbCommentCourse = {
      ...ojbCommentCourse,
      listComments: newListComments,
    };

    const deleteComment = async () => {
      try {
        const response = await fetch(
          config.endpoint1 + `list-comment-of-page/${ojbCommentCourse.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newOjbCommentCourse),
          }
        );

        if (!response.ok) {
          throw new Error("Xóa không thành công" + response.status);
        }
      } catch (error) {
        console.log("Xóa không thành công" + error);
      }
    };

    await deleteComment();
    await fetchComments();
  };

  //Hàm xử lý khi click Ok ở alert
  const handleClickOke = () => {
    navigate("/log-in");
    setHiddenAlert(false);
    setCommentValue("");
  };

  //hàm xử lý khi click cancel ở alert
  const handleClickCancel = () => {
    setHiddenAlert(false);
  };

  return (
    <div className="list_comments">
      <div className="write_comment">
        <p className="title_h5">{userLogged ? userLogged.account.name : ""}</p>
        <textarea
          ref={textareaElement}
          type="text"
          placeholder="Enter your comment..."
          onChange={handleChangeCommentValue}
          value={commentValue}
          rows={1}
          className="desc"
        />

        <div className="bottom">
          <button
            className={`btn_confirm ${commentValue ? "active" : ""}`}
            onClick={handlePostComment}
          >
            Comment
          </button>
        </div>
      </div>

      {ojbCommentCourse.listComments &&
        ojbCommentCourse.listComments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="top">
              <div className="title_h5">{comment.name}</div>
              <p className="date desc">{formattedDate(comment.date)}</p>
            </div>
            <p className="content">{comment.content}</p>
            <div className="bottom">
              {userLogged
                ? userLogged.account.email === comment.emailUser && (
                    <button
                      className="desc delete"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  )
                : null}
              <div className="reply">
                <div className="icon">
                  <i className="fa-solid fa-share"></i>
                </div>
                <p className="desc">Reply</p>
              </div>
            </div>
          </div>
        ))}

      <div className="comment">
        <div className="top">
          <div className="title_h5">Laura Hipster</div>
          <p className="date desc">October 03, 2022</p>
        </div>
        <p className="content">
          Quisque nec non amet quis. Varius tellus justo odio parturient mauris
          curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id
          sed faucibus bibendum augue id cras purus. At eget euismod cursus non.
          Molestie dignissim sed volutpat feugiat vel.
        </p>
        <div className="bottom">
          <div className="icon">
            <i className="fa-solid fa-share"></i>
          </div>
          <p className="desc">Reply</p>
        </div>
      </div>

      <div className="comment">
        <div className="top">
          <div className="title_h5">Laura Hipster</div>
          <p className="date desc">October 03, 2022</p>
        </div>
        <p className="content">
          Quisque nec non amet quis. Varius tellus justo odio parturient mauris
          curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id
          sed faucibus bibendum augue id cras purus. At eget euismod cursus non.
          Molestie dignissim sed volutpat feugiat vel.
        </p>
        <div className="bottom">
          <div className="icon">
            <i className="fa-solid fa-share"></i>
          </div>
          <p className="desc">Reply</p>
        </div>
      </div>

      <div className="comment">
        <div className="top">
          <div className="title_h5">Laura Hipster</div>
          <p className="date desc">October 03, 2022</p>
        </div>
        <p className="content">
          Quisque nec non amet quis. Varius tellus justo odio parturient mauris
          curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id
          sed faucibus bibendum augue id cras purus. At eget euismod cursus non.
          Molestie dignissim sed volutpat feugiat vel.
        </p>
        <div className="bottom">
          <div className="icon">
            <i className="fa-solid fa-share"></i>
          </div>
          <p className="desc">Reply</p>
        </div>
      </div>

      {hiddenAlert && (
        <div className="bgc_alert">
          <div className="alert">
            <p className="desc">Cậu cần đăng nhập để có thể bình luận nha </p>
            <div className="btns">
              <button className="btn_primary" onClick={handleClickOke}>
                OK
              </button>
              <button className="btn_primary" onClick={handleClickCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListComment;
