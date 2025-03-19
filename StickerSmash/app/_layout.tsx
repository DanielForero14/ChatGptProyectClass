import { Stack } from "expo-router";
import { ChatProvider } from "../Services/Chatcontext"; // Importamos el Provider

export default function RootLayout() {
  return (
    <ChatProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Oculta los headers por defecto
        }}
      />
    </ChatProvider>
  );
}
