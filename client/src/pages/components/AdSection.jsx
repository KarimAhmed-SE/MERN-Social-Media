import React from "react";
import logo from "../Logo.png";
import { Link } from "react-router-dom";
function AdSection() {
  return (
    <div className="block rounded-md bg-slate-700 w-fit md:flex-col  p-5 space-y-3 h-fit">
      <div className="flex justify-center items-center w-full">
        <div className="flex w-1/2 justify-start items-start">
          <p className="text-white">Sponsored</p>
        </div>
        <div className="flex w-1/2 justify-end items-end">
          <p className="text-slate-400">Close ad</p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <img
          src="images/Ad.jpg"
          className="rounded-md w-full h-[250px] bg-red-600"
        />
      </div>

      <div className=" md:w-full md:flex md:justify-between md:items-center p-1">
        <p className="block text-white">Computer Company </p>

        <Link className="block text-slate-400 cursor-pointer text-wrap md:text-nowrap">
          VeryRealComputerCompany.com
        </Link>
      </div>

      <div className="flex w-full justify-start items-start">
        <p className="text-slate-400">
          This is a very good computer, I highly recommend clicking on this
          totally safe link 👍
        </p>
      </div>
    </div>
  );
}

export default AdSection;
