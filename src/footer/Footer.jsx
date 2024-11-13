import Logo from "../header/Logo";
const Footer = () => {
  return (
    <div className="footer">
      <div className="item logo_footer">
        <Logo></Logo>
        <p className="desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="item">
        <ul>
          <li className="title">GET HELP</li>
          <li className="desc">Contact Us</li>
          <li className="desc">Latest Articles</li>
          <li className="desc">FAQ</li>
        </ul>
      </div>
      <div className="item">
        <ul>
          <li className="title">PRROGRAMS</li>
          <li className="desc">Art & Design</li>
          <li className="desc">Business</li>
          <li className="desc">IT & Software</li>
          <li className="desc">Languages</li>
          <li className="desc">Programming</li>
        </ul>
      </div>
      <div className="item">
        <ul>
          <li className="title">CONTACT US</li>
          <li className="desc">
            Address: 2321 New Design Str, Lorem Ipsum10 Hudson Yards, USA
          </li>
          <li>
            <p className="desc"> Tel: + (123) 2500-567-8988 </p>
            <p className="desc"> Mail: supportlms@gmail.com</p>
          </li>
          <li className="icon_contacts">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-pinterest-p"></i>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fa-brands fa-square-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
