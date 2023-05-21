import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getLoggedInUserPosts,
  getSinglePost,
  likePost,
  singleUserPosts,
  unLikePost,
  updatePost,
} from "../Actions/postAction.jsx";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    laoding: false,
    postErrors: null,
    posted: false,
    posts: [],
    liked: false,
    unliked: false,
    commented: false,
    userPosts: [],
    singleUserPost: [],
    deleted: false,
    commentDeleted: false,
    post: {},
    postUpdated: false,
    likeLoading: false,
    unlikeLoading: false,
  },
  reducers: {
    resetState: (state) => {
      state.posted = false;
      state.liked = false;
      state.unliked = false;
      state.commented = false;
      state.deleted = false;
    },

    resetDeleteComment: (state) => {
      state.commentDeleted = false;
    },
    resetPostUpdated: (state) => {
      state.postUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      (state.laoding = true), (state.postErrors = null);
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      return {
        ...state,
        laoding: false,
        posted: action.payload.success,
        postErrors: null,
      };
    });
    builder.addCase(createPost.rejected, (state, action) => {
      return {
        ...state,
        laoding: false,
        postErrors: action.error.message,
      };
    });
    builder.addCase(updatePost.pending, (state) => {
      (state.laoding = true), (state.postErrors = null);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      return {
        ...state,
        laoding: false,
        postUpdated: action.payload.success,
      };
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      return {
        ...state,
        laoding: false,
        postErrors: action.error.message,
      };
    });
    builder.addCase(getAllPosts.pending, (state) => {
      (state.laoding = true), (state.postErrors = null);
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      return {
        ...state,
        laoding: false,
        posts: action.payload.posts,
      };
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      return {
        ...state,
        laoding: false,
      };
    });
    builder.addCase(getLoggedInUserPosts.pending, (state) => {
      (state.laoding = true), (state.postErrors = null);
    });
    builder.addCase(getLoggedInUserPosts.fulfilled, (state, action) => {
      return {
        ...state,
        laoding: false,
        userPosts: action.payload.posts,
      };
    });
    builder.addCase(getLoggedInUserPosts.rejected, (state, action) => {
      return {
        ...state,
        laoding: false,
      };
    });
    builder.addCase(singleUserPosts.pending, (state) => {
      (state.laoding = true), (state.postErrors = null);
    });
    builder.addCase(singleUserPosts.fulfilled, (state, action) => {
      return {
        ...state,
        laoding: false,
        singleUserPost: action.payload.posts,
      };
    });
    builder.addCase(singleUserPosts.rejected, (state, action) => {
      return {
        ...state,
        laoding: false,
      };
    });
    builder.addCase(getSinglePost.pending, (state) => {
      (state.laoding = true), (state.postErrors = null);
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      return {
        ...state,
        laoding: false,
        post: action.payload.post,
      };
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      return {
        ...state,
        laoding: false,
      };
    });
    builder.addCase(likePost.pending, (state) => {
      (state.likeLoading = true), (state.postErrors = null);
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      return {
        ...state,
        liked: action.payload.success,
        likeLoading: false,
      };
    });
    builder.addCase(likePost.rejected, (state, action) => {
      return {
        ...state,
        postErrors: action.error.message,
        laoding: false,
      };
    });
    builder.addCase(unLikePost.pending, (state) => {
      (state.unlikeLoading = true), (state.postErrors = null);
    });
    builder.addCase(unLikePost.fulfilled, (state, action) => {
      return {
        ...state,
        unliked: action.payload.success,
        unlikeLoading: false,
      };
    });
    builder.addCase(unLikePost.rejected, (state, action) => {
      return {
        ...state,
        postErrors: action.error.message,
        laoding: false,
      };
    });
    builder.addCase(createComment.pending, (state) => {
      (state.laoding = true), (state.postErrors = null);
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      return {
        ...state,
        commented: action.payload.success,
        laoding: false,
      };
    });
    builder.addCase(createComment.rejected, (state, action) => {
      return {
        ...state,
        postErrors: action.error.message,
        laoding: false,
      };
    });
    builder.addCase(deletePost.pending, (state) => {
      (state.laoding = true), (state.postErrors = null);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      return {
        ...state,
        deleted: action.payload.success,
        laoding: false,
      };
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      return {
        ...state,
        postErrors: action.error.message,
        laoding: false,
      };
    });
    builder.addCase(deleteComment.pending, (state) => {
      (state.laoding = true), (state.postErrors = null);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      return {
        ...state,
        commentDeleted: action.payload.success,
        laoding: false,
      };
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      return {
        ...state,
        postErrors: action.error.message,
        laoding: false,
      };
    });
  },
});

export const { resetState, resetDeleteComment, resetPostUpdated } =
  postSlice.actions;
