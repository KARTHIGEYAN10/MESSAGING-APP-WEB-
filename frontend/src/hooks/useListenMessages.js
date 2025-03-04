import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation"; 
import notificationsound from "../assets/sounds/chatsound.mp3"
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newmessage", (newmessage) => {
      const sound=new Audio(notificationsound)
      sound.play()
      setMessages([...messages, newmessage]);
 // ✅ Correct
    });
  
    return () => socket?.off("newmessage");
  }, [socket, setMessages,messages]);
  
};

export default useListenMessages; 
