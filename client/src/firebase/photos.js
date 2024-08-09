import { doc, getDoc } from "firebase/firestore";
import { storage } from "./firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

// ex; images/adf4j442342j42h/image.jpg
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

// ex; images/adf4j442342j42h
export const getAllImageDownloadUrl = async (path) => {
  try {
    const imageRef = ref(storage, path);
    const result = await listAll(imageRef);

    const urls = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return url;
      })
    );
    return urls;
  } catch (error) {
    console.error("Error getting download URL:", error);
    return null;
  }
};
