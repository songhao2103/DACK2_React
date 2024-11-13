const Course = ({ article }) => {
  return (
    <div className="course_blog">
      <div className="image">
        <img src={article.img} />
      </div>

      <div className="content">
        <p className="title_h4">{article.name}</p>
        <div className="box_date">
          <div className="icon">
            <i className="fa-regular fa-calendar"></i>
          </div>
          <p className="desc">Jan 24, 22023</p>
        </div>
        <p className="desc">{article.describe}</p>
      </div>
    </div>
  );
};

export default Course;
