import React from "react";
import { ChatProvider } from "../Services/Datacontext";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      {children}
    </ChatProvider>
  );
}
