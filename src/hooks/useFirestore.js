import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../config/firebase";
import { onSnapshot } from "firebase/firestore";

const useFirestore = (collect, setDocs) => {
  // const [docs, setDocs] = useState([]);
  useEffect(async () => {
    let documents = [];

    const subscribe = onSnapshot(
      collection(fireStore, collect),
      (snapshot) => {
        snapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        }),
          setDocs(documents);
        console.log("docs : ", documents);
      },
      (error) => {
        // ...
        console.log(error);
      }
    );

    // normal way to get the data just once
    // const querySnapshot = await getDocs(collection(fireStore, "auctions"));
    // querySnapshot.forEach((doc) => {
    //   //   console.log(doc.id, " => ", doc.data());
    //   documents.push({ ...doc.data(), id: doc.id });
    //   console.log(documents);
    // });
    // setDocs(documents);
    // return () => subscribe();
  }, []);
  // return { docs };
};

export default useFirestore;
