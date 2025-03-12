import { collection, addDoc, onSnapshot, Timestamp, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "./FirebaseConfig"; // Asegúrate de importar tu configuración de Firebase

const CHATS_COLLECTION = "Chats";

// 🔹 Crear un nuevo chat
export const createChat = async () => {
  try {
    const newChat = {
      createdAt: Timestamp.now(),
      messages: [],
    };

    const docRef = await addDoc(collection(db, CHATS_COLLECTION), newChat);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear el chat:", error);
  }
};

// 🔹 Obtener la lista de chats en tiempo real
export const listenToChats = (callback: (chats: any[]) => void) => {
  return onSnapshot(collection(db, CHATS_COLLECTION), (snapshot) => {
    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(chats);
  });
};

// 🔹 Obtener la lista de chats sin escuchar en tiempo real (para una carga inicial)
export const getChats = async () => {
  const snapshot = await getDocs(collection(db, CHATS_COLLECTION));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// 🔹 Actualizar un chat (sobreescribe los mensajes)
export const updateChat = async (chatId: string, messages: any[]) => {
  try {
    const chatRef = doc(db, CHATS_COLLECTION, chatId);
    await updateDoc(chatRef, { messages });
  } catch (error) {
    console.error("Error al actualizar el chat:", error);
  }
};

// 🔹 Agregar un mensaje a un chat existente
export const sendMessage = async (chatId: string, message: { sender: string; text: string }) => {
  try {
    const chatRef = doc(db, CHATS_COLLECTION, chatId);
    const newMessage = {
      ...message,
      timestamp: Timestamp.now(),
    };

    await updateDoc(chatRef, {
      messages: arrayUnion(newMessage), // Agregar el nuevo mensaje a la lista
    });
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};
