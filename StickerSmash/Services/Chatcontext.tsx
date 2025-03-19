import React, { createContext, useState, useContext, ReactNode } from "react";
import { Timestamp } from "firebase/firestore";

interface Message {
  sender: string;
  text: string;
  timestamp: Timestamp;
}

interface ChatContextProps {
  messages: Message[];
  addMessage: (newMessage: Message) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (newMessage: Message) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat debe usarse dentro de un ChatProvider");
  }
  return context;
};
