import React, { useEffect } from "react";
import Post from "../Components/Post.jsx";
import CreatePost from "../Components/CreatePost.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../assets/Redux/Actions/postAction.jsx";

import Loader from "../Components/Loader.jsx";
import AddFriends from "../Components/AddFriends.jsx";
import Following from "../Components/Following.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, posted, commented, loading } = useSelector(
    (state) => state.post
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, posted, commented]);

  return (
    <div className="w-full h-full font-alvetica bg-gradient-to-r from-[#b4dfff] to-[#d8b4ff]  flex items-start justify-center">
      <div className=" overflow-y-auto w-[20%] overflow-x-hidden md:fixed left-0 top-[9.1rem] lg:top-[72.5px]">
        <AddFriends />
      </div>
      <div className="w-full sm:w-3/5 md:w-[58%] mt-[178px] lg:mt-20">
        {isAuthenticated && <CreatePost />}
        {loading ? (
          <Loader />
        ) : (
          posts && posts.map((post, index) => <Post key={index} post={post} />)
        )}
      </div>
      <div className="overflow-x-hidden right-0 top-[9.1rem] lg:top-[72.5px] md:fixed h-[100vh] w-[20%] ">
        <Following />
      </div>
    </div>
  );
};

export default Home;
