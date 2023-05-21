import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/user";

// Register New User
export const registerUser = createAsyncThunk(
  "data/registerUser",
  async (myForm) => {
    try {
      const response = await axios.post(`${url}/register`, myForm, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Register failed");
    }
  }
);

// Update User Profile

export const updateProfile = createAsyncThunk(
  "data/updateProfile",
  async (myForm) => {
    try {
      const response = await axios.put(`${url}/update/profile`, myForm, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Profile Update failed");
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "data/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${url}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
);

// Load User

export const loadUser = createAsyncThunk("data/loadUser", async () => {
  try {
    const response = await axios.get(`${url}/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Load User failed");
  }
});

// Logout User
export const logout = createAsyncThunk("data/logout", async () => {
  try {
    const response = await axios.get(`${url}/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
});

// Follow User
export const follow = createAsyncThunk("data/follow", async (id) => {
  try {
    const response = await axios.put(
      `${url}/follow/${id}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Follow failed");
  }
});

// Unfollow User
export const unfollow = createAsyncThunk("data/unfollow", async (id) => {
  try {
    const response = await axios.put(
      `${url}/unfollow/${id}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unfollow failed");
  }
});

// Forgot password
export const forgotPassword = createAsyncThunk(
  "data/forgotPassword",
  async (forgotEmail) => {
    try {
      const response = await axios.post(`${url}/password/forgot`, {
        forgotEmail,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "An Error occurred");
    }
  }
);

// Reset Password

export const resetPassword = createAsyncThunk(
  "data/resetPassword",
  async ({ token, password, confirmPassword }) => {
    try {
      const response = await axios.put(`${url}/password/reset/${token}`, {
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Reset Passsword Failed"
      );
    }
  }
);

// Getting Single User

export const SingleUser = createAsyncThunk("data/singleUser", async (id) => {
  try {
    const response = await axios.get(`${url}/details/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error Occured");
  }
});

// Add Friends

export const addFriends = createAsyncThunk("data/addFriends", async () => {
  try {
    const response = await axios.get(`${url}/addFriends`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error Occured");
  }
});

// Following of Logged In User

export const followingUsers = createAsyncThunk(
  "data/followingUsers",
  async () => {
    try {
      const response = await axios.get(`${url}/following`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);

// Followers of Logged In User
export const FOLLOWERS = createAsyncThunk("data/FOLLOWERS", async () => {
  try {
    const response = await axios.get(`${url}/followers`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error Occured");
  }
});

// Update password

export const updatePassword = createAsyncThunk(
  "data/updatePassword",
  async ({ oldPassword, newPassword, confirmPassword }) => {
    try {
      const response = await axios.put(
        `${url}/password/update`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);

// Delete Profile

export const deleteProfile = createAsyncThunk(
  "data/deleteProfile",
  async () => {
    try {
      const response = await axios.delete(`${url}/deleteProfile`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error Occured");
    }
  }
);
