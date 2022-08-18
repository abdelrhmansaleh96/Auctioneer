import React from "react";
import classes from "./NavBar.module.css";
import logoImg from "../../assets/logo.png";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useMainContext } from "../../context/main_context";

const NavBar = () => {
  const { currentUser } = useMainContext();
  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <img src={logoImg} alt="auctioneer" />
      </div>
      <div className={classes.links}>
        <div className={classes.item}>
          {currentUser && (
            <div className={classes.info}>{currentUser.email}</div>
          )}
          {!currentUser && <Register />}
        </div>
        <div className={classes.item}>
          {" "}
          <Login />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
