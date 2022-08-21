import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/main_reducer";
import { createTheme } from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore";
import { fireStore } from "../config/firebase";

import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import useFirestore from "../hooks/useFirestore";

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
  count: 0,
};

export const MainProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [docs, setDocs] = useState([]);
  const endAuction = async (auctionId) => {
    try {
      await deleteDoc(doc(fireStore, "auctions", auctionId));
      dispatch({ type: "END_AUCTION" });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return subscribe;
  }, []);

  return (
    <MainContext.Provider
      value={{
        ...state,
        docs,
        setDocs,
        register,
        login,
        logout,
        currentUser,
        auth,
        endAuction,
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
