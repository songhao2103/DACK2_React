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
  const [hiddenReply, setHiddenReply] = useState([]); //Lưu trạng thái hiện thị ô input reply
  const [valueInputReply, setValueInputReply] = useState(""); //lưu giá trị của ô input reply
  const [hiddenListCommentReply, setHiddenListCommentReply] = useState([]); //lưu trạng thái hiển thị của listCommentReply
  const [valueReplyInputReply, setValueReplyInputReply] = useState(""); //Lưu giá trị của replyInputReply
  const [hiddenReplyInputReply, setHiddenReplyInputReply] = useState([]); // lưu trạng thái hiện thị ô input replyInputReply

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
      if (ojbCommentCourse) {
        setHiddenReply(Array(ojbCommentCourse.listComments.length).fill(false));
        setHiddenListCommentReply(
          Array(ojbCommentCourse.listComments.length).fill(false)
        );

        const newHiddenReplyInputReply = ojbCommentCourse.listComments.map(
          (comment) => Array(comment.replyComments.length).fill(false)
        );
        setHiddenReplyInputReply(newHiddenReplyInputReply);
      } else {
        setHiddenReply([]);
        setHiddenListCommentReply([]);
      }
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
        replyComments: [],
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

  //hàm xử lý thay đổi input reply
  const handleChangeInputReply = (e) => {
    setValueInputReply(e.target.value);
  };

  //hàm xử lý khi click vào nút gửi phần reply
  const handleReplyComments = async (comment, value) => {
    const newCommentReply = {
      name: userLogged.account.name,
      content: valueInputReply,
      nameUserOfCommentReplied: comment.name,
      id: new Date().getTime(),
      date: new Date(),
      emailUserReply: userLogged.account.email,
    };
    const newComment = {
      ...comment,
      replyComments: [newCommentReply, ...comment.replyComments],
    };
    const newListComments = ojbCommentCourse.listComments.map((item) =>
      comment.id === item.id ? newComment : item
    );

    const newOjbCommentCourse = {
      ...ojbCommentCourse,
      listComments: newListComments,
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
    setValueInputReply("");
    setHiddenReply((prevHiddenReply) => prevHiddenReply.map(() => false));
    setHiddenListCommentReply((prevHiddenListCommentReply) =>
      prevHiddenListCommentReply.map((item, index) =>
        index === value ? true : item
      )
    );
  };

  //hàm xử lý khi click reply để hiển thị box reply
  const handleClickReply = (value) => {
    setHiddenReply((prevHiddenReply) =>
      prevHiddenReply.map((_, index) => index === value)
    );
  };

  //hàm xử lý đóng box reply
  const handleCloseBoxReply = () => {
    setHiddenReply((prevHiddenReply) => prevHiddenReply.map(() => false));
    setValueInputReply("");
  };

  //hàm xử lý hiển thị listCommentReply
  const handleHiddenListCommentReply = (value) => {
    setHiddenListCommentReply((prevHiddenListCommentReply) =>
      prevHiddenListCommentReply.map((item, index) =>
        index === value ? !item : item
      )
    );
  };

  //hàm xử lý xóa reply comment
  const handleDeleteReplyComment = async (id, comment, value) => {
    const newListCommentReply = comment.replyComments.filter(
      (comment) => comment.id !== id
    );
    const newComment = { ...comment, replyComments: newListCommentReply };
    const newListComments = ojbCommentCourse.listComments.map((item) =>
      item.id === comment.id ? newComment : item
    );

    const newOjbCommentCourse = {
      ...ojbCommentCourse,
      listComments: newListComments,
    };

    const deleteCommentReply = async () => {
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
    await deleteCommentReply();
    await fetchComments();
    await setHiddenListCommentReply((prevHiddenReply) =>
      prevHiddenReply.map((item, index) => (value === index ? true : item))
    );
  };

  //Hàm theo dõi sự thay đổi của replyInputReply
  const handleChangeReplyInputReply = (e) => {
    setValueReplyInputReply(e.target.value);
  };

  //Hàm xử lý khi click nút gửi ở input replyCommentReply
  const handleSendReplyCommentReply = async (
    comment,
    commentReply,
    index,
    indexReply
  ) => {
    const newReplyCommentReply = {
      name: userLogged.account.name,
      content: valueReplyInputReply,
      nameUserOfCommentReplied: commentReply.name,
      id: new Date().getTime(),
      date: new Date(),
      emailUserReply: userLogged.account.email,
    };

    const newListCommentReply = [
      ...comment.replyComments.slice(0, indexReply + 1), // Các phần tử trước và tại vị trí indexReply
      newReplyCommentReply, // Phần tử mới
      ...comment.replyComments.slice(indexReply + 1), // Các phần tử sau indexReply
    ];

    const newComment = { ...comment, replyComments: newListCommentReply };

    const newListComments = ojbCommentCourse.listComments.map((item) =>
      item.id === comment.id ? newComment : item
    );

    const newOjbCommentCourse = {
      ...ojbCommentCourse,
      listComments: newListComments,
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
    setValueReplyInputReply("");
    await setHiddenListCommentReply((prevHiddenReply) =>
      prevHiddenReply.map((item, ind) => (index === ind ? true : item))
    );
  };

  //hàm xử lý hiện thị ô replyInputReply
  const handleHiddenReplyInputReply = (index, indexReply) => {
    let newHiddenReplyInputReply = [...hiddenReplyInputReply];
    newHiddenReplyInputReply[index][indexReply] = true;
    setHiddenReplyInputReply(newHiddenReplyInputReply);
  };

  //hàm đóng ô input replyInputReply
  const handleCloseReplyInputReply = (index, indexReply) => {
    let newHiddenReplyInputReply = [...hiddenReplyInputReply];
    newHiddenReplyInputReply[index][indexReply] = false;
    setHiddenReplyInputReply(newHiddenReplyInputReply);
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
        ojbCommentCourse.listComments.map((comment, index) => (
          <div className="comment" key={comment.id}>
            <div className="top">
              <div className="title_h5">{comment.name}</div>
              <p className="date desc">{formattedDate(comment.date)}</p>
            </div>
            <p className="content">{comment.content}</p>
            <div className="bottom">
              {comment.replyComments.length !== 0 && (
                <p
                  className="desc"
                  onClick={() => handleHiddenListCommentReply(index)}
                >
                  {hiddenListCommentReply[index]
                    ? "Ẩn tất cả bình luận"
                    : "Hiển thị tất cả bình luận"}
                </p>
              )}
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
              {(userLogged && userLogged.account.email === comment.emailUser) ||
              hiddenReply[index] ? null : (
                <div className="reply" onClick={() => handleClickReply(index)}>
                  <div className="icon">
                    <i className="fa-solid fa-share"></i>
                  </div>
                  <p className="desc">Reply</p>
                </div>
              )}
            </div>
            {/* comment reply */}
            {hiddenReply[index] && (
              <div className="input_comment_reply">
                <input
                  type="text"
                  placeholder="Enter your comment"
                  onChange={handleChangeInputReply}
                  value={valueInputReply}
                />
                <div
                  className={`icon ${valueInputReply ? "active" : ""}`}
                  onClick={() => handleReplyComments(comment, index)}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </div>
                <div className="close_reply" onClick={handleCloseBoxReply}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
            )}

            {comment.replyComments.length !== 0 &&
              hiddenListCommentReply[index] && (
                <div className="box_list_comment_reply">
                  <div className="list_comment_reply">
                    {comment.replyComments.map((commentReply, indexReply) => (
                      <div className="comment" key={commentReply.id}>
                        <div className="top">
                          <div className="title_h5">{commentReply.name}</div>
                          <p className="date desc">
                            {formattedDate(commentReply.date)}
                          </p>
                        </div>
                        <p className="content">
                          <span>{`@${commentReply.nameUserOfCommentReplied}`}</span>{" "}
                          {commentReply.content}
                        </p>

                        <div className="bottom">
                          {userLogged.account.email ===
                            commentReply.emailUserReply && (
                            <button
                              className="desc delete"
                              onClick={() =>
                                handleDeleteReplyComment(
                                  commentReply.id,
                                  comment,
                                  index
                                )
                              }
                            >
                              Delete
                            </button>
                          )}

                          {(userLogged &&
                            userLogged.account.email ===
                              commentReply.emailUserReply) ||
                          hiddenReply[index][indexReply] ? null : (
                            <div
                              className="reply"
                              onClick={() =>
                                handleHiddenReplyInputReply(index, indexReply)
                              }
                            >
                              <div className="icon">
                                <i className="fa-solid fa-share"></i>
                              </div>
                              <p className="desc">Reply</p>
                            </div>
                          )}
                        </div>

                        {hiddenReplyInputReply[index][indexReply] && (
                          <div className="input_comment_reply">
                            <input
                              type="text"
                              placeholder="Enter your comment"
                              onChange={handleChangeReplyInputReply}
                              value={valueReplyInputReply}
                            />
                            <div
                              className={`icon ${
                                valueReplyInputReply ? "active" : ""
                              }`}
                              onClick={() => {
                                handleSendReplyCommentReply(
                                  comment,
                                  commentReply,
                                  index,
                                  indexReply
                                );
                              }}
                            >
                              <i className="fa-solid fa-paper-plane"></i>
                            </div>
                            <div
                              className="close_reply"
                              onClick={() =>
                                handleCloseReplyInputReply(index, indexReply)
                              }
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
