import React from "react";
import { Message } from "./Message";
const MessageList = ({ messages, selfAvatar }) => {
  return (
    <div className="flex flex-col w-full bg-base-100 h-80 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <Message
          key={index}
          avatar={msg.isSelf ? selfAvatar : msg.avatar}
          username={msg.isSelf ? "Me" : msg.username}
          time={msg.time}
          text={msg.text}
          isSelf={msg.isSelf}
        />
      ))}
    </div>
  );
};

export default MessageList;
