import React from "react";
import { ISquareProps } from "../models";

const Square = (props: ISquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;