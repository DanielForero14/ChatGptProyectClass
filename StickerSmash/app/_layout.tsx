import React, { useState } from "react";
import { Stack } from "expo-router";
import { ChatProvider } from "../Services/Chatcontext"; // Importamos el Provider
import SplashScreenComponent from "./splashscreen"; // Importamos el componente de Splash Screen

export default function RootLayout() {
  const [isSplashReady, setIsSplashReady] = useState(false);

  // Función que se ejecuta cuando la Splash Screen termina
  const handleSplashFinish = () => {
    setIsSplashReady(true);
  };

  // Si la Splash Screen no ha terminado, mostramos el componente de Splash Screen
  if (!isSplashReady) {
    return <SplashScreenComponent onFinish={handleSplashFinish} />;
  }

  // Si la Splash Screen ha terminado, mostramos el contenido principal
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