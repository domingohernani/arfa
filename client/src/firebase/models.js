import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

export const get3DModelUrl = async (modelPath) => {
  const storage = getStorage();
  try {
    // Create a reference to the 3D model in Firebase Storage
    const modelRef = ref(storage, modelPath);

    // Get the download URL
    const url = await getDownloadURL(modelRef);
    return url;
  } catch (error) {
    console.error("Error getting 3D model URL:", error);
    return null;
  }
};

export const upload3DModel = async (file, modelPath) => {
  const storage = getStorage();
  try {
    const modelRef = ref(storage, modelPath);
    const result = await uploadBytes(modelRef, file);
    return result;
  } catch (error) {
    console.error("Error uploading 3D model:", error);
    return false;
  }
};

export const delete3DModel = async (modelPath) => {
  const storage = getStorage();
  try {
    const modelRef = ref(storage, modelPath);
    await deleteObject(modelRef);
    return true;
  } catch (error) {
    console.error("Error deleting 3D model:", error);
    return false;
  }
};
