import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync(); // Evita que la splash screen se cierre antes de tiempo
        // Simular una carga de la app (ej. cargar datos, verificar sesión, etc.)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync(); // Ocultar splash screen solo cuando la app esté lista
    }
  }, [appIsReady]);

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
