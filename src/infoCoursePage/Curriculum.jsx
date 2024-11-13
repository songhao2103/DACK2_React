import { useState } from "react";
import { useSelector } from "react-redux";

const Curriculum = () => {
  const lessonsOfCourse = useSelector((state) => state.courseViewed.lessons); // lấy ra danh sách các bài học của course đang được xem
  const [hiddenFile, setHiddenFile] = useState(
    Array(lessonsOfCourse.length).fill(false)
  );

  //hàm xử lý hiển thị danh sách file của từng lesson
  const handleHiddenFile = (value) => {
    const newHiddenFile = [...hiddenFile];
    newHiddenFile[value] = !newHiddenFile[value];
    setHiddenFile(newHiddenFile);
  };

  return (
    <div className="curriculum">
      <div className="top">
        <p className="desc">
          LearnPress is a comprehensive WordPress LMS Plugin for WordPress. This
          is one of the best WordPress LMS Plugins which can be used to easily
          create & sell courses online.
        </p>
      </div>

      <div className="list_lessons">
        {lessonsOfCourse.map((lesson, index) => (
          <div className="lesson" key={lesson.id}>
            <p className="title_h5" onClick={() => handleHiddenFile(index)}>
              Lesson {index + 1}
            </p>
            {hiddenFile[index] && (
              <div className="box_file">
                <p className="desc">{lesson.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
