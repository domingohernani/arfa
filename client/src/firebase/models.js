import { ref, getDownloadURL, getStorage } from "firebase/storage";

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
