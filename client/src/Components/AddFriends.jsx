import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriends,
  follow,
  loadUser,
} from "../assets/Redux/Actions/UserAction.jsx";
import profile from "../assets/userAvatar.png";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { debounce } from "lodash";

const AddFriends = () => {
  const { notFriends, followed, unfollowed, followLoading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const [followTrigger, setFollowTrigger] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [followClick, setFollowClick] = useState(false);
  useEffect(() => {
    dispatch(addFriends());
    dispatch(loadUser());
  }, [followTrigger, followed, unfollowed]);
  return (
    <div className="relative instagram-new w-full">
      <div className=" h-full py-2 hidden w-full md:flex flex-col justify-start px-2 gap-2">
        <h1 className="text-center text-xl mt-5 text-white font-bold tracking-wider bg-gradient-to-r from-[#6157ff] to-[#ee49fd] py-2.5 rounded-full">
          Follow
        </h1>
        {notFriends && notFriends.length > 0 ? (
          notFriends.map((item) => {
            const followHandler = debounce(async (e) => {
              e.preventDefault();
              await dispatch(follow(item._id));
              setFollowTrigger(!followTrigger);
            }, 500);
            return (
              <div
                key={item._id}
                className=" grid bg-white/95 mt-4 rounded-md py-2 px-1 grid-cols-3 gap-1"
              >
                <Link to={`/details/${item._id}`}>
                  <img
                    src={
                      item && item.profilePic
                        ? `http://localhost:5000/${item.profilePic.picPath}`
                        : profile
                    }
                    alt="User"
                    className="w-12 h-12 rounded-full"
                  />
                </Link>
                <Link
                  to={`/details/${item._id}`}
                  className=" flex items-center"
                >
                  <h1>
                    {String(item.name).length > 10
                      ? `${String(item.name).substring(0, 10)}...`
                      : `${item.name}`}
                  </h1>
                </Link>
                <div className="flex justify-end">
                  <button
                    onClick={followHandler}
                    disabled={followLoading ? true : false}
                    className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-white py-3 justify-center rounded-md px-3 w-12 items-center gap-2"
                  >
                    <AiOutlineUserAdd size={23} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex  bg-white mt-4 p-3 items-center justify-center rounded-md text-center">
            <h1 className="text-lg text-gray-700 font-semibold ">
              No User To Follow
            </h1>
          </div>
        )}
      </div>
      <button>
        {sideBar ? (
          <MdArrowLeft
            onClick={() => setSideBar(!sideBar)}
            size={25}
            className="fixed bg-gradient-to-r from-[#6157ff] to-[#ee49fd] mb-3 left-0 top-[147px] rounded-tr-xl rounded-br-xl z-50 md:hidden"
          />
        ) : (
          <MdArrowRight
            onClick={() => setSideBar(!sideBar)}
            size={25}
            className="bg-gradient-to-r from-[#6157ff] to-[#ee49fd] fixed  left-0 rounded-tr-xl rounded-br-xl top-[153px] z-40  md:hidden"
          />
        )}
      </button>
      {sideBar && (
        <div className=" h-full fixed bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff] w-60 left-0 top-[144px] md:hidden border-r-2 border-t-2 border-b-2 border-white z-40 flex flex-col justify-start px-2 gap-2">
          <h1 className="text-center text-xl mt-7 text-white font-bold tracking-wider bg-gradient-to-r from-[#6157ff] to-[#ee49fd] py-2.5 rounded-full">
            Follow
          </h1>
          {notFriends && notFriends.length > 0 ? (
            notFriends.map((item) => {
              const followHandler = debounce(async (e) => {
                e.preventDefault();
                await dispatch(follow(item._id));
                setFollowTrigger(!followTrigger);
              }, 500);
              return (
                <div
                  key={item._id}
                  className=" grid bg-white/95 mt-4 rounded-md py-2 px-1 grid-cols-3 gap-1"
                >
                  <Link to={`/details/${item._id}`}>
                    <img
                      src={
                        item && item.profilePic
                          ? `http://localhost:5000/${item.profilePic.picPath}`
                          : profile
                      }
                      alt="User"
                      className="w-12 h-12 rounded-full"
                    />
                  </Link>
                  <Link
                    to={`/details/${item._id}`}
                    className=" flex items-center"
                  >
                    <h1>{item.name}</h1>
                  </Link>
                  <button
                    onClick={followHandler}
                    disabled={followLoading ? true : false}
                    className="flex bg-gradient-to-r from-[#6157ff] to-[#ee49fd] text-white justify-center rounded-md px-3 w-12 items-center gap-2"
                  >
                    <AiOutlineUserAdd size={23} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="flex bg-white mt-4 p-3 items-center justify-center rounded-md text-center">
              <h1 className="text-lg font-semibold">No User To Follow</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddFriends;
