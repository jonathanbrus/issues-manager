import { ITicket } from "@/core/interfaces/ticket";
import { axiosInstance } from "@/core/sources/network";
import { showError } from "@/features/app-messages";
import { AppDispatch } from "@/store";

export const fetchDashboardTickets: FetchDashboardTicketsControllerFunc = (pageNo, status) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosInstance.get("/admins/support-tickets", {
        params: {
          pagination: { pageNo, pageSize: 5 },
          ...(!status && status !== "all tickets" && { status }),
        },
      });

      const { result } = data as {
        result: {
          pagination: {
            totalPages: string;
            pageNo: string;
            pageSize: string;
          };
          tickets: ITicket[];
        };
      };

      return {
        pagination: {
          totalPages: Number(result.pagination.totalPages),
          pageNo: Number(result.pagination.pageNo),
          pageSize: Number(result.pagination.pageSize),
        },
        tickets: result.tickets,
      };
    } catch (error) {
      showError((error as Error).message)(dispatch);
    }
  };
};

type FetchDashboardTicketsControllerFunc = (pageNo: string, status: string | null) => NestedReturnFunc;

type NestedReturnFunc = (dispatch: AppDispatch) => Promise<{
  pagination: {
    totalPages: number;
    pageNo: number;
    pageSize: number;
  };
  tickets: ITicket[];
} | void>;
