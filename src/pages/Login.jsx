import { useContext, useEffect, useState } from "react";
import Data from "../context/Data";

import { Oval } from "react-loader-spinner";

import { nanoid } from "nanoid";

export const Login = ({ socket }) => {
  const {
    username,
    setUsername,
    setRoomId,
    roomId,
    setIsLogin,
    setMessages,
    setUsers,
  } = useContext(Data);

  const tabs = [
    {
      name: "Katıl",
      tabNumber: 1,
    },
    {
      name: "Oda kur",
      tabNumber: 2,
    },
  ];

  const [activeTab, setActiveTab] = useState(1);
  const [alert, setAlert] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  // console.log(isLoading);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 1) {
      setIsLoading(true);
      socket.emit("join", { roomId, username, isSetUp: false }, (result) => {
        result.isValid ? setIsLogin(result.isValid) : setAlert(result.isValid);
        setIsLoading(false);
      });
    } else {
      setIsLoading(true);
      const randomCode = nanoid(7);
      setRoomId(randomCode);
      socket.emit(
        "join",
        { roomId: randomCode, username, isSetUp: true },
        (result) => {
          setIsLogin(result.isValid);
          setIsLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    socket.on("joinReturn", (data) => {
      setUsers(data.users);
      setMessages((prev) => [
        ...prev,
        { type: data.type, message: data.message },
      ]);
    });
  }, [socket]);

  return (
    <>
      <div className="bg-blue1 flex h-screen w-screen items-center justify-center">
        <div className="bg-blue2 flex flex-col rounded-[10px] p-4">
          <div className="flex flex-col gap-3">
            <h1 className="text-[30px]">QuickChat</h1>
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
            <div className="flex flex-col gap-4">
              <div className="custom-scroll bg-blue3 flex h-[50px] flex-col gap-4 overflow-y-scroll rounded-bl-[5px] rounded-br-[5px] rounded-tr-[5px] p-3">
                <p className="text-white">Arkadaşının gönderdiği kodu gir.</p>
              </div>
              <form
                className="flex flex-col gap-2 flex-start"
                onSubmit={handleSubmit}
              >
                <input
                  placeholder="Kullanıcı adı..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-blue3 w-[375px] rounded-[5px] p-3 text-white outline-none"
                  type="text"
                />
                <input
                  placeholder="Kod..."
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="bg-blue3 w-[375px] rounded-bl-[5px] rounded-tl-[5px] p-3 text-white outline-none"
                  type="text"
                />
                {!alert && <p>Girdiğin kod geçersiz.</p>}
                <div>
                  <button className="bg-blue5 flex items-center justify-center rounded p-[14px] text-white">
                    {isLoading ? (
                      <Oval
                        height={20}
                        width={20}
                        color="white"
                        secondaryColor="lightblue"
                        strokeWidth={5}
                      />
                    ) : (
                      "Bağlan"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex flex-col gap-4">
              <div className="custom-scroll bg-blue3 flex h-[50px] flex-col gap-4 overflow-y-scroll rounded-bl-[5px] rounded-br-[5px] rounded-tr-[5px] p-3">
                <p className="text-white">
                  Odayı kur ve kodu arkadaşına gönder.
                </p>
              </div>
              <form
                className="flex flex-col gap-2 flex-start"
                onSubmit={handleSubmit}
              >
                <input
                  placeholder="Kullanıcı adı..."
                  className="bg-blue3 w-[375px] rounded-[5px] p-3 text-white outline-none"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <div>
                  <button className="bg-blue5 flex items-center justify-center rounded p-[14px] text-white">
                    {isLoading ? (
                      <Oval
                        height={20}
                        width={20}
                        color="white"
                        secondaryColor="lightblue"
                        strokeWidth={5}
                      />
                    ) : (
                      "Kur"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
