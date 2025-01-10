import React, { useEffect, useState } from "react";
import axios from "axios";
import { MESSAGES_URL } from "../Endpoints/Endpoints.js";
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const getMessage = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${MESSAGES_URL}/get/${selectedConversation._id}`,
        { withCredentials: true }
      );
      const data = response.data;
      if (data.error) {
        toast.error("Error while sending message");
      } else {
        setMessages(data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedConversation?._id) {
      getMessage();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessage;
