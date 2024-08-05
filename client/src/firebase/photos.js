import { doc, getDoc } from "firebase/firestore";
import { storage } from "./firebase";
import { getDownloadURL, ref } from "firebase/storage";

export const getImageDownloadUrl = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error getting download URL:", error);
    return null;
  }
};
