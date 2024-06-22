"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { appStore, AppRootStore } from "./index";

interface AppStoreProviderProps {
  children: React.ReactNode;
}

export const AppStoreProvider: React.FC<AppStoreProviderProps> = (props) => {
  const storeRef = useRef<AppRootStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = appStore;
  }

  return <Provider store={storeRef.current}>{props.children}</Provider>;
};
