import { useRef } from "react";
import React from "react";

const Button = function (props) {
  const inputRef = useRef();

  const clickHandler = function () {
    props.onClick(inputRef.current.value);
  };

  return (
    <button
      ref={inputRef}
      type="button"
      className={props.className}
      onClick={clickHandler}
      value={props.value}
    >
      {props.children}
    </button>
  );
};

export default Button;
