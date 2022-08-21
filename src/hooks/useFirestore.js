import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { fireStore } from "../config/firebase";

const useFirestore = () => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
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
  }, []);
  return { docs };
};

export default useFirestore;
