'use client'

import React from "react";
import Image from "next/image";
import SearchBar from "./Shared/SearchBar";

const Hero = () => {
  return (
    <div className="w-full flex flex-1 justify-center items-center">
      <div className="w-1/2 flex flex-col justify-between min-h-[480px]">
        <h1 className="text-white text-[64px] ">
          Secure, Fast, and Trusted Cryptocurrency Marketplace
        </h1>
        <div className="w-4/5">
          <p className="text-white text-lg font-bold w-4/5">
            Buy, sell, and trade top cryptocurrencies with ease and peace of
            mind.
          </p>
          <SearchBar placeholder="Enter your email address" onChange={(value: string) => { console.log(value)}} className="mt-8"/>
        </div>
      </div>
      <div>
        <Image src="/images/heroBg.png" width={634} height={634} alt="bannet" />
      </div>
    </div>
  );
};

export default Hero;
