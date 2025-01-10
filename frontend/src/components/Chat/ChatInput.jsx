import React from "react";
import useSendMessage from "../../hooks/useSendMessage";
import { IoIosSend } from "react-icons/io";
const ChatInput = () => {
  const [message, setMessage] = React.useState("");
  const { sendMessage } = useSendMessage();

  const handleSend = async () => {
    //console.log("message", message);
    if (message.trim()) {
      await sendMessage(message);
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
        className="btn bg-purple-600 text-white ml-2 hover:bg-purple-500 transition-colors duration-200 "
        onClick={handleSend}
      >
        <IoIosSend size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
