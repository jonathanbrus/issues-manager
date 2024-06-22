import { AppDispatch, getAppRootState } from "../../store";
import { AppMessage } from "./utils/message";
import { actions } from "./slice";

export const showError = (message: string) => (dispatch: AppDispatch) => {
  const messages = getAppRootState().appMessages;

  if (!messages.find((el) => el.message === message)) {
    return dispatch(actions.set({ message: new AppMessage({ type: "error", message }).get() }));
  }
};

export const showSuccess = (message: string) => (dispatch: AppDispatch) => {
  return dispatch(actions.set({ message: new AppMessage({ type: "success", message }).get() }));
};
