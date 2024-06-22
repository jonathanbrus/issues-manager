import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Fragment } from "react";

export const CustomAppBar: React.FC<{ pageTitle: string; actions?: React.ReactNode }> = ({ pageTitle, actions }) => {
  return (
    <Fragment>
      <AppBar elevation={0} sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ padding: { xs: "0px" } }}>
          <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h2" sx={{ color: "black" }}>
                {pageTitle}
              </Typography>
            </Box>

            {actions && <Box>{actions}</Box>}
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
};
