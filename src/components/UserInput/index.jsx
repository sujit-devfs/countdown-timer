import React from "react";
import "./userInput.css";

const UserInput = ({ handleDateChange }) => {
  const getDate = (e) => {
    handleDateChange(e.target.value);
  };

  return (
    <>
      <div className="search-container">
        <input type="datetime-local" onChange={getDate} />
      </div>
    </>
  );
};

export default UserInput;
