import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy3A5jKHJEPHAagFHT-d2Sa-uFn78dDoY",
  authDomain: "auctioneer-27dcc.firebaseapp.com",
  projectId: "auctioneer-27dcc",
  storageBucket: "auctioneer-27dcc.appspot.com",
  messagingSenderId: "532692409643",
  appId: "1:532692409643:web:d5c31f3caa9ebc8b0c796e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fireStore = getFirestore(app);
