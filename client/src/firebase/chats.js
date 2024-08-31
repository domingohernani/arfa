import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "./firebase";

// Initialize Firebase Storage
const storage = getStorage();

export const getChatsByShopId = async (shopId) => {
  if (!shopId) return [];

  try {
    const q = query(collection(db, "chats"), where("shopId", "==", shopId));
    const querySnapshot = await getDocs(q);
    let chats = [];

    for (let chatDoc of querySnapshot.docs) {
      const chatData = { id: chatDoc.id, ...chatDoc.data() };

      // Fetch user data based on shopperId
      const shopperId = chatData.shopperId;
      if (shopperId) {
        const userRef = doc(db, "users", shopperId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          chatData.shopperInfo = userData; // Add user data to the chat

          // Get the profile URL from Storage if available
          if (userData.profileUrl) {
            const profileRef = ref(storage, userData.profileUrl);
            try {
              const profileUrl = await getDownloadURL(profileRef);
              chatData.shopperInfo.profileUrl = profileUrl; // Add the full URL to shopperInfo
            } catch (error) {
              console.error("Error getting profile image URL: ", error);
            }
          }
        } else {
          console.log(`No such user for shopperId: ${shopperId}`);
        }
      }

      chats.push(chatData);
    }

    return chats;
  } catch (error) {
    console.error("Error getting chats and user data: ", error);
    return [];
  }
};

export const fetchMessages = async (chatId) => {
  try {
    const chatDocRef = doc(db, "chats", chatId);

    const messagesCollectionRef = collection(chatDocRef, "messages");

    const messagesQuery = query(
      messagesCollectionRef,
      orderBy("timestamp", "asc")
    );

    const messagesSnapshot = await getDocs(messagesQuery);

    const messages = messagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
