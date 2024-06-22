import { axiosInstance } from "@/core/sources/network";
import { showError } from "@/features/app-messages";
import { AppDispatch } from "@/store";

export const assignAgentToTicket = (ticketId: string, agentId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosInstance.patch("/admins/support-tickets", { ticketId, agentId });

      const { result } = data as { result: object };

      return result;
    } catch (error) {
      showError((error as Error).message)(dispatch);
    }
  };
};
