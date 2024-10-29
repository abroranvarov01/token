import React from "react";

const MessageCard = ({ className, message }) => {
  return (
    <div>
      <p className={className}>{message}</p>
    </div>
  );
};

export default MessageCard;
