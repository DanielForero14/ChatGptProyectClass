import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const ChatScreen = () => {
  const [message, setMessage] = useState(""); // Mensaje del usuario
  const [messages, setMessages] = useState([
    { text: "Hola, ¿en qué puedo ayudarte?", sender: "bot" },
  ]); // Historial de mensajes
  const [isLoading, setIsLoading] = useState(false); // Indicador de carga

  // Función para hacer la petición a la API
  const getResponse = async () => {
    if (!message.trim()) return; // Evita enviar mensajes vacíos

    // Agregar mensaje del usuario al historial
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    setMessage(""); // Limpiar la barra de entrada
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB5r43GOrHkHmU7Bg6RF31QCMwikxow82I",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
          }),
        }
      );

      const data = await res.json();
      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No recibí respuesta.";

      // Agregar respuesta del chatbot al historial
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Ocurrió un error al obtener la respuesta.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.chatBox}>
          <ScrollView style={styles.scrollView}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageContainer,
                  msg.sender === "user" ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={getResponse}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Cargando..." : "Enviar"}
          </Text>
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
    maxWidth: 700, // Limitar el ancho para que no se expanda demasiado
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
    borderRadius: 10,
    width: "100%",
    minHeight: 300,
    maxHeight: 600, // Evita que crezca demasiado
    padding: 10,
    paddingBottom: 20, 
  },
  scrollView: {
    flexGrow: 1,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#00b894",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#444",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#444",
    color: "white",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10, // Agregar espacio entre el input y el botón
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
