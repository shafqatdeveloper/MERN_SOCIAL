import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  follow,
  followingUsers,
  loadUser,
  unfollow,
} from "../assets/Redux/Actions/UserAction.jsx";
import profile from "../assets/userAvatar.png";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { debounce } from "lodash";

const Following = () => {
  const { following, followed, unfollowed, unfollowLoading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const [followTrigger, setFollowTrigger] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  useEffect(() => {
    dispatch(followingUsers());
    dispatch(loadUser());
  }, [followTrigger, followed, unfollowed]);
  return (
    <div className="relative instagram-new">
      <div className=" h-full hidden  md:flex py-2 px-2 w-full flex-col justify-start  gap-2">
        <h1 className="text-center text-xl mt-5 text-white font-bold tracking-wider bg-gradient-to-r from-[#6157ff] to-[#ee49fd] py-2.5 rounded-full">
          Following
        </h1>
        {following && following.length > 0 ? (
          following.map((item) => {
            const followHandler = debounce(async (e) => {
              e.preventDefault();
              await dispatch(unfollow(item._id));
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
                  className=" flex mr-1 items-center"
                >
                  <h1>
                    {String(item.name).length > 10
                      ? `${String(item.name).substring(0, 10)}...`
                      : `${item.name}`}
                  </h1>
                </Link>
                <div className="w-full flex justify-end">
                  <button
                    onClick={followHandler}
                    disabled={unfollowLoading ? true : false}
                    className="flex bg-[#c01e1e] text-white py-3 justify-center rounded-md px-3 w-12 items-center gap-2"
                  >
                    <AiOutlineUserDelete size={23} />{" "}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex  bg-white mt-4 p-3 items-center justify-center rounded-md text-center">
            <h1 className="text-lg text-gray-700 font-semibold">
              Not Followed Any User
            </h1>
          </div>
        )}
      </div>
      <button>
        {sideBar ? (
          <MdArrowRight
            onClick={() => setSideBar(!sideBar)}
            size={25}
            className="fixed  bg-gradient-to-r from-[#6157ff] to-[#ee49fd] mb-3 right-0 top-[147px] rounded-tl-xl rounded-bl-xl z-50 md:hidden"
          />
        ) : (
          <MdArrowLeft
            onClick={() => setSideBar(!sideBar)}
            size={25}
            className=" bg-gradient-to-r from-[#6157ff] to-[#ee49fd] fixed right-0 rounded-tl-xl rounded-bl-xl top-[153px] z-40  md:hidden"
          />
        )}
      </button>
      {sideBar && (
        <div className="h-full fixed bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff] w-60 right-0 top-[144px] md:hidden border-l-2 border-t-2 border-b-2 border-white z-40 flex flex-col justify-start px-2 gap-2">
          <h1 className="text-center text-xl mt-7 text-white font-bold tracking-wider  bg-gradient-to-r from-[#6157ff] to-[#ee49fd] py-2.5 rounded-full">
            Follwoing
          </h1>
          {following && following.length > 0 ? (
            following.map((item) => {
              const followHandler = debounce(async (e) => {
                e.preventDefault();
                await dispatch(unfollow(item._id));
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
                    disabled={unfollowLoading ? true : false}
                    onClick={followHandler}
                    className="flex bg-[#c01e1e] text-white justify-center rounded-md px-3 w-12 items-center gap-2"
                  >
                    <AiOutlineUserDelete size={23} />{" "}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="flex  bg-white mt-4 p-3 items-center justify-center rounded-md text-center">
              <h1 className="text-lg font-semibold">Not Followed Any User</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Following;
