import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth, db } from "./firebase";

// Initialize Firebase Storage
const storage = getStorage();

export const getChatsByShopId = (shopId, callback) => {
  if (!shopId) {
    callback([]);
    return;
  }

  try {
    const q = query(collection(db, "chats"), where("shopId", "==", shopId));

    // Set up a Firestore real-time listener using onSnapshot
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
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
            if (
              userData.profileUrl &&
              userData.profileUrl.includes("profile")
            ) {
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

      // Call the callback with the updated chats
      callback(chats);
    });

    // Return the unsubscribe function so it can be called to stop listening
    return unsubscribe;
  } catch (error) {
    console.error(
      "Error setting up real-time listener for chats and user data: ",
      error
    );
    callback([]);
  }
};

export const getChatsByShopperId = (shopperId, callback) => {
  if (!shopperId) {
    callback([]);
    return;
  }

  try {
    const q = query(
      collection(db, "chats"),
      where("shopperId", "==", shopperId)
    );

    // Set up a Firestore real-time listener using onSnapshot
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      let chats = [];

      for (let chatDoc of querySnapshot.docs) {
        const chatData = { id: chatDoc.id, ...chatDoc.data() };

        // Fetch shop data based on shopId
        const shopId = chatData.shopId;

        if (shopId) {
          const shopRef = doc(db, "shops", shopId);
          const shopDoc = await getDoc(shopRef);
          if (shopDoc.exists()) {
            const shopData = shopDoc.data();
            chatData.shopInfo = shopData; // Add shop data to the chat

            // Get the profile URL from Storage if available
            if (shopData.logo) {
              const logoRef = ref(storage, shopData.logo);
              try {
                const logo = await getDownloadURL(logoRef);
                chatData.shopInfo.logo = logo; // Add the full URL to shopInfo
              } catch (error) {
                console.error("Error getting profile image URL: ", error);
              }
            } else {
              chatData.shopInfo.logo = null;
            }
          } else {
            console.log(`No such shop for shopId: ${shopId}`);
          }
        }

        chats.push(chatData);
      }

      // Call the callback with the updated chats
      callback(chats);
    });

    // Return the unsubscribe function so it can be called to stop listening
    return unsubscribe;
  } catch (error) {
    console.error(
      "Error setting up real-time listener for chats and shop data: ",
      error
    );
    callback([]);
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

const updatePeviewChat = async (
  chatId,
  senderId,
  text,
  imageUrl = "",
  videoUrl = ""
) => {
  const chatDocRef = doc(db, "chats", chatId);
  try {
    await updateDoc(chatDocRef, {
      senderId: senderId,
      lastMessage: text,
      imageUrl: imageUrl,
      videoUrl: videoUrl,
    });
  } catch (error) {
    console.error("Error updating preview chat: ", error);
  }
};

export const sendMessage = async (chatId, text, imageUrl, videoUrl) => {
  try {
    // Reference to the messages subcollection within a specific chat document
    const subcollectionRef = collection(db, "chats", chatId, "messages");

    // Adding a new message to the subcollection
    const newMessageRef = await addDoc(subcollectionRef, {
      text: text, // The message text
      timestamp: serverTimestamp(), // Server timestamp
      senderId: auth.currentUser.uid, // Sender's ID (from Firebase Auth)
      status: "sent",
      imageUrl: imageUrl ? imageUrl : "",
      videoUrl: videoUrl ? videoUrl : "",
    });

    await updatePeviewChat(
      chatId,
      auth.currentUser.uid,
      text,
      imageUrl,
      videoUrl
    );

    return newMessageRef.id; // Returning the ID of the new document
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
};

// Function to update typing status in Firestore
export const updateTypingStatus = async (chatId, userType, isTyping) => {
  const chatDocRef = doc(db, "chats", chatId);

  try {
    if (userType === "shopper") {
      await updateDoc(chatDocRef, { isShopperTyping: isTyping });
    } else if (userType === "seller") {
      await updateDoc(chatDocRef, { isSellerTyping: isTyping });
    }
  } catch (error) {
    console.error("Error updating typing status:", error);
  }
};
