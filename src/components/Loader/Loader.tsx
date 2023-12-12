import React from "react";
import "./loader.css";

const Loader = () => (
  <div className="w-screen h-[200px] flex justify-around items-center">
    <div className="lds-dual-ring"></div>
  </div>
);
export default Loader;
