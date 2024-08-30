import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const uploadFile = async (file, storagePath, customFileName) => {
  try {
    const fileExtension = file.name.split(".").pop();

    const fullPath = `${storagePath}/${customFileName}.${fileExtension}`;

    const storageRef = ref(storage, fullPath);
    const uploadTask = await uploadBytesResumable(storageRef, file);

    const downloadURL = await getDownloadURL(uploadTask.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
