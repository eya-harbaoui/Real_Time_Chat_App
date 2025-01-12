import React, { useEffect } from "react";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import useConversation from "../../zustand/useConversation";
import useGetMessage from "../../hooks/useGetMessage";
//this component is appearing when we want to chat with a selected user
const ChatCard = () => {
  //get the selected user from the store
  const { selectedConversation, setSelectedConversation } = useConversation();

  //messages
  const { messages, loading } = useGetMessage();
  console.log("messages", messages);

  return (
    <div className="card-body bg-base-100 shadow-2xl rounded-xl w-full flex flex-col h-auto">
      {/* Header */}
      <ChatHeader user={selectedConversation} />

      <div className="divider my-0 py-0"></div>

      {/* Conversation Messages */}

      <MessageList messages={messages} loading={loading} />

      {/* Input Field */}

      <ChatInput />
    </div>
  );
};

export default ChatCard;
