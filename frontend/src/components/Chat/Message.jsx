import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
export const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const isSelf = message.senderId === authUser._id;
  const time = extractTime(message.createdAt);
  return (
    <div className={`chat ${isSelf ? "chat-end" : "chat-start"} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={isSelf ? authUser.profilePic : selectedConversation.profilePic}
            alt="Avatar"
          />
        </div>
      </div>
      <div className="chat-header space-x-1 m-1">
        <span>
          {isSelf ? authUser.username : selectedConversation.username}
        </span>
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div
        className={`chat-bubble ${
          isSelf ? "bg-purple-600" : "bg-gray-600"
        } text-white`}
      >
        {message.message}
      </div>
    </div>
  );
};
