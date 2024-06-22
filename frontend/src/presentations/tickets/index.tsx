"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Container, Divider, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import { CustomAppBar } from "@/components/appbar";
import { DefaultButton } from "@/components/button";
import { CreateTicketModal } from "./components/create-ticket-modal";
import { TicketListItem } from "@/components/ticket-list-item";
import { ITicket, TTicketStatus, ticketStatus } from "@/core/interfaces/ticket";
import { useAppDispatch } from "@/hooks/store";
import { SupportTicketsFeature } from "@/features/tickets";
import { Pagination } from "@/components/pagination";

export const TicketsPage: React.FC<{}> = (props) => {
  const initialised = useRef(false);
  const router = useRouter();
  const searchQueryParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<TTicketsTabs>("all tickets");
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<{
    pagination: { totalPages: number; pageNo: number; pageSize: number };
    tickets: ITicket[];
  }>({ pagination: { totalPages: 1, pageNo: 1, pageSize: 10 }, tickets: [] });

  useEffect(() => {
    const status = searchQueryParams.get("status");
    if (status) {
      setCurrentTab(status as TTicketStatus);
    } else {
      setCurrentTab("all tickets");
    }
    initialised.current = false;
  }, [searchQueryParams]);

  useEffect(() => {
    const fetchTickets = async () => {
      initialised.current = true;
      setLoading(true);
      const status = searchQueryParams.get("status");
      const pageNo = searchQueryParams.get("pageNo");
      const result = await SupportTicketsFeature.fetchDashboardTickets(pageNo ?? "1", status)(dispatch);

      const { pagination, tickets } = result as {
        pagination: { totalPages: number; pageNo: number; pageSize: number };
        tickets: ITicket[];
      };

      setTickets({ pagination, tickets });
      setLoading(false);
    };

    if (initialised.current !== true) {
      fetchTickets();
    }
  }, [searchQueryParams, dispatch]);

  const handleToggleOpenCreateTicketModal = () => {
    setIsCreateTicketModalOpen((prev) => !prev);
  };

  const handleOnClickTicketListItem = (ticketId: string) => {
    router.push(`/tickets/:${ticketId}`);
  };

  const handleOnTabChange = (_: unknown, value: TTicketsTabs) => {
    const searchParams = new URLSearchParams();
    searchParams.append("status", value);
    router.push(`/tickets?${searchParams.toString()}`);
  };

  const handleOnPageNoChange = (pageNo: number) => {
    const status = searchQueryParams.get("status");
    const searchParams = new URLSearchParams();
    if (status) searchParams.append("status", status);
    searchParams.append("pageNo", pageNo.toString());
    router.push(`/tickets?${searchParams.toString()}`);
  };

  return (
    <Fragment>
      <CreateTicketModal isOpen={isCreateTicketModalOpen} onClose={handleToggleOpenCreateTicketModal} />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        <CustomAppBar
          pageTitle="Support Tickets"
          actions={
            <DefaultButton variant="contained" onClick={handleToggleOpenCreateTicketModal} title="Create Ticket" />
          }
        />
        <Container
          sx={{
            flex: 1,
            padding: { xs: "0rem 2rem 1rem 2rem" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <DefaultTextInput sx={{ maxWidth: "18rem" }} placeholder="Search for ticket" />

            <Box>
              <CustomSelect title="Priority" options={["High", "Medium", "Low"]} value={"Low"} onChange={() => {}} />
            </Box>
          </Box> */}

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <TicketsTabsControl currentTab={currentTab} handleOnTabChange={handleOnTabChange} />
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {loading && <ShimmerLoader />}
              {!loading && (
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {tickets.tickets.map((ticket) => {
                    return (
                      <TicketListItem
                        key={ticket._id}
                        onClick={() => handleOnClickTicketListItem(ticket._id)}
                        ticket={ticket}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>
            <Pagination
              pagination={tickets.pagination}
              nextPageCallBack={handleOnPageNoChange}
              prevPageCallBack={handleOnPageNoChange}
            />
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

const TicketsTabsControl: React.FC<{
  currentTab: string;
  handleOnTabChange: (_: unknown, value: TTicketsTabs) => void;
}> = ({ currentTab, handleOnTabChange }) => {
  const tabsOptions = ["all tickets", ...Object.values(ticketStatus)];

  return (
    <Box sx={{ margin: "0rem 0rem 1rem 0rem", display: "flex", flexDirection: "column" }}>
      <Tabs value={currentTab} onChange={handleOnTabChange}>
        {tabsOptions.map((option) => {
          return (
            <Tab key={option} label={option} value={option} sx={{ minWidth: "8rem", textTransform: "capitalize" }} />
          );
        })}
      </Tabs>
      <Divider sx={{ marginTop: "-1.5px" }} />
    </Box>
  );
};

type TTicketsTabs = "all tickets" | TTicketStatus;

const ShimmerLoader = () => {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
      {Array.from(new Array(5)).map((_, index) => (
        <ShimmerBox key={index} sx={{ flex: 1, minHeight: "9rem", borderRadius: "0.4rem" }} />
      ))}
    </Box>
  );
};

const ShimmerBox = styled(Box)({
  animation: "shimmer 1.5s infinite",
  background: "linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%)",
  backgroundSize: "1000px 100%",
  "@keyframes shimmer": {
    "0%": {
      backgroundPosition: "-1000px 0",
    },
    "100%": {
      backgroundPosition: "1000px 0",
    },
  },
});
