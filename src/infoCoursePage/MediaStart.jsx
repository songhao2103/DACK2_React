import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MediaStart = () => {
  //Tính giá của course
  const course = useSelector((state) => state.courseViewed);
  const displayPrice = ((course.price * (100 - course.sale)) / 100).toFixed(1);

  return (
    <div className="media_start">
      <div className="media">
        <div className="image">
          <img src={course.img} alt="" />
        </div>

        <div className="bottom">
          <div className="price">
            <p className={`old desc ${course.sale !== 0 ? "sale" : ""}`}>
              ${course.price}
            </p>
            {course.sale !== 0 && (
              <p className={`new desc ${displayPrice == 0 ? "free" : ""}`}>
                {displayPrice == 0 ? "Free" : `$${displayPrice}`}
              </p>
            )}
          </div>
          <Link to={"/check-out"} className="btn_primary">
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MediaStart;
