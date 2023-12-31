import { useState, useEffect, useRef, useContext } from "react";

// context
import Data from "../context/Data";

// component
import { RoomIdCopier } from "../components/RoomIdCopier";

export const Room = ({ socket }) => {
  const { roomId, username, messages, users } = useContext(Data);

  const tabs = [
    {
      name: "Oda",
      tabNumber: 1,
    },
    {
      name: "Kişiler",
      tabNumber: 2,
    },
  ];

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const msgContent = {
      roomId,
      username,
      message: input,
      type: "message",
    };

    if (input !== " " && input.length !== 0) {
      await socket.emit("sendMessage", msgContent);
    }
    setInput("");
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTab]);

  const leaveRoom = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="bg-blue1 flex h-screen w-screen items-center justify-center">
        <div className="bg-blue2 flex flex-col rounded-[10px] p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-[30px]">QuickChat</h1>
              <div className="flex justify-between items-center gap-1">
                <RoomIdCopier />
                <button
                  className="bg-blue5 rounded p-[10px]"
                  onClick={leaveRoom}
                >
                  <i className="fa-solid fa-xmark flex items-center justify-center text-[20px]"></i>
                </button>
              </div>
            </div>
            <div className="flex">
              {tabs.map((tab, index) => (
                <p
                  key={index}
                  className={`rounded-t-[5px] px-4 py-3 text-[20px] cursor-pointer ${
                    activeTab !== tab.tabNumber
                      ? `hover:bg-tabhover`
                      : `bg-blue3`
                  }`}
                  onClick={() => handleTabClick(tab.tabNumber)}
                >
                  {tab.name}
                </p>
              ))}
            </div>
          </div>
          {activeTab === 1 && (
            <>
              <div className="flex flex-col gap-4">
                <div
                  ref={messagesEndRef}
                  className="custom-scroll bg-blue3 flex h-[400px] flex-col gap-4 overflow-y-scroll rounded-bl-[5px] rounded-br-[5px] rounded-tr-[5px] p-3"
                >
                  {messages.map((msg, index) => (
                    <div key={index}>
                      {msg.type === "message" && (
                        <div
                          className={
                            msg.username === username ? "flex justify-end" : ""
                          }
                        >
                          <div>
                            {msg.username !== username && <p>{msg.username}</p>}
                            <p
                              className={
                                msg.username !== username
                                  ? "bg-blue5 inline-block rounded-bl-[15px] rounded-br-[15px] rounded-tr-[15px] px-3 py-[6px]"
                                  : "bg-blue5 inline-block rounded-bl-[15px] rounded-br-[15px] rounded-tl-[15px] px-3 py-[6px]"
                              }
                            >
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      )}
                      {msg.type === "action" && (
                        <div>
                          <p className="bg-blue4 px-3 py-2 inline-block rounded">
                            {msg.message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <form className="flex" onSubmit={handleSubmit}>
                  <input
                    placeholder="Mesaj yaz..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-blue3 w-[600px] rounded-bl-[5px] rounded-tl-[5px] px-2 text-white outline-none"
                    type="text"
                    maxLength={54}
                  />
                  <button className="bg-blue5 flex items-center justify-center rounded-br-[5px] rounded-tr-[5px] p-[14px]">
                    <i className="fa-solid fa-paper-plane text-[13px]"></i>
                  </button>
                </form>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              <div className="flex flex-col gap-4">
                <div className="bg-blue3 flex w-[641px] h-[457px] flex-col  rounded-bl-[5px] rounded-br-[5px] rounded-tr-[5px] ">
                  {users.map((user, index) => (
                    <div key={index} className="hover:bg-blue4 p-3 px-4">
                      <p>{user.username}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
