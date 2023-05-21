import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FOLLOWERS,
  follow,
  loadUser,
  unfollow,
} from "../assets/Redux/Actions/UserAction.jsx";
import { debounce } from "lodash";
const Friends = () => {
  const { user, followers, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  console.log(followers);
  const dispatch = useDispatch();
  const [followTrigger, setFollowTrigger] = useState(false);
  useEffect(() => {
    dispatch(FOLLOWERS());
  }, []);
  useEffect(() => {
    dispatch(loadUser());
  }, [followTrigger]);
  return (
    <div className="w-full mt-40 instagram-new lg:mt-20 flex flex-col items-center justify-center h-full">
      <h1 className="uppercase text-2xl font-semibold text-white tracking-wider mt-5 py-2 px-4 rounded-full bg-gradient-to-r from-[#6157ff] to-[#ee49fd]">
        Followers
      </h1>
      {followers && followers.length > 0 ? (
        followers.map((follower, index) => {
          const isFollowing = user.followings.some((following) => {
            return following.toString() === follower._id.toString();
          });
          const followHandler = debounce(async (id) => {
            if (isFollowing) {
              await dispatch(unfollow(id));
            } else {
              await dispatch(follow(id));
            }
            setFollowTrigger(!followTrigger);
          }, 500);

          return (
            <div
              key={index}
              className="w-[96%] sm:w-2/4 flex items-center justify-between rounded-xl bg-[#fff] p-4 my-4 text-white"
            >
              <Link to={`/details/${follower._id}`}>
                <h1 className="text-black/70 font-semibold text-lg">
                  {follower.name}
                </h1>
              </Link>
              <button
                disabled={followLoading || unfollowLoading ? true : false}
                onClick={() => followHandler(follower._id)}
              >
                {isFollowing ? (
                  <div className="bg-red-500 px-4 py-2.5 rounded-xl hover:scale-105">
                    <AiOutlineUserDelete size={30} />
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-[#6157ff] to-[#ee49fd] px-4 py-2.5 rounded-xl hover:scale-105">
                    <AiOutlineUserAdd size={30} />
                  </div>
                )}
              </button>
              <Link to={`/details/${follower._id}`}>
                <img
                  src={
                    follower &&
                    `http://localhost:5000/${follower.profilePic.picPath}`
                  }
                  alt="Pic"
                  className="w-16 h-16 rounded-xl"
                />
              </Link>
            </div>
          );
        })
      ) : (
        <h1 className="pt-10 text-xl font-semibold text-gray-700">
          No Follower
        </h1>
      )}
    </div>
  );
};

export default Friends;
