import { Avatar, Box, Chip, Divider, Typography } from "@mui/material";
import { ITicket } from "@/core/interfaces/ticket";

export const TicketListItem: React.FC<{ ticket: ITicket; onClick: () => void }> = ({ ticket, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        padding: "0.8rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        border: "1px solid #E7E7E7",
        borderRadius: "0.4rem",
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Avatar />
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography>Jonathan Brus</Typography>
            <Typography variant="caption" sx={{ color: "#84818A" }}>
              Reference No: {ticket.userId || ticket._id}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: "#2E2C34" }}>
          Id: {ticket._id}
        </Typography>
      </Box>
      <Divider sx={{ margin: "0.6rem 0rem" }} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ color: "#2E2C34" }}>{ticket.title}</Typography>
        <Typography sx={{ color: "#84818A" }}>{ticket.description}</Typography>
      </Box>
      <Box sx={{ marginTop: "0.6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <Chip
            label={ticket.category}
            size="small"
            sx={{ padding: "0.3rem", textTransform: "capitalize", borderRadius: "0.4rem" }}
          />
          <Chip
            label={ticket.priority}
            size="small"
            sx={{ padding: "0.3rem", textTransform: "capitalize", borderRadius: "0.4rem" }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: "#84818A" }}>
          {ticket.createdAt}
        </Typography>
      </Box>
    </Box>
  );
};
