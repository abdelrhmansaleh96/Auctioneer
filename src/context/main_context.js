import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/main_reducer";
import { createTheme } from "@mui/material";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import { auth, fireStore } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const MainContext = React.createContext();
const theme = createTheme({
  palette: {
    primary: {
      main: "#CD83B8",
    },
    secondary: {
      main: "#D0D7DE",
    },
  },
});

const login = async (auth, user, password) => {
  try {
    await signInWithEmailAndPassword(auth, user, password);
  } catch (error) {
    console.log(error);
  }
};
const logout = async (e) => {
  try {
    signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
const register = async (auth, user, password) => {
  try {
    await createUserWithEmailAndPassword(auth, user, password);
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  theme: theme,
};

export const MainProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return subscribe;
  }, []);
  const endAuction = async (auctionId) => {
    await deleteDoc(doc(fireStore, "auctions", auctionId));
  };
  const bidAuction = async (auctionId, startingPrice) => {
    const auctionRef = await doc(fireStore, "auctions", auctionId);
    await updateDoc(auctionRef, {
      startingPrice: Number(startingPrice) + 100,
      currWinner: currentUser.email,
    });
  };
  return (
    <MainContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        currentUser,
        auth,
        endAuction,
        bidAuction,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
// make sure use
export const useMainContext = () => {
  return useContext(MainContext);
};
