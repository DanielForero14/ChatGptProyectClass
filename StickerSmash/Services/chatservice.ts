import { collection, addDoc, onSnapshot, Timestamp, getDocs } from "firebase/firestore";
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
