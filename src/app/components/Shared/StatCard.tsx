import React from "react";
import { StatsProps } from "@/app/interfaces/Stats";

const StatCard: React.FC<StatsProps> = ({
  coinType,
  graph,
  coinIcon,
  amount,
  count,
  gain,
}) => {
  return (
    <div className="bg-[#272727] p-8 rounded-2xl flex justify-between items-center">
      <div className="flex gap-3 items-center">
        {coinIcon}
        <p className="text-white text-lg">
          <span className="font-bold">{coinType}</span>
          <br /> <span className="text-sm">{gain}</span>
        </p>
      </div>
      <div className="flex">
        {graph}
      </div>
      <div className="flex">
      <div className="flex">
        <p className="text-white text-lg">
          <span className="font-bold">{amount}</span>
          <br /> <span className="text-sm">{count}</span>
        </p>
      </div>
      </div>
    </div>
  );
};

export default StatCard;
