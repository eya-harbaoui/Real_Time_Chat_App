import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

// Custom hook to listen for new messages from the socket
const useListenMessages = () => {
  // Destructure the socket instance from the socket context
  const { socket } = useSocketContext();
  // Destructure messages and setMessages from the Zustand store
  const { messages, setMessages } = useConversation();

  // useEffect to handle the socket event listener
  useEffect(() => {
    // Listen for the "newMessage" event from the socket
    socket?.on("newMessage", (newMessage) => {
      // Mark the new message to trigger a UI shake animation
      newMessage.shouldShake = true;

      // Play a notification sound when a new message is received
      const sound = new Audio(notificationSound);
      sound.play();

      // Update the messages state with the new message
      setMessages([...messages, newMessage]);
    });

    // Cleanup function to remove the event listener when the component unmounts
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]); // Dependencies ensure this effect re-runs when these values change
};

export default useListenMessages;
