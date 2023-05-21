import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/post";
export const createPost = createAsyncThunk(
  "data/createPost",
  async (formData) => {
    try {
      const response = await axios.post(`${url}/create`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);

export const getAllPosts = createAsyncThunk("data/getAllPosts", async () => {
  try {
    const response = await axios.get(`${url}/all`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error Occured");
  }
});

export const likePost = createAsyncThunk("data/likePost", async (id) => {
  try {
    const response = await axios.put(
      `${url}/like/${id}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error Occured");
  }
});

export const unLikePost = createAsyncThunk("data/unlikePost", async (id) => {
  try {
    const response = await axios.put(
      `${url}/unlike/${id}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error Occured");
  }
});

export const createComment = createAsyncThunk(
  "data/createComment",
  async ({ message, postId }) => {
    try {
      const response = await axios.put(
        `${url}/comment`,
        { postId, message },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);

export const getLoggedInUserPosts = createAsyncThunk(
  "data/getLoggedInUserPosts",
  async () => {
    try {
      const response = await axios.get(`${url}/me`, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);

export const singleUserPosts = createAsyncThunk(
  "data/singleUserPosts",
  async (id) => {
    try {
      const response = await axios.get(`${url}/user/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);

export const deletePost = createAsyncThunk(
  "data/deletePost",
  async ({ id }) => {
    try {
      console.log(id);
      const response = await axios.delete(`${url}/delete/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "data/deleteComment",
  async ({ id, commentId }) => {
    try {
      const response = await axios.put(
        `${url}/comment/${id}`,
        { commentId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "data/getSinglePost",
  async ({ id }) => {
    try {
      const response = await axios.get(`${url}/single/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);

export const updatePost = createAsyncThunk(
  "data/updatePost",
  async ({ id, title, desc }) => {
    try {
      const response = await axios.put(
        `${url}/post/update/${id}`,
        { title, desc },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);
