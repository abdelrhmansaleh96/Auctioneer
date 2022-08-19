import React, { useState } from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import classes from "./AuctionBody.module.css";
import { Grid } from "@mui/material";
import AddAuction from "../AddAuction/AddAuction";
import { useMainContext } from "../../context/main_context";
import useFirestore from "../../hooks/useFirestore";

const AuctionBody = () => {
  const { currentUser } = useMainContext();
  const [auction, setAuction] = useState({});

  const { docs } = useFirestore();

  return (
    <div className={classes.container}>
      {currentUser && <AddAuction setAuction={setAuction} auction={auction} />}
      <Grid container spacing={3}>
        {docs.map((doc) => {
          return <AuctionCard doc={doc} key={doc.id} />;
        })}
      </Grid>
    </div>
  );
};

export default AuctionBody;
