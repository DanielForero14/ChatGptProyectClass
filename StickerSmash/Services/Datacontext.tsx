import React, { createContext, useContext, useState, useEffect } from "react";
import { createChat, listenToChats, sendMessage } from "./chatservice";

interface Message {
  sender: string;
  text: string;
  timestamp: any;
}

interface Chat {
  id: string;
  messages: Message[];
}

interface ChatContextType {
  chats: Chat[];
  createNewChat: () => Promise<string | void>;
  sendMessageToChat: (chatId: string, message: Message) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  // 🔹 Escuchar cambios en los chats en tiempo real
  useEffect(() => {
    const unsubscribe = listenToChats(setChats);
    return () => unsubscribe();
  }, []);

  // 🔹 Función para crear un nuevo chat
  const createNewChat = async () => {
    return await createChat();
  };

  // 🔹 Función para enviar un mensaje
  const sendMessageToChat = async (chatId: string, message: Message) => {
    await sendMessage(chatId, message);
  };

  return (
    <ChatContext.Provider value={{ chats, createNewChat, sendMessageToChat }}>
      {children}
    </ChatContext.Provider>
  );
};

// 🔹 Hook personalizado para acceder al contexto
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat debe usarse dentro de un ChatProvider");
  }
  return context;
};
