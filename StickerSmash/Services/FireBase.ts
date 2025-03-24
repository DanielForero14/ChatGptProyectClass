import { db } from "./FirebaseConfig";
import { 
    collection, addDoc, getDocs, doc, setDoc, updateDoc, arrayUnion, serverTimestamp, query, orderBy 
} from "firebase/firestore";

// 🔹 Guardar datos del usuario en Firestore
export async function saveUser(userId: string, name: string, email: string, photoURL: string) {
    try {
        const userRef = doc(db, "Users", userId);
        await setDoc(userRef, {
            id: userId,
            name,
            email,
            photoURL,
            createdAt: serverTimestamp(),  // Usamos serverTimestamp() para evitar inconsistencias
        });
        return { success: true };
    } catch (error) {
        console.error("Error al guardar el usuario:", error);
        return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
    }
}

// 🔹 Obtener todos los chats (ordenados por fecha)
export async function getChats() {
    try {
        const chatsRef = collection(db, "Chats");
        const q = query(chatsRef, orderBy("createdAt", "desc")); // 🔥 Chats más recientes primero
        const snapshot = await getDocs(q);
        
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error al obtener los chats:", error);
        return null;
    }
}

// 🔹 Crear un nuevo chat
export async function createChat(userId: string, message: string) {
    try {
        const chatRef = collection(db, "Chats");
        await addDoc(chatRef, {
            userId,
            messages: [{ 
                text: message, 
                senderId: userId, 
                timestamp: serverTimestamp()  // 🔥 Firebase manejará la hora
            }],
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error al crear el chat:", error);
        return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
    }
}

// 🔹 Agregar un nuevo mensaje a un chat existente
export async function addMessageToChat(chatId: string, userId: string, message: string) {
    try {
        const chatRef = doc(db, "Chats", chatId);
        await updateDoc(chatRef, {
            messages: arrayUnion({
                text: message,
                senderId: userId,
                timestamp: serverTimestamp()
            })
        });
        return { success: true };
    } catch (error) {
        console.error("Error al agregar mensaje:", error);
        return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
    }
}
