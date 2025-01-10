import React, { useRef, useEffect } from "react";
import { Message } from "./Message";
import MessageSkeleton from "./MessageSkeleton";
const MessageList = ({ messages, loading }) => {
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="flex-grow w-full max-h-screen bg-base-100 overflow-y-scroll p-4 scrollbar-thin scrollbar-thumb-[#c0bdbdac] scrollbar-track-gray-200">
      {!loading &&
        messages.length > 0 &&
        messages.map((msg) => (
          <div key={msg._id} ref={lastMessageRef}>
            <Message message={msg} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-600">
          {" "}
          💬 Send a message to start a new conversation! 🚀
        </p>
      )}
    </div>
  );
};

export default MessageList;
