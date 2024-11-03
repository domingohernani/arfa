import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  startOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  endOfToday,
} from "date-fns";
import { v4 as uuidv4 } from "uuid";

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

export const fetchTopSellers = async (shopId, timeFilter) => {
  try {
    let start;
    const end = endOfToday();

    if (timeFilter === "weekly") {
      start = startOfWeek(new Date());
    } else if (timeFilter === "monthly") {
      start = startOfMonth(new Date());
    } else if (timeFilter === "quarterly") {
      start = startOfQuarter(new Date());
    } else if (timeFilter === "yearly") {
      start = startOfYear(new Date());
    } else if (timeFilter === "all") {
      start = null; // No start date filtering for "All Time"
    } else {
      throw new Error("Invalid time filter");
    }

    const ordersCollection = collection(db, "orders");
    const shopOrdersQuery = start
      ? query(
          ordersCollection,
          where("shopId", "==", shopId),
          where("createdAt", ">=", Timestamp.fromDate(start)),
          where("createdAt", "<=", Timestamp.fromDate(end)),
          where("orderStatus", "in", ["Delivered", "Picked-up"])
        )
      : query(
          ordersCollection,
          where("shopId", "==", shopId),
          where("orderStatus", "in", ["Delivered", "Picked-up"])
        );

    const ordersSnapshot = await getDocs(shopOrdersQuery);
    const productStats = {};

    ordersSnapshot.forEach((doc) => {
      const order = doc.data();

      order.orderItems.forEach((item) => {
        const { id, name, price, quantity, totalItemPrice } = item;
        if (productStats[id]) {
          productStats[id].unitsSold += quantity;
          productStats[id].revenue += totalItemPrice;
        } else {
          productStats[id] = {
            productId: id,
            name: name,
            unitsSold: quantity,
            revenue: totalItemPrice,
          };
        }
      });
    });

    const productArray = Object.values(productStats);
    productArray.sort(
      (a, b) => b.unitsSold - a.unitsSold || b.revenue - a.revenue
    );

    return productArray;
  } catch (error) {
    console.error("Error fetching top sellers:", error);
  }
};

export const saveImageHotspotData = async (shopId, imageFile, hotspots) => {
  try {
    // Check if the shop document exists
    const shopRef = doc(db, "shops", shopId);
    const imageHotspotCollectionRef = collection(shopRef, "image-hotspot");

    // Upload the image to Firebase Storage
    const storagePath = `files/image-hotspot/${uuidv4()}-${imageFile.name}`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    const imageHotspotDocRef = doc(imageHotspotCollectionRef, "data");
    const imageHotspotDoc = await getDoc(imageHotspotDocRef);

    const imageHotspotData = {
      imageUrl,
      hotspots,
      updatedAt: new Date().toISOString(),
    };

    if (imageHotspotDoc.exists()) {
      await updateDoc(imageHotspotDocRef, imageHotspotData);
    } else {
      await setDoc(imageHotspotDocRef, imageHotspotData);
    }

    return { success: true, imageUrl };
  } catch (error) {
    console.error("Error saving image hotspot data:", error);
    return { success: false, error: error.message };
  }
};

export const getImageHotspotData = async (shopId) => {
  try {
    const shopRef = doc(db, "shops", shopId);
    const imageHotspotDocRef = doc(
      collection(shopRef, "image-hotspot"),
      "data"
    );

    const imageHotspotDoc = await getDoc(imageHotspotDocRef);

    if (imageHotspotDoc.exists()) {
      return { success: true, data: imageHotspotDoc.data() };
    } else {
      return { success: false, data: null, message: "No hotspot data found" };
    }
  } catch (error) {
    console.error("Error fetching image hotspot data:", error);
    return { success: false, error: error.message };
  }
};
