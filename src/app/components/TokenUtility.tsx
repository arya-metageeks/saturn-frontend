import React from "react";
import Divider from "../../images/divider.svg";
import Stats from "./Stats/Stats";

const TokenUtility = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Divider />
      <h1 className="w-1/2 m-auto text-[64px] text-center pt-12">
        $Token Utility and Tokenomics
      </h1>
      <Stats />
    </div>
  );
};

export default TokenUtility;
