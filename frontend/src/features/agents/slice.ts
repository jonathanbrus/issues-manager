import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const slice = createSlice({
  name: "agents",

  initialState: { ...initialState },

  reducers: {},
});

export const { reducer, actions } = slice;
