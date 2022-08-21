import React, { useEffect, useState } from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import classes from "./AuctionBody.module.css";
import { Grid } from "@mui/material";
import AddAuction from "../AddAuction/AddAuction";
import { useMainContext } from "../../context/main_context";
import useFirestore from "../../hooks/useFirestore";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../../config/firebase";
import { onSnapshot } from "firebase/firestore";
const AuctionBody = () => {
  const { currentUser, docs, setDocs } = useMainContext();
  const [auction, setAuction] = useState({});
  // useFirestore("auctions", setDocs);

  useEffect(async () => {
    const subscribe = onSnapshot(
      collection(fireStore, "auctions"),
      (snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      },
      (error) => {
        // ...
        console.log(error);
      }
    );
    return () => subscribe();
  }, []);

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
