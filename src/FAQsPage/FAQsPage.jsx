import { useState } from "react";

const FAQsPage = () => {
  const [hiddenAnswer, setHiddenAnswer] = useState(() => Array(9).fill(false));

  const handleHiddenAnswer = (value) => {
    const newHiddenAnswer = hiddenAnswer.map((item, index) =>
      value === index ? !item : item
    );
    setHiddenAnswer(newHiddenAnswer);
  };

  return (
    <div className="FAQs_page">
      <p className="title_h2">FAQs</p>
      <div className="content">
        <div className="column">
          <div className="item">
            <div className="title" onClick={() => handleHiddenAnswer(0)}>
              <p className="title_h5">What Does Royalty Free Mean?</p>
              <div className="icon">
                <i
                  className={`fa-solid fa-angle-down ${
                    hiddenAnswer[0] ? "active" : ""
                  }`}
                ></i>
              </div>
            </div>

            {hiddenAnswer[0] && (
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis faucibus odio arcu duis dui, adipiscing facilisis.
                Urna, donec turpis egestas volutpat. Quisque nec non amet quis.
                Varius tellus justo odio parturient mauris curabitur lorem in.
              </p>
            )}
          </div>
          <div className="item">
            <div className="title" onClick={() => handleHiddenAnswer(1)}>
              <p className="title_h5">What Does Royalty Free Mean?</p>
              <div className="icon">
                <i
                  className={`fa-solid fa-angle-down ${
                    hiddenAnswer[1] ? "active" : ""
                  }`}
                ></i>
              </div>
            </div>

            {hiddenAnswer[1] && (
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis faucibus odio arcu duis dui, adipiscing facilisis.
                Urna, donec turpis egestas volutpat. Quisque nec non amet quis.
                Varius tellus justo odio parturient mauris curabitur lorem in.
              </p>
            )}
          </div>
          <div className="item">
            <div className="title" onClick={() => handleHiddenAnswer(2)}>
              <p className="title_h5">What Does Royalty Free Mean?</p>
              <div className="icon">
                <i
                  className={`fa-solid fa-angle-down ${
                    hiddenAnswer[2] ? "active" : ""
                  }`}
                ></i>
              </div>
            </div>

            {hiddenAnswer[2] && (
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis faucibus odio arcu duis dui, adipiscing facilisis.
                Urna, donec turpis egestas volutpat. Quisque nec non amet quis.
                Varius tellus justo odio parturient mauris curabitur lorem in.
              </p>
            )}
          </div>
          <div className="item">
            <div className="title" onClick={() => handleHiddenAnswer(3)}>
              <p className="title_h5">What Does Royalty Free Mean?</p>
              <div className="icon">
                <i
                  className={`fa-solid fa-angle-down ${
                    hiddenAnswer[3] ? "active" : ""
                  }`}
                ></i>
              </div>
            </div>

            {hiddenAnswer[3] && (
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis faucibus odio arcu duis dui, adipiscing facilisis.
                Urna, donec turpis egestas volutpat. Quisque nec non amet quis.
                Varius tellus justo odio parturient mauris curabitur lorem in.
              </p>
            )}
          </div>
        </div>
        <div className="column">
          <div className="item">
            <div className="title" onClick={() => handleHiddenAnswer(4)}>
              <p className="title_h5">What Does Royalty Free Mean?</p>
              <div className="icon">
                <i
                  className={`fa-solid fa-angle-down ${
                    hiddenAnswer[4] ? "active" : ""
                  }`}
                ></i>
              </div>
            </div>

            {hiddenAnswer[4] && (
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis faucibus odio arcu duis dui, adipiscing facilisis.
                Urna, donec turpis egestas volutpat. Quisque nec non amet quis.
                Varius tellus justo odio parturient mauris curabitur lorem in.
              </p>
            )}
          </div>
          <div className="item">
            <div className="title" onClick={() => handleHiddenAnswer(5)}>
              <p className="title_h5">What Does Royalty Free Mean?</p>
              <div className="icon">
                <i
                  className={`fa-solid fa-angle-down ${
                    hiddenAnswer[5] ? "active" : ""
                  }`}
                ></i>
              </div>
            </div>

            {hiddenAnswer[5] && (
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis faucibus odio arcu duis dui, adipiscing facilisis.
                Urna, donec turpis egestas volutpat. Quisque nec non amet quis.
                Varius tellus justo odio parturient mauris curabitur lorem in.
              </p>
            )}
          </div>
          <div className="item">
            <div className="title" onClick={() => handleHiddenAnswer(6)}>
              <p className="title_h5">What Does Royalty Free Mean?</p>
              <div className="icon">
                <i
                  className={`fa-solid fa-angle-down ${
                    hiddenAnswer[5] ? "active" : ""
                  }`}
                ></i>
              </div>
            </div>

            {hiddenAnswer[6] && (
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis faucibus odio arcu duis dui, adipiscing facilisis.
                Urna, donec turpis egestas volutpat. Quisque nec non amet quis.
                Varius tellus justo odio parturient mauris curabitur lorem in.
              </p>
            )}
          </div>
          <div className="item">
            <div className="title" onClick={() => handleHiddenAnswer(7)}>
              <p className="title_h5">What Does Royalty Free Mean?</p>
              <div className="icon">
                <i
                  className={`fa-solid fa-angle-down ${
                    hiddenAnswer[7] ? "active" : ""
                  }`}
                ></i>
              </div>
            </div>

            {hiddenAnswer[7] && (
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                facilisis faucibus odio arcu duis dui, adipiscing facilisis.
                Urna, donec turpis egestas volutpat. Quisque nec non amet quis.
                Varius tellus justo odio parturient mauris curabitur lorem in.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="media">
        <img
          src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/Vector%20(4).svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default FAQsPage;
