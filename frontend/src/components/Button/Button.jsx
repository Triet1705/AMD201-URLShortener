import React from "react";
import "./Button.css";

function Button({ className, children, ...rest }) {
  const buttonClassName = `button ${className || ""}`;
  return (
    <button className={buttonClassName} {...rest}>
      <div className="buttonText">{children}</div>
    </button>
  );
}

export default Button;
