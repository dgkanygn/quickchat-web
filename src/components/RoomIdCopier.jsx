import React, { useContext, useRef } from "react";
import Data from "../context/Data";

export const RoomIdCopier = () => {
  const { roomId } = useContext(Data);

  const roomIdRef = useRef(null);

  const copyRoomId = (textRef) => {
    navigator.clipboard.writeText(textRef.current.innerText);
    const range = document.createRange();
    range.selectNodeContents(textRef.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <>
      <div className="flex">
        <div className="bg-blue3 w-[120px] rounded-bl-[5px] rounded-tl-[5px] p-2 text-white outline-none">
          <p ref={roomIdRef}>{roomId}</p>
        </div>
        <button
          className="bg-blue5 flex items-center justify-center rounded-br-[5px] rounded-tr-[5px] p-2 px-3"
          onClick={() => copyRoomId(roomIdRef)}
        >
          <i className="fa-solid fa-copy"></i>
        </button>
      </div>
    </>
  );
};

{
  /* <div className="flex">
                  <div className="bg-blue3 w-[334px] rounded-bl-[5px] rounded-tl-[5px] p-3 text-white outline-none">
                    <p>KK3KSDK3K</p>
                  </div>
                  <button className="bg-blue5 flex items-center justify-center rounded-br-[5px] rounded-tr-[5px] p-[14px]">
                    <i className="fa-solid fa-copy"></i>
                  </button>
                </div> */
}
