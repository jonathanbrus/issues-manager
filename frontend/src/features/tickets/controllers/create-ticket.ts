import { ITicket } from "@/core/interfaces/ticket";
import { axiosInstance } from "@/core/sources/network";
import { showError } from "@/features/app-messages";
import { AppDispatch } from "@/store";

export const createTicket = (ticketInfo: Partial<ITicket>) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosInstance.post("/users/support-tickets", { ticketInfo });

      const { result } = data as { result: object };

      return result;
    } catch (error) {
      showError((error as Error).message)(dispatch);
    }
  };
};
