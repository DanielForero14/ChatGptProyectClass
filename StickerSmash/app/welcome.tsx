import { useRouter } from "expo-router";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const router = useRouter();

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userSession"); // Elimina los datos de sesión
      router.replace("/"); // Redirige a la pantalla de carga/inicio
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Contenido centrado */}
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Image source={require("../assets/images/LogoChatGPT.png")} style={styles.logo} />

        {/* Título */}
        <Text style={styles.title}>Welcome to ChatGPT</Text>
        <Text style={styles.subtitle}>Ask anything, get your answer</Text>

        {/* Icono decorativo */}
        <Image source={require("../assets/images/11516293.png")} style={styles.icon} />

        {/* Ejemplos */}
        <View style={styles.examplesContainer}>
          <Text style={styles.examplesTitle}>Examples</Text>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleText}>"Explain quantum computing in simple terms"</Text>
          </View>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleText}>"Got any creative ideas for a 10 year old's birthday?"</Text>
          </View>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleText}>"How do I make an HTTP request in JavaScript?"</Text>
          </View>
        </View>

        {/* Botón Next */}
        <TouchableOpacity style={styles.button} onPress={() => router.push("/chat")}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        {/* Botón Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    width: "100%",
  },
  contentContainer: {
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginBottom: 15,
  },
  examplesContainer: {
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    marginBottom: 20,
  },
  examplesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  exampleBox: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    maxWidth: 350,
    alignSelf: "center",
    marginBottom: 10,
  },
  exampleText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1FAA9F",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
    width: "80%",
    maxWidth: 300,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#D9534F",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: "80%",
    maxWidth: 300,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
