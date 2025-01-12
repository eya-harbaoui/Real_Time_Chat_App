import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const ChatHeader = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user?._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-4 items-center cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profilePic} alt="User Avatar" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{user.username}</h2>
        </div>
      </div>
      <div className="flex space-x-5 text-purple-600">
        <BsFillTelephoneFill size={20} />
        <FaVideo size={20} />
        <IoEllipsisVertical size={20} />
      </div>
    </div>
  );
};

export default ChatHeader;
