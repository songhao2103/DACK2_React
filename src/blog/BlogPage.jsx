import { listArticles } from "../listArticles";
import Course from "./Course";

//8h52 07/11/2024
const BlogPage = () => {
  return (
    <div className="blog_page">
      <div className="box_left">
        <div className="top">
          <p className="title_h2">All Articles</p>

          <div className="box_right">
            <div className="box_search">
              <input type="text" placeholder="Search" />
              <div className="icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div className="box_icon">
              <i className="fa-solid fa-border-all"></i>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>

        <div className="list_articles">
          {listArticles.map((article) => (
            <Course key={article.id} article={article}></Course>
          ))}
        </div>
      </div>

      <div className="box_right_blog">
        <div className="box_category">
          <p className="title_h4">Category</p>
          <ul className="list_category">
            <li className="item">
              <p className="desc">Commercial</p>
              <p className="desc">15</p>
            </li>
            <li className="item">
              <p className="desc">Office</p>
              <p className="desc">15</p>
            </li>
            <li className="item">
              <p className="desc">Shop</p>
              <p className="desc">15</p>
            </li>
            <li className="item">
              <p className="desc">Educate</p>
              <p className="desc">15</p>
            </li>
            <li className="item">
              <p className="desc">Academy</p>
              <p className="desc">15</p>
            </li>
            <li className="item">
              <p className="desc">Single family home</p>
              <p className="desc">15</p>
            </li>
          </ul>
        </div>

        <div className="recent_posts">
          <div className="title_h4">Recent Posts</div>
          <div className="list_post">
            <div className="item">
              <img src={listArticles[1].img} alt="" />
              <p className="title_h5">{listArticles[1].name}</p>
            </div>
            <div className="item">
              <img src={listArticles[2].img} alt="" />
              <p className="title_h5">{listArticles[1].name}</p>
            </div>
            <div className="item">
              <img src={listArticles[3].img} alt="" />
              <p className="title_h5">{listArticles[1].name}</p>
            </div>
          </div>
        </div>

        <div className="tags">
          <div className="title_h4">Tags</div>
          <div className="list_tags">
            <p className="desc item">Free courses</p>
            <p className="desc item">Marketing</p>
            <p className="desc item">Idea</p>
            <p className="desc item">LMS</p>
            <p className="desc item">LearnPress</p>
            <p className="desc item">Instructor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
