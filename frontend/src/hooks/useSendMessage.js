import React, { useState } from "react";
import axios from "axios";
import { MESSAGES_URL } from "../Endpoints/Endpoints.js";
import useConversation from "../zustand/useConversation.js";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${MESSAGES_URL}/send/${selectedConversation._id}`,
        message,
        { withCredentials: true }
      );
      const data = response.data;
      if (data.error) {
        setError(data.error);
        toast.error("Error while sending message");
      } else {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendMessage };
};
export default useSendMessage;
