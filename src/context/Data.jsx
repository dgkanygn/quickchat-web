import { createContext, useState } from "react";

const Data = createContext();

export const DataProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState([]);

  const data = {
    username,
    setUsername,
    roomId,
    setRoomId,
    isLogin,
    setIsLogin,
    messages,
    setMessages,
    users,
    setUsers,
  };

  return <Data.Provider value={data}>{children}</Data.Provider>;
};

export default Data;
