import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

export const appStore = configureStore({ reducer: rootReducer });

export const getAppRootState = (): AppRootState => {
  return appStore.getState();
};

export type AppRootStore = typeof appStore;

export type AppRootState = ReturnType<AppRootStore["getState"]>;

export type AppDispatch = AppRootStore["dispatch"];
