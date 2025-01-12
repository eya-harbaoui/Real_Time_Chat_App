import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"; // For real-time communication
import { BACKEND_URL } from "../Endpoints/Endpoints";

// Create a context for managing socket connections
const SocketContext = createContext();

// Custom hook to access the SocketContext
export const useSocketContext = () => {
  return useContext(SocketContext);
};

// Context provider component for SocketContext
export const SocketContextProvider = ({ children }) => {
  // State to store the socket instance
  const [socket, setSocket] = useState(null);
  // State to store the list of online users
  const [onlineUsers, setOnlineUsers] = useState([]);
  // Get the authenticated user from the AuthContext
  const { authUser } = useAuthContext();

  // Effect to manage socket connection based on authentication status
  useEffect(() => {
    // If the user is authenticated, establish a socket connection
    if (authUser) {
      // Create a new socket instance, passing user information as a query
      const socket = io(BACKEND_URL, {
        query: {
          userId: authUser._id, // Pass the user's ID to the server
        },
        withCredentials: true, // Include credentials for secure communication
      });

      // Store the socket instance in state
      setSocket(socket);

      // Listen for the "getOnlineUsers" event from the server
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users); // Update the list of online users
      });

      // Cleanup function to close the socket when the component unmounts
      return () => socket.close();
    } else {
      // If the user is not authenticated, ensure the socket is closed
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]); // Dependency array ensures this effect runs when authUser changes

  // Provide the socket instance and online users list to child components
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
