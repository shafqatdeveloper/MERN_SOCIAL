import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChat,
  readMessage,
  sendMessage,
} from "../assets/Redux/Actions/chatAction.jsx";
import "../App.css";
import { AiOutlineSend } from "react-icons/ai";
import { resetChatState } from "../assets/Redux/Reducers/chatReducer.jsx";
import { format } from "timeago.js";

const MessageBox = ({ id, setSendMessage, receiveMessage }) => {
  const dispatch = useDispatch();
  const { chat, sent } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [messageTrigger, setMessageTrigger] = useState(false);
  const [messages, setMessages] = useState([]);

  const scroll = useRef();

  useEffect(() => {
    if (id !== undefined && id !== null) {
      dispatch(getChat({ id }));
      if (sent) {
        setMessage("");
        dispatch(resetChatState());
      }
    }
  }, [id, messageTrigger, sent]);
  useEffect(() => {
    if (receiveMessage && receiveMessage.senderId === id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
  useEffect(() => {
    setMessages(chat);
  }, [chat]);

  useEffect(() => {
    dispatch(readMessage({ id }));
  }, [id, receiveMessage, sendMessage]);

  const messageHandler = () => {
    dispatch(sendMessage({ id, message }));
    setSendMessage({ message, receiverId: id, senderId: user._id });
    setMessage("");
    setMessageTrigger(!messageTrigger);
  };

  const enterMessageHandler = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      messageHandler();
      setMessageTrigger(!messageTrigger);
    }
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {id === null || id === undefined ? (
        <div className="w-full instagram-new  bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff] flex items-center justify-center h-full">
          <h1 className="text-2xl font-semibold text-gray-600">
            Select A Chat
          </h1>
        </div>
      ) : (
        <div className="relative">
          <div className="px-2 h-[65vh] overflow-y-auto mt-10">
            {messages && messages.length > 0 ? (
              messages.map((item, index) => {
                const isLatestMessage = index === messages.length - 1;
                return (
                  <div key={index} className="flex flex-col">
                    <div
                      className={
                        item.senderId.toString() === user._id.toString()
                          ? "bg-[#ee49fd] max-w-xl px-3 self-end my-1 py-1 rounded-xl   text-white"
                          : "bg-[#6157ff] max-w-xl px-3 self-start py-1 my-1 rounded-xl  text-white"
                      }
                    >
                      <div ref={scroll}>
                        <div className="">
                          <h1 className="font-medium text-lg">
                            {item.message}
                          </h1>
                          <span className="text-xs">
                            {item.senderId.toString() ===
                            user._id.toString() ? (
                              <>
                                {isLatestMessage && item.read === true
                                  ? `seen ${format(item.readTime)}`
                                  : `sent ${format(item.timeStamps)}`}
                              </>
                            ) : (
                              ` received ${format(item.timeStamps)}`
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <h1 className="text-xl font-semibold text-gray-500">
                  No Recent Messages
                </h1>
              </div>
            )}
          </div>
          <div className=" flex w-full md:w-[80%] bg-white text-black  fixed bottom-0 bg-gradient-to-l  p-2 flex-col items-center justify-center">
            <div className="border-2  flex items-center w-3/4 md:w-2/4 py-1 ml-2 border-black/50 rounded-md">
              <input
                type="text"
                placeholder="Enter Message here"
                value={message}
                className="outline-none py-1 w-full px-2 text-gray-700 bg-transparent focus:outline-none"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={enterMessageHandler}
              />
              <button
                className="pr-1"
                onClick={messageHandler}
                disabled={message === "" ? true : false}
              >
                <AiOutlineSend
                  onKeyDown={(e) => {
                    e.key === "Enter" && messageHandler(e);
                  }}
                  className="text-purple-500 cursor-pointer"
                  size={25}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBox;
