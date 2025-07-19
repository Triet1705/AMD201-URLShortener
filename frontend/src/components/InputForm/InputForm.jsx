import React from "react";
import "./InputForm.css";

function InputForm({ className, value, onChange, placeholder, ...rest }) {
  const finalClassName = `inputForm ${className || ""}`;

  return (
    <input
      className={finalClassName}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default InputForm;
