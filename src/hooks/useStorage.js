import { storage, fireStore } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";


const useStorage = async (data) => {
  try {
    const imageRef = ref(storage, `images/${data.image.name}`);

    await uploadBytes(imageRef, data.image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    await getDownloadURL(imageRef).then((url) => {
      const imageUrl = url;
      // delete the image from the data and replace it with the URL
      delete data.image;
      // Add a new document with a generated id.
      const docRef = addDoc(collection(fireStore, "auctions"), {
        ...data,
        imageUrl,
      });
      console.log("Auction written with ID: ", docRef.id);
    });
  } catch (error) {
    console.log(error);
  }
};

export default useStorage;
