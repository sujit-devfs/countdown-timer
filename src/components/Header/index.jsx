import React from "react";
import "./title.css";
import gif from "./sand-icon.gif"
const Title = ({isTimerActive}) => {
  return (
    <div>
        {isTimerActive && <img src={gif} alt="Loading..."/>}
      <h2>
        Countdown<span>Timer</span>
      </h2>
    </div>
  );
};

export default Title;
