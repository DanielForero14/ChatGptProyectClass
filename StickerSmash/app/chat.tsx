import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.chatBox}>
          <Text style={styles.message}>Hola, ¿en qué puedo ayudarte?</Text>
        </View>
        <TextInput style={styles.input} placeholder="Escribe tu mensaje..." placeholderTextColor="#aaa" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E", // Fondo oscuro
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%", // Margen en los lados
    maxWidth: 400, // Limitar el ancho para que no se expanda demasiado
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  chatBox: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    minHeight: 300,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  message: {
    color: "white",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#444",
    color: "white",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#00b894",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChatScreen;
