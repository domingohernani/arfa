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

export const startChat = async ({ shopId, shopperId, messageText }) => {
  try {
    // Check if a chat between the shop and shopper already exists
    const chatsCollection = collection(db, "chats");
    const existingChatQuery = query(
      chatsCollection,
      where("shopId", "==", shopId),
      where("shopperId", "==", shopperId)
    );

    const querySnapshot = await getDocs(existingChatQuery);

    let chatRef;

    if (!querySnapshot.empty) {
      // Chat exists, get its reference
      const chatDoc = querySnapshot.docs[0];
      chatRef = doc(db, "chats", chatDoc.id);

      // Update the existing chat's last message and timestamp
      await updateDoc(chatRef, {
        lastMessage: messageText,
        lastMessageTimestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
        senderId: shopperId,
        isSellerRead: false,
        isShopperRead: false,
      });
    } else {
      // Chat does not exist, create a new one
      chatRef = doc(chatsCollection);
      await setDoc(chatRef, {
        shopId: shopId,
        shopperId: shopperId,
        senderId: shopperId,
        lastMessage: messageText,
        lastMessageTimestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
        isSellerTyping: false,
        isShopperTyping: false,
        isSellerRead: false,
        isShopperRead: false,
        imageUrl: null,
        videoUrl: null,
      });
    }

    // Add the message to the messages subcollection
    const messagesRef = collection(chatRef, "messages");
    await addDoc(messagesRef, {
      senderId: shopperId,
      text: messageText,
      timestamp: serverTimestamp(),
      status: "sent",
      imageUrl: "",
      videoUrl: "",
    });

    return chatRef.id;
  } catch (error) {
    console.error("Error starting chat:", error);
    return false;
  }
};

export const getChatsByShopId = (shopId, callback) => {
  if (!shopId) {
    callback([]);
    return;
  }

  try {
    const q = query(
      collection(db, "chats"),
      where("shopId", "==", shopId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      let chats = [];

      for (let chatDoc of querySnapshot.docs) {
        const chatData = { id: chatDoc.id, ...chatDoc.data() };

        const shopperId = chatData.shopperId;
        if (shopperId) {
          const userRef = doc(db, "users", shopperId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            chatData.shopperInfo = userData;

            if (
              userData.profileUrl &&
              userData.profileUrl.includes("profile")
            ) {
              const profileRef = ref(storage, userData.profileUrl);
              try {
                const profileUrl = await getDownloadURL(profileRef);
                chatData.shopperInfo.profileUrl = profileUrl;
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

      callback(chats);
    });

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
      where("shopperId", "==", shopperId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      let chats = [];

      for (let chatDoc of querySnapshot.docs) {
        const chatData = { id: chatDoc.id, ...chatDoc.data() };

        const shopId = chatData.shopId;

        if (shopId) {
          const shopRef = doc(db, "shops", shopId);
          const shopDoc = await getDoc(shopRef);
          if (shopDoc.exists()) {
            const shopData = shopDoc.data();
            chatData.shopInfo = shopData;

            if (shopData.logo) {
              const logoRef = ref(storage, shopData.logo);
              try {
                const logo = await getDownloadURL(logoRef);
                chatData.shopInfo.logo = logo;
              } catch (error) {
                console.error("Error getting logo image URL: ", error);
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

      callback(chats);
    });

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

const updatePreviewChat = async (
  chatId,
  senderId,
  text,
  imageUrl = "",
  videoUrl = ""
) => {
  const chatDocRef = doc(db, "chats", chatId);
  try {
    // Fetch the existing chat document
    const chatDoc = await getDoc(chatDocRef);

    if (chatDoc.exists()) {
      const chatData = chatDoc.data();

      // If createdAt doesn't exist, add it
      const updateData = {
        senderId: senderId,
        lastMessage: text,
        imageUrl: imageUrl,
        videoUrl: videoUrl,
        createdAt: serverTimestamp(),
        isSellerRead: false,
        isShopperRead: false,
      };

      await updateDoc(chatDocRef, updateData);
    } else {
      console.error("Chat does not exist. Cannot update.");
    }
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

    await updatePreviewChat(
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

export const updateChatReadStatus = async (chatId, userType) => {
  try {
    // Reference the Firestore document
    const chatRef = doc(db, "chats", chatId);

    // Determine the field to update based on userType
    const fieldToUpdate =
      userType === "shopper" ? "isShopperRead" : "isSellerRead";

    // Update the document
    await updateDoc(chatRef, {
      [fieldToUpdate]: true,
    });
    return true;
  } catch (error) {
    return false;
    console.error("Error updating chat read status:", error);
  }
};
