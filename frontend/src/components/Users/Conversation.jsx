import React from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation?._id;

  return (
    <>
      <div
        className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
          isSelected ? "bg-purple-100" : "hover:bg-gray-100"
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* User Info */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="avatar online">
            <div className="w-12 h-12 rounded-full border-2 border-purple-600 overflow-hidden">
              <img
                src={conversation.profilePic}
                alt={`${conversation.username}'s profile`}
                className="object-cover"
              />
            </div>
          </div>

          {/* Username */}
          <h2
            className={`text-base font-semibold transition-colors ${
              isSelected ? "text-purple-700" : "text-gray-800"
            }`}
          >
            {conversation.username}
          </h2>
        </div>

        {/* Message Icon */}
        {isSelected && (
          <LuMessageCircleMore className="text-purple-600 text-xl" />
        )}
      </div>

      {/* Divider */}
      {!lastIdx && <div className="border-t border-gray-200 mx-4" />}
    </>
  );
};

export default Conversation;
