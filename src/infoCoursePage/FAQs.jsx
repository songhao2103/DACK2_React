import { useState } from "react";

const FAQs = () => {
  const [answer, setAnswer] = useState(new Array(4).fill(false));

  const handleClickQuestion = (value) => {
    setAnswer((prevAnswer) =>
      prevAnswer.map((item, index) => (index === value ? !item : item))
    );
  };



  return (
    <div className="faqs">
      <div className="box_question">
        <div className="question" onClick={() => handleClickQuestion(0)}>
          <p className="title_h5">What Does Royalty Free Mean?</p>
          <div className="icon">
            {answer[0] ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </div>
        </div>
        <p className={`desc ${answer[0] ? "active" : ""}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna,
          donec turpis egestas volutpat. Quisque nec non amet quis. Varius
          tellus justo odio parturient mauris curabitur lorem in.
        </p>
      </div>
      <div className="box_question">
        <div className="question" onClick={() => handleClickQuestion(1)}>
          <p className="title_h5">What Does Royalty Free Mean?</p>
          <div className="icon">
            {answer[1] ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </div>
        </div>
        <p className={`desc ${answer[1] ? "active" : ""}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna,
          donec turpis egestas volutpat. Quisque nec non amet quis. Varius
          tellus justo odio parturient mauris curabitur lorem in.
        </p>
      </div>
      <div className="box_question">
        <div className="question" onClick={() => handleClickQuestion(2)}>
          <p className="title_h5">What Does Royalty Free Mean?</p>
          <div className="icon">
            {answer[2] ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </div>
        </div>
        <p className={`desc ${answer[2] ? "active" : ""}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna,
          donec turpis egestas volutpat. Quisque nec non amet quis. Varius
          tellus justo odio parturient mauris curabitur lorem in.
        </p>
      </div>
      <div className="box_question">
        <div className="question" onClick={() => handleClickQuestion(3)}>
          <p className="title_h5">What Does Royalty Free Mean?</p>
          <div className="icon">
            {answer[3] ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </div>
        </div>
        <p className={`desc ${answer[3] ? "active" : ""}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          facilisis faucibus odio arcu duis dui, adipiscing facilisis. Urna,
          donec turpis egestas volutpat. Quisque nec non amet quis. Varius
          tellus justo odio parturient mauris curabitur lorem in.
        </p>
      </div>
    </div>
  );
};

export default FAQs;
