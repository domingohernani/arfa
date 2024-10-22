import { doc, getDoc } from "firebase/firestore";
import { storage } from "./firebase";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

// ex; images/adf4j442342j42h/image.jpg
export const getImageDownloadUrl = async (path) => {
  if (
    path.includes("images") ||
    path.includes("profiles") ||
    path.includes("files")
  ) {
    try {
      const storageRef = ref(storage, path);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error("Error getting download URL:", error);
      return null;
    }
  } else {
    return path;
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

export const updatePhoto = async (path, file, oldPhotoPath = null) => {
  try {
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const photoPath = `${path}/${uniqueFileName}`;
    const photoRef = ref(storage, photoPath);

    if (oldPhotoPath) {
      const oldPhotoRef = ref(storage, oldPhotoPath);
      await deleteObject(oldPhotoRef);
    }

    await uploadBytes(photoRef, file);

    const downloadUrl = await getDownloadURL(photoRef);

    return { path: photoPath, url: downloadUrl };
  } catch (error) {
    console.error("Error updating photo:", error);
    throw error;
  }
};

export const uploadPhoto = async (file, path) => {
  try {
    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error in uploadPhoto:", error);
    throw error; // Rethrow the error for handling elsewhere
  }
};

// Function to delete a photo using its storage path
export const deletePhoto = async (url) => {
  try {
    const decodedUrl = decodeURIComponent(url);
    const startIndex = decodedUrl.indexOf("/o/") + 3;
    const endIndex = decodedUrl.indexOf("?");
    const storagePath = decodedUrl.substring(startIndex, endIndex);

    // Delete the file using the storage path
    const fileRef = ref(storage, storagePath);
    await deleteObject(fileRef);

    console.log("File deleted successfully!");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
