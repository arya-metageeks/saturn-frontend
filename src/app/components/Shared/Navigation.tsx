import React from "react";
import route from "../../routes/route.json";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex gap-[47px] items-center">
      {route &&
        route.map((nav: { name: string; link: string }) => (
          <span className="text-white text-[16px]" key={nav?.name}>
            <Link href={nav?.link}>{nav?.name}</Link>
          </span>
        ))}
    </div>
  );
};

export default Navigation;
