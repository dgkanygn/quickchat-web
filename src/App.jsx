import { useEffect, useContext } from "react";
import io from "socket.io-client";

// pages
import { Login } from "./pages/Login";
import { Room } from "./pages/Room";

// context
import Data from "./context/Data";

function App() {
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
  const socket = io.connect(SOCKET_URL);

  const { isLogin, setMessages } = useContext(Data);

  useEffect(() => {
    socket.on("msgReturn", (data) => {
      setMessages((prev) => [
        ...prev,
        { type: data.type, message: data.message, username: data.username },
      ]);
    });
  }, [socket]);

  return <>{isLogin ? <Room socket={socket} /> : <Login socket={socket} />}</>;
}

export default App;
