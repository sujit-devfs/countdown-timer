import React from "react";
import "./messageForUser.css";

const MessageForUser = ({ message }) => {
  return (
    <div>{MessageForUser && <p className="user-message">{message}</p>}</div>
  );
};

export default MessageForUser;
