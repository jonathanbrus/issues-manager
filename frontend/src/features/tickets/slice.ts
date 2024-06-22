import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const slice = createSlice({
  name: "tickets",

  initialState: { ...initialState },

  reducers: {},
});

export const { reducer, actions } = slice;
