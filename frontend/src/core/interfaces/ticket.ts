export interface ITicket {
  _id: string;
  userId: string;
  title: string;
  description: string;
  category: TTicketCategories;
  priority: TTicketPriorities;
  status: TTicketStatus;
  attachments?: string[];
  assignment?: {
    assignedBy: string;
    assignedTo: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type TTicketCategories = keyof typeof ticketCategories;

export const ticketCategories = {
  "general inquiry": "general inquiry",
  "technical support": "technical support",
  order: "order",
  "security concern": "security concern",
  "feature request": "feature request",
  other: "other",
};

export type TTicketPriorities = keyof typeof ticketPriorities;

export const ticketPriorities = {
  low: "low",
  medium: "medium",
  high: "high",
};

export type TTicketStatus = keyof typeof ticketStatus;

export const ticketStatus = {
  open: "open",
  "in progress": "in progress",
  resolved: "resolved",
  closed: "closed",
};
