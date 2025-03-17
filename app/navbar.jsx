import React from "react";
import Image from "next/image";
import cart from "../public/cart.jpg"
import Link from "next/link";

const navbar = () => {
  return (
    <>
      <div className="flex h-[10vh] items-center justify-between">
        <div className="flex items-center">
          <Image 
            src={cart}
            width={70}
            
            alt="logo"
            className="m-2 rounded-full ml-4"
          />
          <h2 className="text-3xl font-bold ml-4">TradeVault</h2>
        </div>
        <div className="flex gap-6 text-xl font-bold mr-4">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </>
  );
};

export default navbar;
