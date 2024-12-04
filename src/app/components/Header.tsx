import React from "react";
import Logo from "../../images/logo.svg";
import Navigation from "./Shared/Navigation";
import Hamburger from "./Shared/Hamburger";

const Header = () => {
  return (
    <header className="flex justify-between items-center pt-9 px-[84px]">
      <div className="flex justify-center gap-16">
        <Logo />
        <Navigation />
      </div>
      <Hamburger />
    </header>
  );
};

export default Header;
