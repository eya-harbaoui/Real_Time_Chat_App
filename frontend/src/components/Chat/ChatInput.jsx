import React from "react";

const ChatInput = () => {
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        placeholder="Type a message"
        className="input input-bordered flex-grow"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="btn bg-purple-600 text-white ml-2"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
