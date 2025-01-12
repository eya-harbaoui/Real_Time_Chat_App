// useSendMessage.js hook
import React, { useState } from "react";
import axios from "axios";
import { MESSAGES_URL } from "../Endpoints/Endpoints.js";
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message, file, audio) => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (message) {
        formData.append("message", message);
      }

      if (file) {
        console.log("Appending file to FormData:", {
          name: file.name,
          type: file.type,
          size: file.size,
        });
        formData.append("file", file);
      }

      if (audio) {
        console.log("Appending audio to FormData:", {
          size: audio.size,
          type: audio.type,
        });
        formData.append("file", audio);
      }

      // Log the formData contents
      for (let pair of formData.entries()) {
        console.log("FormData entry:", pair[0], pair[1]);
      }

      const response = await axios.post(
        `${MESSAGES_URL}/send/${selectedConversation._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      } else {
        setMessages([...messages, data]);
      }
    } catch (error) {
      console.error("Full error object:", error);
      toast.error(
        error.response?.data?.error || error.message || "Error sending message"
      );
      throw error; // Re-throw to be handled by the ChatInput component
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
