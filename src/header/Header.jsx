import BoxRight from "./BoxRight";
import Logo from "./Logo";
import Navigations from "./Navigations";

const Header = () => {


  return (
    <div className="header">
      <Logo></Logo>
      <Navigations></Navigations>

      <BoxRight></BoxRight>
    </div>
  );
};

export default Header;
