import React, { Fragment, useEffect, useRef, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  chatUsers,
  checkUnreadMessage,
} from "../assets/Redux/Actions/chatAction.jsx";
import MessageBox from "../Components/MessageBox.jsx";
import profile from "../assets/userAvatar.png";
import { io } from "socket.io-client";
import { FaFacebookMessenger } from "react-icons/fa";

const Messanger = () => {
  const { users, unread } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [readTrigger, setReadTrigger] = useState(false);
  const [userList, setUserList] = useState(true);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("getUsers", (data) => {
      setOnlineUsers(data);
    });
  }, [user]);
  useEffect(() => {
    dispatch(chatUsers());
  }, []);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receive", (data) => {
      setReceiveMessage(data);
      console.log(data);
    });
  }, []);

  const personHandler = (e, id) => {
    e.preventDefault();
    setId(id);
    setUserList(!userList);
    setReadTrigger(!readTrigger);
  };

  useEffect(() => {
    dispatch(checkUnreadMessage());
  }, [sendMessage, receiveMessage, readTrigger, id]);

  const onlineStatus = (userId) => {
    return onlineUsers.some((user) => user.userId === userId);
  };

  return (
    <div className="lg:mt-[71px] instagram-new mt-36 z-50 flex flex-col md:flex-row md:items-center">
      <div className="w-1/4 border-r-2 hidden md:flex flex-col bg-white  border-gray-200 h-[89vh] ">
        <h1 className=" text-gradient  font-semibold text-2xl  pt-5 text-center">
          Users
        </h1>
        <div className="px-1 mt-5">
          {users && users.length > 0 ? (
            users
              .map((person) => {
                const hasUnread =
                  unread &&
                  unread.some(
                    (item) =>
                      item.senderId === person._id && item.senderId !== id
                  );

                return {
                  person,
                  hasUnread,
                };
              })
              .sort((a, b) => {
                return b.hasUnread - a.hasUnread;
              })
              .map(({ person, hasUnread }, index) => {
                return (
                  <Fragment>
                    {hasUnread && (
                      <div
                        key={`${person._id}-${index}-read`}
                        onClick={(e) => personHandler(e, person._id)}
                        className={
                          hasUnread
                            ? `flex relative items-center cursor-pointer gap-6 my-1 rounded-xl bg-gradient-to-r from-[#6157ff] text-[#fff] to-[#ee49fd] p-2`
                            : `hidden`
                        }
                      >
                        <div className="relative">
                          <img
                            src={
                              person && person?.profilePic?.picPath
                                ? `http://localhost:5000/${person?.profilePic?.picPath}`
                                : profile
                            }
                            alt="User"
                            className="w-12  h-12 rounded-full"
                          />
                          {onlineStatus(person._id) && (
                            <div className="w-3.5 h-3.5 right-0 bg-green-500 top-0 rounded-full absolute z-30"></div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <h1 className="text-lg font-medium">{person.name}</h1>
                          <div className="w-3.5 h-3.5 absolute top-1 right-3 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                    )}
                    {!hasUnread && (
                      <div
                        key={`${person._id}-${index}-unread`}
                        onClick={(e) => personHandler(e, person._id)}
                        className={
                          hasUnread
                            ? `hidden`
                            : `flex items-center cursor-pointer gap-6 my-1 rounded-xl bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-[#fff] p-2`
                        }
                      >
                        <div className="relative">
                          <img
                            src={
                              person && person?.profilePic?.picPath
                                ? `http://localhost:5000/${person?.profilePic?.picPath}`
                                : profile
                            }
                            alt="User"
                            className="w-12  h-12 rounded-full"
                          />
                          {onlineStatus(person._id) && (
                            <div className="w-3.5 h-3.5 right-0 bg-green-500 top-0 rounded-full absolute z-30"></div>
                          )}
                        </div>
                        <h1 className="text-lg lg:hidden font-medium">
                          {String(person.name).length > 8
                            ? `${String(person.name).substring(0, 8)}...`
                            : `${person.name}`}
                        </h1>
                        <h1 className="text-lg hidden lg:block font-medium">
                          {person.name}
                        </h1>
                      </div>
                    )}
                  </Fragment>
                );
              })
          ) : (
            <h1 className="text-gary-700 text-center text-xl">No Users</h1>
          )}
        </div>
      </div>
      <div className=" md:hidden fixed left-0 p-2  z-30 ">
        <FaFacebookMessenger
          size={29}
          className="text-[#6157ff]"
          onClick={() => setUserList(!userList)}
        />
      </div>
      {userList && (
        <div className="w-full sm:w-[40%]  md:hidden fixed left-0 top-[185px] b z-20   bg-white h-[89vh] ">
          <div>
            <h1 className="text-2xl font-semibold text-gradient  pt-5 text-center">
              Users
            </h1>
            <div className="px-1 mt-5">
              {users && users.length > 0 ? (
                users.map((person, index) => {
                  const hasUnread =
                    unread &&
                    unread.some(
                      (item) =>
                        item.senderId === person._id && item.senderId !== id
                    );
                  return (
                    <>
                      <div
                        key={`${person._id}-${index}-unread`}
                        onClick={(e) => personHandler(e, person._id)}
                        className={
                          hasUnread
                            ? `hidden`
                            : `flex items-center text-[#fff] cursor-pointer gap-6 my-1 rounded-xl bg-gradient-to-r from-[#6157ff] to-[#ee49fd] p-2`
                        }
                      >
                        <div className="relative">
                          <img
                            src={
                              person && person?.profilePic?.picPath
                                ? `http://localhost:5000/${person?.profilePic?.picPath}`
                                : profile
                            }
                            alt="User"
                            className="w-12  h-12 rounded-full"
                          />
                          {onlineStatus(person._id) && (
                            <div className="w-3.5 h-3.5 right-0 bg-green-500 top-0 rounded-full absolute z-30"></div>
                          )}
                        </div>
                        <h1 className="text-lg lg:hidden font-medium">
                          {String(person.name).length > 8
                            ? `${String(person.name).substring(0, 8)}...`
                            : `${person.name}`}
                        </h1>
                        <h1 className="text-lg hidden lg:block font-medium">
                          {person.name}
                        </h1>
                      </div>
                      <div
                        key={`${person._id}-${index}-read`}
                        onClick={(e) => personHandler(e, person._id)}
                        className={
                          hasUnread
                            ? `flex relative items-center cursor-pointer gap-6 my-1 text-[#fff] rounded-xl bg-gradient-to-r from-[#6157ff] to-[#ee49fd] p-2`
                            : `hidden`
                        }
                      >
                        <div className="relative">
                          <img
                            src={
                              person && person?.profilePic?.picPath
                                ? `http://localhost:5000/${person?.profilePic?.picPath}`
                                : profile
                            }
                            alt="User"
                            className="w-12  h-12 rounded-full"
                          />
                          {onlineStatus(person._id) && (
                            <div className="w-3.5 h-3.5 right-0 bg-green-500 top-0 rounded-full absolute z-30"></div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <h1 className="text-lg font-medium">{person.name}</h1>
                          <div className="w-3.5 h-3.5 absolute top-7 right-4 bg-[#6157ff] rounded-full"></div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <h1 className="text-center text-gray-700">No Users</h1>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-[80vh] md:h-[89vh]">
        <MessageBox
          id={id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Messanger;
