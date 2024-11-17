import { useState, useEffect, useRef } from "react";
const InfoEdu = () => {
  const [quantitys, setQuantitys] = useState(0, 0, 0, 0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const refElement = useRef(null);

  //đặt sự kiện scroll khi component được đưa vào
  useEffect(() => {
    const handleScroll = () => {
      if (!refElement.current || hasAnimated) return;
      const rect = refElement.current.getBoundingClientRect(); //lấy vị trí phần tử trên màn hình
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setHasAnimated(true);
        increaseQuantity();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasAnimated]);

  //hàm hiệu ứng tăng số
  const increaseQuantity = () => {
    const targets = [25, 899, 198, 100];
    const increment = targets.map((item) => item / 100);
    let current = [0, 0, 0, 0];

    const timerId = setInterval(() => {
      let isCompleted = true;
      current = current.map((value, index) => {
        const newValue = value + increment[index];
        if (newValue < targets[index]) {
          isCompleted = false;
          return newValue;
        } else {
          return targets[index];
        }
      });
      const newCurrent = current.map((item) => Math.floor(item));
      setQuantitys(newCurrent);
      if (isCompleted) {
        clearInterval(timerId);
      }
    }, 20);
  };

  return (
    <div className="info_edu" ref={refElement}>
      <div className="item">
        <p className="title_h2">{quantitys[0]}K</p>
        <p className="desc">Active Students</p>
      </div>
      <div className="item">
        <p className="title_h2">{quantitys[1]}</p>
        <p className="desc">Total Courses</p>
      </div>
      <div className="item">
        <p className="title_h2">{quantitys[2]}</p>
        <p className="desc">Instructor</p>
      </div>
      <div className="item">
        <p className="title_h2">{quantitys[3]}%</p>
        <p className="desc">Satisfaction rate</p>
      </div>
    </div>
  );
};

export default InfoEdu;
