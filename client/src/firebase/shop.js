import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getShopInfo = async (shopId) => {
  try {
    const shopRef = doc(db, "shops", shopId);
    const shopDoc = await getDoc(shopRef);

    if (shopDoc.exists()) {
      return shopDoc.data();
    } else {
      console.error("No such shop document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching shop information:", error);
    return null;
  }
};

export const getDelivery = async (shopId) => {
  try {
    const deliveryCollectionRef = collection(db, "shops", shopId, "delivery");

    const deliverySnapshot = await getDocs(deliveryCollectionRef);

    const deliveryData = deliverySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return deliveryData;
  } catch (error) {
    console.error("Error fetching delivery subcollection:", error);
    throw new Error("Failed to fetch delivery data");
  }
};

export const updateDeliveryFee = async (
  shopId,
  location,
  price,
  doDeliver,
  isFreeDelivery
) => {
  try {
    const deliveryDocRef = doc(db, "shops", shopId, "delivery", location);
    const deliveryDocSnap = await getDoc(deliveryDocRef);

    if (deliveryDocSnap.exists()) {
      await setDoc(
        deliveryDocRef,
        {
          location,
          price,
          doDeliver,
          isFreeDelivery,
        },
        { merge: true }
      );
    } else {
      await setDoc(deliveryDocRef, {
        location,
        price,
        doDeliver,
        isFreeDelivery,
      });
    }

    return {
      isSuccess: true,
      message: "Delivery document updated or created successfully.",
    };
  } catch (error) {
    console.error("Error updating or creating delivery document: ", error);
    return {
      isSuccess: false,
      message: "Failed to update or create delivery document.",
    };
  }
};

export const updateAddress = async (shopId, newAddress) => {
  try {
    const shopRef = doc(db, "shops", shopId);

    await updateDoc(shopRef, {
      "address.region": newAddress.selectedRegionName,
      "address.province": newAddress.selectedProvinceName,
      "address.city": newAddress.selectedCityName,
      "address.barangay": newAddress.selectedBarangayName,
      "address.street": newAddress.streetNumber,
    });
    return true;
  } catch (error) {
    console.error("Error updating address:", error);
    return false; // Return true if the update is successful
  }
};

export const updateLogo = async (shopId, logoFile) => {
  try {
    const logoPath = `files/logo/${logoFile.name}`;
    const logoRef = ref(storage, logoPath);

    await uploadBytes(logoRef, logoFile);
    const shopRef = doc(db, "shops", shopId);
    await updateDoc(shopRef, {
      logo: logoPath,
    });

    return true; // Return true if successful
  } catch (error) {
    console.error("Error updating logo:", error);
    return false; // Return false if an error occurs
  }
};

export const updateBrandName = async (shopId, brandName) => {
  try {
    const shopRef = doc(db, "shops", shopId);

    await updateDoc(shopRef, {
      name: brandName,
    });

    return true;
  } catch (error) {
    console.error("Error updating brand name:", error);
    return false; // Return false if an error occurs
  }
};

export const updateBusinessPermit = async (shopId, businessPermitFile) => {
  try {
    const permitPath = `files/permit/${businessPermitFile.name}`;
    const permitRef = ref(storage, permitPath);

    await uploadBytes(permitRef, businessPermitFile);

    const permitURL = await getDownloadURL(permitRef);

    const shopRef = doc(db, "shops", shopId);
    await updateDoc(shopRef, {
      businessPermit: permitURL,
    });

    return permitURL;
  } catch (error) {
    console.error("Error updating business permit:", error);
    return null;
  }
};

export const updateValidID = async (shopId, validIDFile) => {
  try {
    const validIDPath = `files/validId/${validIDFile.name}`;
    const validIDRef = ref(storage, validIDPath);

    await uploadBytes(validIDRef, validIDFile);

    const validIDURL = await getDownloadURL(validIDRef);

    const shopRef = doc(db, "shops", shopId);
    await updateDoc(shopRef, {
      validId: validIDURL,
    });

    return validIDURL;
  } catch (error) {
    console.error("Error updating valid ID:", error);
    return null;
  }
};
