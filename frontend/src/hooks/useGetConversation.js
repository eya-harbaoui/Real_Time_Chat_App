import React, { useEffect, useState } from "react";
import { USERS_URL } from "../Endpoints/Endpoints";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
export const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(USERS_URL, { withCredentials: true });
        const data = response.data;
        if (data.error) {
          toast.error("error while fetching users");
          console.log(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations };
};
export default useGetConversation;
