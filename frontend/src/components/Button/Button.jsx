import React from "react";
import "./Button.css";

function Button({ className, children }) {
  const buttonClassName = `button ${className || ""}`;
  return (
    <div className={buttonClassName}>
      <div className="buttonText">{children}</div>
    </div>
  );
}

export default Button;
