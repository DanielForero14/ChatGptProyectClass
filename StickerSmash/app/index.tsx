import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para guardar el estado de sesión

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem("userToken"); // Verifica si hay un token guardado

      if (userToken) {
        router.replace("/welcome"); // Si el usuario está autenticado, ir a Welcome
      } else {
        router.replace("/LoginScreen"); // Si no, ir a Login
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Cargando...
        </Text>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return null;
}
