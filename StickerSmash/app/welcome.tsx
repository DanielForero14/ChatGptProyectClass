import { useRouter } from "expo-router";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChatGPT</Text>

      {/* Botón personalizado */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/chat")}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E", // Fondo oscuro
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF", // Color blanco para el texto
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1FAA9F", // Color verde del botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10, // Bordes redondeados
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra en Android
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // Texto blanco
  },
});
