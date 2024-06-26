import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "@/theme";
import { AppStoreProvider } from "@/store/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppStoreProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={appTheme}>
            <body>{children}</body>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </AppStoreProvider>
    </html>
  );
}
