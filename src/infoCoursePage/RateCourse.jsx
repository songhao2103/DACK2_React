const RateCourse = () => {
  return (
    <div className="rate_course">
      <div className="title_h4">Comments</div>
      <div className="box_rate">
        <div className="top">
          <p className="title_h1">4.0</p>
          <div className="right">
            <div className="rate">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <p className="desc">based on 146,951 ratings</p>
          </div>
        </div>
        <div className="list_options_rate">
          <div className="option">
            <div className="list_stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <p className="desc">90%</p>
            <div className="bar" style={{ "--width": "90%" }}>
              <div className="item"></div>
              <div className="item"></div>
            </div>
          </div>
          <div className="option">
            <div className="list_stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <p className="desc">5%</p>
            <div className="bar" style={{ "--width": "5%" }}>
              <div className="item"></div>
              <div className="item"></div>
            </div>
          </div>
          <div className="option">
            <div className="list_stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <p className="desc">2%</p>
            <div className="bar" style={{ "--width": "2%" }}>
              <div className="item"></div>
              <div className="item"></div>
            </div>
          </div>
          <div className="option">
            <div className="list_stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <p className="desc">2%</p>
            <div className="bar" style={{ "--width": "2%" }}>
              <div className="item"></div>
              <div className="item"></div>
            </div>
          </div>
          <div className="option">
            <div className="list_stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <p className="desc">1%</p>
            <div className="bar" style={{ "--width": "1%" }}>
              <div className="item"></div>
              <div className="item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCourse;
