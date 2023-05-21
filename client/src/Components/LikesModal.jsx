import React, { useEffect } from "react";
import { MdThumbUp } from "react-icons/md";
import { Link } from "react-router-dom";

const LikesModal = ({ post, user }) => {
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col gap-3">
      {post &&
        post.likes.length > 0 &&
        post.likes.map((like) => {
          return (
            <div className="flex bg-sky-400 px-2 py-1 rounded-md items-center gap-3">
              <Link
                to={
                  like.userId.toString() === user._id.toString()
                    ? `/account`
                    : `/details/${like.userId}`
                }
              >
                <img
                  src={`http://localhost:5000/${like.user.userPicPath}`}
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
              </Link>
              <div>
                <Link
                  to={
                    like.userId.toString() === user._id.toString()
                      ? `/account`
                      : `/details/${like.userId}`
                  }
                >
                  <h1>
                    <span className="text-gray-500 font-medium">Name :</span>{" "}
                    {like.user.userName}
                  </h1>
                  <h1>
                    <span className="text-gray-500 font-medium">Id :</span>{" "}
                    {like.userId}
                  </h1>
                </Link>
              </div>
            </div>
          );
        })}
      <div className="mt-2 text-center flex items-center gap-2">
        <h1 className="text-lg font-semibold text-gray-700">
          {post && post.likes.length}
        </h1>
        <MdThumbUp size={24} className="text-blue-600" />
      </div>
    </div>
  );
};

export default LikesModal;
