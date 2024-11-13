import { useEffect, useRef } from "react";

const PostComment = () => {
  const listBanner = useRef(null);

  let currentIndex = useRef(0);

  useEffect(() => {
    const moveBanner = () => {
      if (listBanner.current) {
        currentIndex.current++;
        listBanner.current.style.transform = `translateX(${
          currentIndex.current * -1920
        }px)`;

        if (currentIndex.current === 6) {
          listBanner.current.style.transition = "none";
          currentIndex.current = 0;
          listBanner.current.style.transform = `translateX(0)`;

          setTimeout(
            () =>
              (listBanner.current.style.transition =
                "transform 0.5s ease-in-out"),
            50
          );
        }
      }
    };
    const interval = setInterval(moveBanner, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="box_list_banner">
      <div ref={listBanner} className="list_banner">
        <div className="banner">
          <div className="content">
            <div className="title_h1">Build Skills with Online Course</div>
            <p className="desc">
              We denounce with righteous indignation and dislike men who are so
              beguiled and demoralized that cannot trouble.
            </p>
            <button className="btn_primary">Posts comment</button>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/studen_post_comment.png"
              alt=""
            />
          </div>
        </div>

        <div className="banner">
          <div className="content">
            <div className="title_h1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              maiores officia, eos ea culpa obcaecati, voluptatibus voluptas,
              sint est inventore praesentium et ex in. Pariatur exercitationem
              qui quae et ipsa.
            </p>
            <button className="btn_primary">Posts comment</button>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/1197152b1f3791e29722ad03113be3585641822a78c05a4c31e0fac0b6374d3a-removebg-preview.png"
              alt=""
            />
          </div>
        </div>

        <div className="banner">
          <div className="content">
            <div className="title_h1">
              Corporis nostrum sapiente dolorum laborum?.
            </div>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              maiores officia, eos ea culpa obcaecati, voluptatibus voluptas,
              sint est inventore praesentium et ex in. Pariatur exercitationem
              qui quae et ipsa.
            </p>
            <button className="btn_primary">Posts comment</button>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/af7f8ad4be54f206fc2c6e63b3db8859c4f7f426ce164cfb34293ce31ae752ec-removebg-preview.png"
              alt=""
            />
          </div>
        </div>

        <div className="banner">
          <div className="content">
            <div className="title_h1">
              Eos ea culpa obcaecati, voluptatibus voluptas.
            </div>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              maiores officia, eos ea culpa obcaecati, voluptatibus voluptas,
              sint est inventore praesentium et ex in. Pariatur exercitationem
              qui quae et ipsa.
            </p>
            <button className="btn_primary">Posts comment</button>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/ba95dcfeff68e5a4b506a5a5a86453235d6d6d766a0975928230b0a9fccc0a01-removebg-preview.png"
              alt=""
            />
          </div>
        </div>

        <div className="banner">
          <div className="content">
            <div className="title_h1">Inventore praesentium et ex in.</div>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              maiores officia, eos ea culpa obcaecati, voluptatibus voluptas,
              sint est inventore praesentium et ex in. Pariatur exercitationem
              qui quae et ipsa.
            </p>
            <button className="btn_primary">Posts comment</button>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/ef47382e39d5f0027d7525981d8b78f728b73c5dd893d1e630198a5c03e5543a-removebg-preview.png"
              alt=""
            />
          </div>
        </div>

        <div className="banner">
          <div className="content">
            <div className="title_h1">Build Skills with Online Course</div>
            <p className="desc">
              We denounce with righteous indignation and dislike men who are so
              beguiled and demoralized that cannot trouble.
            </p>
            <button className="btn_primary">Posts comment</button>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/studen_post_comment.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
