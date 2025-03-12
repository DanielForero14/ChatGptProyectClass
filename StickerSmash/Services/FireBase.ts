import { db_instance } from "./FirebaseConfig";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";

// Guardar datos del usuario en Firestore
export async function saveUser(userId: string, name: string, email: string, photoURL: string) {
    try {
        const userRef = doc(db_instance, "Users", userId);
        await setDoc(userRef, {
            id: userId,
            name,
            email,
            photoURL,
            createdAt: new Date(),
        });
        return { success: true };
    } catch (error) {
        console.error("Error al guardar el usuario:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Error desconocido" 
        };
    }
}

// Obtener todos los chats
export async function getChats() {
    try {
        const chatsRef = collection(db_instance, "Chats");
        const snapshot = await getDocs(chatsRef);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error al obtener los chats:", error);
        return null;
    }
}

// Crear un nuevo chat
export async function createChat(userId: string, message: string) {
    try {
        const chatRef = collection(db_instance, "Chats");
        await addDoc(chatRef, {
            userId,
            messages: [{ text: message, senderId: userId, timestamp: new Date() }],
        });
        return { success: true };
    } catch (error) {
        console.error("Error al crear el chat:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Error desconocido" 
        };
    }
}
