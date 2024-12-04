import React from "react";
import TestimonialTemplate from "./Shared/TestimonialTemplate";
import BrandCloud from "./Shared/BrandCloud";

const Testimonial = () => {
  return (
    <div className="w-full bg-[#0C111D] py-[96px] flex flex-col justify-center items-center gap-[96px]">
      <div className="!w-[90%] flex justify-betweeen ">
        <div className="w-[328px] h-[328px] rounded-2xl bg-[#e0e0e0]"></div>
        <TestimonialTemplate />
      </div>
      <div className="w-full">
        <h1 className="text-white text-[64px] w-1/2 m-auto text-center">
          Join 4,000+ companies already growing
        </h1>
        <BrandCloud />
      </div>
    </div>
  );
};

export default Testimonial;
