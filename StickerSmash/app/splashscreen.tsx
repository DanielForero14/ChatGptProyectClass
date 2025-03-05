import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as splashScreen from "expo-splash-screen";

export default function HomeScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    const hideSplash = async () => {
      await splashScreen.preventAutoHideAsync(); 
      await splashScreen.hideAsync(); 
    };

    hideSplash();
  }, []);
  return (
    <View style={styles.container}>
      <Image                                                       // Contiene la ruta del logo, y modo en el que se coloca la imagen
        source={require("../assets/images/LogoChatGPT.png")} 
        style={styles.logo}
        resizeMode="contain"/> 
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202123", // Fondo 
    alignItems: "center", // Ubicación
    justifyContent: "center",
  },
  logo: { // Tamaño del logo
    width: 250,
    height: 250,
  },
});
