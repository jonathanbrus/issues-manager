"use client";

import { useRouter } from "next/navigation";
import { Box, Container } from "@mui/material";
import { DefaultButton } from "@/components/button";

export const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <DefaultButton
          title="users"
          onClick={() => router.push("/tickets")}
          sx={{ padding: "1.5rem 3rem", borderRadius: "0.5rem" }}
          fullWidth
        />
        <DefaultButton
          title="super admin"
          onClick={() => router.push("/tickets")}
          sx={{ padding: "1.5rem 3rem", borderRadius: "0.5rem" }}
          fullWidth
        />
      </Container>
    </Box>
  );
};
