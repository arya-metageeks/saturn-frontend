import React from "react";

interface ListitemsProps {
  items: {
    scapes: string;
    usd: number;
    wallet: string;
    time: string;
  }[];
}

const ListContainer: React.FC<ListitemsProps> = ({ items }) => {
  return (
    <ul role="list" className="space-y-3 w-full">
      {items.map((item) => (
        <div className="w-full rounded-md bg-white shadow" key={item?.time}>
          <div className="flex items-center justify-between border-b-[1px] border-[#000] py-[14px] px-[38px] gap-3">
            <p className="text-[#7F56D9]">
              <span className="font-bold">scapes: </span>
              {item?.scapes}
            </p>
            <p className="text-[#000] font-bold">
              <span className=" text-[#556FF5] pe-12">USD: </span>
              {item?.usd}
            </p>
          </div>
          <div className="flex items-center justify-between py-[14px] px-[38px] gap-3">
            <p className="text-[#7F56D9]">
              <span className="font-bold">Wallet: </span>
              {item?.wallet}
            </p>
            <p className="text-[#000] font-bold">
              <span className="text-[#556FF5] pe-12">Time: </span>
              {item?.time}
            </p>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default ListContainer