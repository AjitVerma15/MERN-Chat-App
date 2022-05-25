import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userData);

    if (!userData) {
      navigator("/");
    }
  }, [navigator]);
  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
