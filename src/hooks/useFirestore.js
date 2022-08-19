import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../config/firebase";

const useFirestore = () => {
  const [docs, setDocs] = useState([]);
  useEffect(async () => {
    let documents = [];
    const querySnapshot = await getDocs(collection(fireStore, "auctions"));
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      documents.push({ ...doc.data(), id: doc.id });
      console.log(documents);
    });
    setDocs(documents);
  }, [fireStore]);
  return { docs };
};

export default useFirestore;
