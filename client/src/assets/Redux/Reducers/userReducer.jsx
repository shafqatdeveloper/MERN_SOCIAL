import { createSlice } from "@reduxjs/toolkit";
import {
  addFriends,
  deleteProfile,
  follow,
  FOLLOWERS,
  followingUsers,
  forgotPassword,
  loadUser,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  SingleUser,
  unfollow,
  updatePassword,
  updateProfile,
} from "../Actions/UserAction.jsx";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    userErrors: null,
    user: {},
    profilePic: "",
    loggedOut: false,
    followed: false,
    followSuccess: false,
    unfollowed: false,
    unfollowSuccess: false,
    sent: false,
    message: "",
    reset: false,
    resetMessage: "",
    update: false,
    singleUser: {},
    notFriends: [],
    following: [],
    followers: [],
    passwordUpdated: false,
    profileUpdated: false,
    profileDeleted: false,
    followLoading: false,
    unfollowLoading: false,
  },
  reducers: {
    resetState: (state) => {
      state.followed = false;
      state.userErrors = null;
      state.sent = false;
      state.reset = false;
    },
    resetPasswordState: (state) => {
      state.passwordUpdated = false;
    },
    resetProfileState: (state) => {
      state.profileUpdated = false;
    },
    resetFollow: (state) => {
      state.followed = false;
    },
    resetUnfollow: (state) => {
      state.unfollowed = false;
    },
    resetProfileDelete: (state) => {
      state.profileDeleted = false;
    },
  },
  extraReducers: (builder) => {
    // Register Request
    builder.addCase(registerUser.pending, (state) => {
      state.userErrors = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userErrors: null,
        user: action.payload.user,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Update Porfile Request
    builder.addCase(updateProfile.pending, (state) => {
      (state.loading = true), (state.userErrors = null);
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        profileUpdated: action.payload.success,
      };
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });

    // Delete profile Request
    builder.addCase(deleteProfile.pending, (state) => {
      (state.loading = true), (state.userErrors = null);
    });
    builder.addCase(deleteProfile.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        profileDeleted: action.payload.success,
      };
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Load User Request
    builder.addCase(loadUser.pending, (state) => {
      state.userErrors = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userErrors: null,
        user: { ...action.payload.user },
        profilePic: action.payload.profilePic,
      };
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    });
    // Getting Single User Request
    builder.addCase(SingleUser.pending, (state) => {
      state.userErrors = null;
    });
    builder.addCase(SingleUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: null,
        singleUser: action.payload.user,
      };
    });
    builder.addCase(SingleUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Login Request
    builder.addCase(loginUser.pending, (state) => {
      (state.loading = true), (state.userErrors = null);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userErrors: null,
        user: action.payload.user,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      (state.loading = false), (state.userErrors = action.error.message);
    });
    // Logout Request
    builder.addCase(logout.pending, (state) => {
      (state.loading = true), (state.userErrors = null);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      (state.loading = false), (state.loggedOut = action.payload.success);
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      (state.loading = false), (state.userErrors = action.error.message);
    });
    // Follow Request

    builder.addCase(follow.pending, (state) => {
      state.userErrors = null;
      state.followLoading = true;
    });
    builder.addCase(follow.fulfilled, (state, action) => {
      return {
        ...state,
        followLoading: false,
        followed: action.payload.success,
        followSuccess: action.payload.success,
        update: true,
      };
    });
    builder.addCase(follow.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Update Password Request

    builder.addCase(updatePassword.pending, (state) => {
      state.userErrors = null;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        passwordUpdated: action.payload.success,
      };
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Unfollow Request

    builder.addCase(unfollow.pending, (state) => {
      state.userErrors = null;
      state.unfollowLoading = true;
    });
    builder.addCase(unfollow.fulfilled, (state, action) => {
      return {
        ...state,
        unfollowLoading: false,
        unfollowed: action.payload.success,
        unfollowSuccess: action.payload.success,
        update: true,
      };
    });
    builder.addCase(unfollow.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Forgot Password Request

    builder.addCase(forgotPassword.pending, (state) => {
      (state.loading = true), (state.userErrors = null);
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        sent: action.payload.success,
        message: action.payload.message,
      };
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Reset Passowrd Request

    builder.addCase(resetPassword.pending, (state) => {
      (state.loading = true), (state.userErrors = null);
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        reset: action.payload.success,
        resetMessage: action.payload.message,
      };
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Add Friends Request

    builder.addCase(addFriends.pending, (state) => {
      state.userErrors = null;
    });
    builder.addCase(addFriends.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: null,
        notFriends: action.payload.notFriends,
      };
    });
    builder.addCase(addFriends.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Getting Following User Request

    builder.addCase(followingUsers.pending, (state) => {
      state.userErrors = null;
    });
    builder.addCase(followingUsers.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: null,
        following: action.payload.followingUsers,
      };
    });
    builder.addCase(followingUsers.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
    // Getting Followers of a User
    builder.addCase(FOLLOWERS.pending, (state) => {
      state.userErrors = null;
    });
    builder.addCase(FOLLOWERS.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: null,
        followers: action.payload.followers,
      };
    });
    builder.addCase(FOLLOWERS.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        userErrors: action.error.message,
      };
    });
  },
});

export const {
  resetState,
  resetFollow,
  resetUnfollow,
  resetPasswordState,
  resetProfileState,
  resetProfileDelete,
} = userSlice.actions;
