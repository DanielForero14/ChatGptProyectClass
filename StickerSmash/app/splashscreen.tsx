import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = ({ navigation }: any) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("Cargando splash screen...");
    const loadAssets = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Finalizando splash screen");
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync().catch(console.warn);
        navigation.replace("Welcome");
      }
    };
  
    loadAssets();
  }, [navigation]);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/LogoChatGPT.png")} style={styles.logo} />
      </View>
    );
  }

  return null; // Esto previene pantalla en blanco
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 2000,
    height: 2000,
    resizeMode: "contain",
  },
});

export default SplashScreenComponent;