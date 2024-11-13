import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi đường dẫn thay đổi
  }, [pathname]);

  //hàm cuộn về đầu trang
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //Theo dõi sự kiện cuộn trang
  useEffect(() => {
    const changeVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", changeVisibility);

    return () => window.removeEventListener("scroll", changeVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="scroll_to_top">
          <button className="btn_primary" onClick={handleScrollToTop}>
            <i className="fa-solid fa-caret-up"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
