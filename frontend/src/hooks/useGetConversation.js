import React, { useEffect, useState } from "react";
import { USERS_URL } from "../Endpoints";
export const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = axios.get(USERS_URL);
        data = response.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  }, []);
};
export default useGetConversation;
