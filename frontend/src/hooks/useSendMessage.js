import React, { useState } from "react";
import axios from "axios";
import { MESSAGES_URL } from "../Endpoints/Endpoints.js";
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${MESSAGES_URL}/send/${selectedConversation._id}`,
        { message },
        { withCredentials: true }
      );
      const data = response.data;
      if (data.error) {
        toast.error("Error while sending message");
      } else {
        setMessages([...messages, data]);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};
export default useSendMessage;
