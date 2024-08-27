import React from "react";
import selectChat from "../assets/images/select-chat.png";

const SelectChat = () => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-full"
        style={{
          backgroundImage:
            "url(https://static.intercomassets.com/ember/assets/images/messenger-backgrounds/background-1-99a36524645be823aabcd0e673cb47f8.png)",
        }}
      >
        <img src={selectChat} className="w-64 h-w-64" />
        <h1 className="text-base font-normal tracking-tight text-arfablack">
          Please select a chat from your inbox to view messages.
        </h1>
      </div>
    </>
  );
};

export default SelectChat;
