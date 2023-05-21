import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar.jsx";
import toast, { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "./assets/Redux/Actions/UserAction.jsx";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Unauthenticated from "./Pages/Unauthenticated.jsx";
import Home from "./Pages/Home.jsx";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./Pages/ResetPassword.jsx";
import LoginSignup from "./Pages/LoginSignup.jsx";
import {
  resetFollow,
  resetPasswordState,
  resetProfileDelete,
  resetProfileState,
  resetUnfollow,
  resetState as resetUserState,
} from "./assets/Redux/Reducers/userReducer.jsx";
import {
  resetDeleteComment,
  resetPostUpdated,
  resetState,
} from "./assets/Redux/Reducers/postReducer.jsx";
import Friends from "./Pages/Friends.jsx";
import AdminProfile from "./Pages/AdminProfile.jsx";
import Messanger from "./Pages/Messanger.jsx";
import UserDetails from "./Pages/UserDetails.jsx";
import ChangePassword from "./Components/ChangePassword.jsx";
import UpdateProfile from "./Pages/UpdateProfile.jsx";
import EditPost from "./Pages/EditPost.jsx";
import Menu from "./Components/Menu.jsx";
import { resetChatState } from "./assets/Redux/Reducers/chatReducer.jsx";
import Page404 from "./Pages/Page404.jsx";
const App = () => {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    followed,
    unfollowed,
    passwordUpdated,
    profileUpdated,
    userErrors,
    profileDeleted,
    loggedOut,
  } = useSelector((state) => state.user);

  const {
    liked,
    unliked,
    postErrors,
    commented,
    commentDeleted,
    deleted,
    postUpdated,
  } = useSelector((state) => state.post);
  const { chatErrors } = useSelector((state) => state.chat);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, isAuthenticated, loggedOut]);
  useEffect(() => {
    if (followed) {
      toast("User Followed", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="green" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetFollow());
    }
    if (postUpdated) {
      toast("Post Updated", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="green" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetPostUpdated());
    }
    if (commentDeleted) {
      toast("Comment Deleted", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="red" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetDeleteComment());
    }
    if (profileDeleted) {
      toast("Profile Deleted Successfully", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="red" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetProfileDelete());
    }
    if (postErrors) {
      toast(postErrors, {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="red" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetState());
    }
    if (userErrors) {
      toast(String(userErrors), {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="red" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetUserState());
    }
    if (chatErrors) {
      toast(String(chatErrors), {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="red" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetChatState());
    }
    if (deleted) {
      toast("Post Deleted", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="red" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetState());
    }
    if (unfollowed) {
      toast("User Unfollowed", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="red" />,
        style: {
          background: "white",
          color: "red",
        },
      });
      dispatch(resetUnfollow());
    }
    if (liked) {
      toast("Post Liked", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="green" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetState());
    }
    // if (sent) {
    //   toast("Sent", {
    //     duration: 4000,
    //     position: "top-center",
    //     icon: <BsFillCheckCircleFill color="green" />,
    //     iconTheme: {
    //       primary: "#555700",
    //     },
    //     style: {
    //       background: "white",
    //       color: "green",
    //     },
    //   });
    //   dispatch(resetChatState());
    // }
    if (passwordUpdated) {
      toast("Password Updated", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="green" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetPasswordState());
    }
    if (profileUpdated) {
      toast("Profile Updated", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="green" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetProfileState());
    }
    if (unliked) {
      toast("Post Unliked", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="red" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "red",
        },
      });
      dispatch(resetState());
    }
  }, [
    followed,
    unfollowed,
    liked,
    unliked,
    deleted,
    commentDeleted,
    passwordUpdated,
    profileUpdated,
    postUpdated,
    userErrors,
    postErrors,
    chatErrors,
    profileDeleted,
  ]);
  useEffect(() => {
    if (commented) {
      toast("Comment Posted", {
        duration: 4000,
        position: "top-center",
        icon: <BsFillCheckCircleFill color="green" />,
        iconTheme: {
          primary: "#555700",
        },
        style: {
          background: "white",
          color: "green",
        },
      });
      dispatch(resetState());
    }
  }, [commented, dispatch]);

  const handleLogoutSubmit = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar handleLogoutSubmit={handleLogoutSubmit} />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Unauthenticated />
          }
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        {isAuthenticated && <Route path="/menu" element={<Menu />} />}
        {isAuthenticated && (
          <Route path="/password/change" element={<ChangePassword />} />
        )}
        {isAuthenticated && <Route path="/friends" element={<Friends />} />}
        {isAuthenticated && (
          <Route path="/account" element={<AdminProfile />} />
        )}
        {isAuthenticated && (
          <Route path="/update/profile" element={<UpdateProfile />} />
        )}
        {isAuthenticated && <Route path="/messages" element={<Messanger />} />}
        {isAuthenticated && (
          <Route path="/details/:id" element={<UserDetails />} />
        )}
        {isAuthenticated && (
          <Route path="/post/edit/:id" element={<EditPost />} />
        )}
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/user/password/reset/:token" element={<ResetPassword />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
