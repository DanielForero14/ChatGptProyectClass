import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

export default function SplashScreenComponent({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const prepare = async () => {
      try {
        // Evita que la Splash Screen se oculte automáticamente
        await SplashScreen.preventAutoHideAsync();

        // Simula una carga de 10 segundos
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Oculta la Splash Screen después de 10 segundos
        await SplashScreen.hideAsync();

        // Notifica que la Splash Screen ha terminado
        onFinish();
      }
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/LogoChatGPT.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202123",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
});