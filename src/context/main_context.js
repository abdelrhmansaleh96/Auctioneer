import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/main_reducer";
import { createTheme } from "@mui/material";
import { auth } from "../config/firebase";
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
  return (
    <MainContext.Provider
      value={{ ...state, register, login, logout, currentUser, auth }}
    >
      {children}
    </MainContext.Provider>
  );
};
// make sure use
export const useMainContext = () => {
  return useContext(MainContext);
};
