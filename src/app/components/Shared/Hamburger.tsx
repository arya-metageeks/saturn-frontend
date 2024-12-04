import React from "react";
import HamburgerIcon from "../../../images/hamburger.svg";

const Hamburger = () => {
  return (
    <div className="flex items-center gap-6">
      <span className="text-white text-[16px]">Menu</span>
      <HamburgerIcon />
    </div>
  );
};

export default Hamburger;
