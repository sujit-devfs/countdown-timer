import React from "react";
import "./timerBlock.css";

const TimerBlock = ({value,label}) => {
  return (
    <div className="block">
      <p className="value">{value}</p>
      <p className="label">{label}</p>
    </div>
  );
};

export default TimerBlock;
