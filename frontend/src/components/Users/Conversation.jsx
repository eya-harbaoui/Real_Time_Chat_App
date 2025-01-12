import React from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation?._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex flex-col md:flex-row items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 min-w-[100px] md:min-w-full
          ${isSelected ? "bg-purple-100" : "hover:bg-gray-100"}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* Avatar */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 h-12 rounded-full border-2 border-purple-600 overflow-hidden">
            <img
              src={conversation.profilePic}
              alt={`${conversation.fullName}'s profile`}
              className="object-cover"
            />
          </div>
        </div>

        {/* fullName */}
        <h2
          className={`mt-2 md:mt-0 md:ml-4 text-sm md:text-base font-semibold transition-colors text-center md:text-left
          ${isSelected ? "text-purple-700" : "text-gray-800"}
        `}
        >
          {conversation.fullName}
        </h2>

        {/* Message Icon */}
        {isSelected && (
          <LuMessageCircleMore className="hidden md:block ml-auto text-purple-600 text-xl" />
        )}
      </div>

      {/* Divider - only show on desktop */}
      {!lastIdx && (
        <div className="hidden md:block border-t border-gray-200 mx-4" />
      )}
    </>
  );
};

export default Conversation;
