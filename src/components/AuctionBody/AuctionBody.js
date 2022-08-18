import React, { useState } from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import classes from "./AuctionBody.module.css";
import { Grid } from "@mui/material";
import AddAuction from "../AddAuction/AddAuction";
import { useMainContext } from "../../context/main_context";

const AuctionBody = () => {
  const { currentUser } = useMainContext();
  const [auction, setAuction] = useState({});

  return (
    <div className={classes.container}>
      {currentUser && <AddAuction setAuction={setAuction} auction={auction} />}
      <Grid container spacing={3}>
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
      </Grid>
    </div>
  );
};

export default AuctionBody;
