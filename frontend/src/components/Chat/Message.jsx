import React from "react";

export const Message = ({ avatar, username, time, text, isSelf }) => {
  return (
    <div className={`chat ${isSelf ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} alt="Avatar" />
        </div>
      </div>
      <div className="chat-header space-x-1 m-1">
        <span>{username}</span>
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className="chat-bubble">{text}</div>
    </div>
  );
};
