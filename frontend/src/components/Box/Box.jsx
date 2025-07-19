import React from "react";
import "./Box.css";
function Box({ className, children }) {
  const boxClassName = `box ${className || ""}`;
  return <div className={boxClassName}>{children}</div>;
}
export default Box;
