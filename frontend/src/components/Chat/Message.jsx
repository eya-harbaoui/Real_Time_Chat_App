import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

import { MessageContent } from "./MessageContent";

export const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  if (!message || !authUser || !selectedConversation) {
    return null;
  }

  const isSelf = message.senderId === authUser._id;
  const time = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${isSelf ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={isSelf ? authUser.profilePic : selectedConversation.profilePic}
            alt="Avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "path/to/default-avatar.png"; // Add a default avatar path
            }}
          />
        </div>
      </div>

      <div className="chat-header space-x-1 m-1">
        <span>
          {isSelf ? authUser.fullName : selectedConversation.fullName}
        </span>
        <time className="text-xs opacity-50">{time}</time>
      </div>

      <div
        className={`chat-bubble ${
          isSelf ? "bg-purple-600" : "bg-gray-600"
        } text-white ${shakeClass}`}
      >
        <MessageContent message={message} />
      </div>
    </div>
  );
};
