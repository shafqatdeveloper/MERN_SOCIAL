import { createSlice } from "@reduxjs/toolkit";
import {
  chatUsers,
  checkUnreadMessage,
  getChat,
  readMessage,
  sendMessage,
} from "../Actions/chatAction.jsx";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    chatErrors: null,
    users: [],
    chat: [],
    sent: false,
    read: false,
    unread: [],
  },
  reducers: {
    resetChatState: (state) => {
      state.sent = false;
      state.chatErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chatUsers.pending, (state) => {
      (state.loading = true), (state.chatErrors = null);
    });
    builder.addCase(chatUsers.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload.allUsers,
      };
    });
    builder.addCase(chatUsers.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        chatErrors: action.error.message,
      };
    });
    builder.addCase(getChat.pending, (state) => {
      (state.loading = true), (state.chatErrors = null);
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        chat: action.payload.chat,
      };
    });
    builder.addCase(getChat.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(sendMessage.pending, (state) => {
      (state.loading = true), (state.chatErrors = null);
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        sent: action.payload.success,
      };
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        chatErrors: action.error.message,
      };
    });
    builder.addCase(readMessage.pending, (state) => {
      (state.loading = true), (state.chatErrors = null);
    });
    builder.addCase(readMessage.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        read: action.payload.success,
      };
    });
    builder.addCase(readMessage.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(checkUnreadMessage.pending, (state) => {
      (state.loading = true), (state.chatErrors = null);
    });
    builder.addCase(checkUnreadMessage.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        unread: action.payload.unread,
      };
    });
    builder.addCase(checkUnreadMessage.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export const { resetChatState } = chatSlice.actions;
