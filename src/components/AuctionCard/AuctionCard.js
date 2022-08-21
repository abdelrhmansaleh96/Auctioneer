import * as React from "react";
import classes from "./AuctionCard.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Countdown from "react-countdown";
import { useMainContext } from "../../context/main_context";
import { Divider } from "@mui/material";

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    // Render a completed state
    return null;
  } else {
    // Render a countdown
    return (
      <>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            
          <Card sx={{ borderRadius: "33px", boxShadow: "", maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="170"
              sx={{ height: "140", minWidth: "250px" }}
              image={props.item.imageUrl}
              alt="green iguana"
            />
            <CardContent
              sx={{
                height: "140px",
                width: "300px",
              }}
            >
              <Typography gutterBottom variant="h3" component="div">
                {props.item.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {props.item.description}
              </Typography>
              <Typography variant="h6">
                {days} days: {hours} hr: {minutes} min: {seconds} sec
              </Typography>
            </CardContent>
            <Divider />
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-around",
                height: "100px",
              }}
            >
              {!props.owner ? (
                <Button
                  size="large"
                  onClick={() => {
                    props.setOpen(true);
                  }}
                >
                  Bid
                </Button>
              ) : props.owner.email === props.item.email ? (
                <Button
                  size="large"
                  onClick={() => {
                    props.endAuction(props.item.id);
                  }}
                >
                  Cancel Auction
                </Button>
              ) : props.owner.email === props.item.currWinner ? (
                <Typography variant="h3">Winner</Typography>
              ) : (
                <Button
                  size="large"
                  onClick={() => {
                    props.bidAuction(props.item.id, props.item.startingPrice);
                  }}
                >
                  Bid
                </Button>
              )}
              <Typography variant="body1" color="text.secondary">
                ${props.item.startingPrice}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </>
    );
  }
};

const AuctionCard = ({ doc }) => {
  const { currentUser, endAuction, bidAuction, setOpen } = useMainContext();
  let expireDate = doc.duration;
  return (
    <Countdown
      item={doc}
      date={expireDate}
      renderer={renderer}
      owner={currentUser}
      endAuction={endAuction}
      bidAuction={bidAuction}
      setOpen={setOpen}
    />
  );
};

export default AuctionCard;
