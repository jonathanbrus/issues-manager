import { axiosInstance } from "@/core/sources/network";
import { showError } from "@/features/app-messages";
import { AppDispatch } from "@/store";

export const fetchAllAgents = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosInstance.get("/agents");

      const { result } = data as { result: object };

      return result;
    } catch (error) {
      showError((error as Error).message)(dispatch);
    }
  };
};
