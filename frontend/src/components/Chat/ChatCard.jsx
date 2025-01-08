import React from "react";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
const ChatCard = () => {
  const selectedUser = {
    id: 2,
    fullName: "Jane Smith",
    username: "jane",
    avatar: `https://avatar.iran.liara.run/public/girl?username=jane`,
  };

  const selfAvatar = "https://placekitten.com/100/101";

  const [messages, setMessages] = React.useState([
    {
      avatar: selectedUser.avatar,
      username: selectedUser.username,
      time: "12:30 PM",
      text: "Hi, how are you?",
      isSelf: false,
    },
    {
      avatar: selfAvatar,
      username: "Me",
      time: "12:31 PM",
      text: "I'm doing well, thank you! How about you?",
      isSelf: true,
    },
  ]);

  const handleSendMessage = (text) => {
    const newMessage = {
      avatar: selfAvatar,
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
      <ChatHeader user={selectedUser} />

      <div className="divider my-0 py-0"></div>

      {/* Conversation Messages */}
      <div className="flex-grow overflow-y-auto">
        <MessageList messages={messages} selfAvatar={selfAvatar} />
      </div>

      {/* Input Field */}
      <div className="mt-4">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatCard;
