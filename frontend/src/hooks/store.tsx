import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppRootState, AppDispatch, MakeAppRootStore } from "../store/index";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export const useAppStore: () => MakeAppRootStore = useStore;
