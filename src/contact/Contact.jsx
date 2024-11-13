const Contact = () => {
  return (
    <div className="contact">
      <div className="top">
        <div className="content">
          <p className="title_h2">Need a direct line?</p>
          <p className="desc">
            Cras massa et odio donec faucibus in. Vitae pretium massa dolor
            ullamcorper lectus elit quam.
          </p>
          <div className="info">
            <div className="item">
              <div className="icon">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <div className="right">
                <p className="desc">Phone</p>
                <p className="desc">(123) 456 7890</p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="right">
                <p className="desc">Email</p>
                <p className="desc">contact@thimpress.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="map">
          <img
            src="https://songhao2103.github.io/IMG_du_an_REACT/img_/img_media/unsplash_kN_kViDchA0.png"
            alt=""
          />
        </div>
      </div>

      <div className="contact_us">
        <p className="title_h2">Contact us</p>
        <p className="desc">
          Your email address will not be published. Required fields are marked *
        </p>
        <div className="box_input">
          <input type="text" placeholder="Name*" />
          <input type="text" placeholder="Email*" />
        </div>
        <div className="comment">
          <textarea
            name=""
            id=""
            placeholder="Comment*"
            cols={173}
            rows={6}
          ></textarea>
        </div>
        <div className="save">
          <input type="checkbox" />
          <p className="desc">
            Save my name, email in this brower for the next time I comment
          </p>
        </div>
        <div className="btn_primary">Posts Comment</div>
      </div>
    </div>
  );
};

export default Contact;
