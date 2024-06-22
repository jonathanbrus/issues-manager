import { createTicket } from "./controllers/create-ticket";
import { fetchUserTickets } from "./controllers/fetch-user-tickets";
import { fetchDashboardTickets } from "./controllers/fetch-dashboard-tickets";
import { fetchTicketDetails } from "./controllers/fetch-ticket-details";
import { assignAgentToTicket } from "./controllers/assign-agent-to-ticket";
import { processTicket } from "./controllers/process-ticket";
import { closeTicket } from "./controllers/close-ticket";

export class SupportTicketsFeature {
  static readonly createTicket = createTicket;

  static readonly fetchUserTickets = fetchUserTickets;

  static readonly fetchDashboardTickets = fetchDashboardTickets;

  static readonly fetchTicketDetails = fetchTicketDetails;

  static readonly assignAgentToTicket = assignAgentToTicket;

  static readonly processTicket = processTicket;

  static readonly closeTicket = closeTicket;
}
