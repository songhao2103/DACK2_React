const Categories = () => {
  return (
    <div className="categories">
      <div className="top">
        <div className="left">
          <p className="title_h2">Top Categories</p>
          <p className="desc">Explore our Popular Categories</p>
        </div>
        <div className="right">
          <button className="btn_white">All categories</button>
        </div>
      </div>
      <div className="list_categories">
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-palette"></i>
          </div>
          <div className="title_h4">Art & Design</div>
          <p className="desc">38 Courses</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <div className="title_h4">Development</div>
          <p className="desc">38 Courses</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-brands fa-nfc-symbol"></i>
          </div>
          <div className="title_h4">Communiication</div>
          <p className="desc">38 Courses</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-photo-film"></i>
          </div>
          <div className="title_h4">Videography</div>
          <p className="desc">38 Courses</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-video"></i>
          </div>
          <div className="title_h4">Photography</div>
          <p className="desc">38 Courses</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-chart-simple"></i>
          </div>
          <div className="title_h4">Marketing</div>
          <p className="desc">38 Courses</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
          <div className="title_h4">Content Writing</div>
          <p className="desc">38 Courses</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-coins"></i>
          </div>
          <div className="title_h4">Finance</div>
          <p className="desc">38 Courses</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-atom"></i>
          </div>
          <div className="title_h4">Science</div>
          <p className="desc">38 Courses</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-globe"></i>
          </div>
          <div className="title_h4">Network</div>
          <p className="desc">38 Courses</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
