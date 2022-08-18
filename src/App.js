import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { ThemeProvider } from "@mui/material";
import { useMainContext } from "./context/main_context";
import AuctionBody from "./components/AuctionBody/AuctionBody";
export const App = () => {
  const { theme } = useMainContext();
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        <AuctionBody />
      </ThemeProvider>
    </>
  );
};
