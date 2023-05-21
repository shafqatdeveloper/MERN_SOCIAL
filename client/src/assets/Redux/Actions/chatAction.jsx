import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/chat";

// Get ChatAble Users

export const chatUsers = createAsyncThunk("data/chatUsers", async () => {
  try {
    const response = await axios.get(`${url}/chatableUsers`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Error Occured");
  }
});

// Get Chat Of A Single User

export const getChat = createAsyncThunk("data/getChat", async ({ id }) => {
  try {
    const response = await axios.get(`${url}/getChat/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Error Occured");
  }
});

export const sendMessage = createAsyncThunk(
  "data/sendMessage",
  async ({ id, message }) => {
    try {
      const response = await axios.post(
        `${url}/create/${id}`,
        { message },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data.message || "Error Occured");
    }
  }
);

export const readMessage = createAsyncThunk(
  "data/readMessage",
  async ({ id }) => {
    try {
      const response = await axios.put(
        `${url}/read/${id}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data.message || "Error Occured");
    }
  }
);

export const checkUnreadMessage = createAsyncThunk(
  "data/checkUnreadMessage",
  async () => {
    try {
      const response = await axios.get(`${url}/unread`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data.message || "Error Occured");
    }
  }
);
