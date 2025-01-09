import React, { useEffect } from "react";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import useConversation from "../../zustand/useConversation";
//this component is appearing when we want to chat with a selected user
const ChatCard = () => {
  //get the selected user from the store
  const { selectedConversation, setSelectedConversation } = useConversation();
  //my profile pic
  const selfProfilePic =
    "https://avatar.iran.liara.run/public/girl?username=ayou";

  //messages

  const [messages, setMessages] = React.useState([
    {
      profilePic: selectedConversation.profilePic,
      username: selectedConversation.username,
      time: "12:30 PM",
      text: "Hi, how are you?",
      isSelf: false,
    },
    {
      profilePic: selfProfilePic,
      username: "Me",
      time: "12:31 PM",
      text: "I'm doing well, thank you! How about you?",
      isSelf: true,
    },
  ]);

  const handleSendMessage = (text) => {
    const newMessage = {
      profilePic: selfProfilePic,
      username: "Me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text,
      isSelf: true,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="card-body bg-base-100 shadow-2xl rounded-xl w-full flex flex-col h-full">
      {/* Header */}
      <ChatHeader user={selectedConversation} />

      <div className="divider my-0 py-0"></div>

      {/* Conversation Messages */}
      <div className="flex-grow overflow-y-auto">
        <MessageList messages={messages} selfProfilePic={selfProfilePic} />
      </div>

      {/* Input Field */}
      <div className="mt-4">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatCard;
