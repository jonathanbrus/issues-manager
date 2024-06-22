import { createSlice } from "@reduxjs/toolkit";

interface AppMessage {
  timestamp: number;
  type: string;
  message: string;
}

const initialState: AppMessage[] = [];

export const slice = createSlice({
  name: "appMessages",

  initialState: [...initialState],

  reducers: {
    set: (state, { payload }) => {
      state.push(payload.message);
    },

    remove: (state, { payload }) => {
      return state.filter((message) => message.message !== payload.message);
    },
  },
});

export const { reducer, actions } = slice;
