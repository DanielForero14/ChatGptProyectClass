import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Message } from "../interfaces/Appinterfaces";
import { APIResponse } from "../interfaces/Responses";

const ChatScreen: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hola, ¿en qué puedo ayudarte?", sender_by: "Bot", date: new Date(), state: "received" },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  // Función para obtener la respuesta de la API
  const getResponse = async () => {
    if (!message.trim()) return;

    const newMessage: Message = { text: message, sender_by: "Me", date: new Date(), state: "viewed" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
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

      const data: APIResponse = await res.json();
      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No recibí respuesta.";

      const botMessage: Message = { text: aiResponse, sender_by: "Bot", date: new Date(), state: "received" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Ocurrió un error al obtener la respuesta.", sender_by: "Bot", date: new Date(), state: "received" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para crear un nuevo chat
  const newChat = () => {
    setMessages([
      { text: "Hola, ¿en qué puedo ayudarte?", sender_by: "Bot", date: new Date(), state: "received" },
    ]);
    setMenuOpen(false); // Cierra el menú después de iniciar un nuevo chat
  };

  return (
    <View style={styles.container}>
      {/* Botón del menú desplegable */}
      <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      {/* Menú desplegable */}
      {menuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={newChat} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Nuevo chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("/welcome")} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Volver al inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Seleccionaste Chat 1")} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Chat 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Seleccionaste Chat 2")} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Chat 2</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.chatBox}>
          <ScrollView style={styles.scrollView}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageContainer,
                  msg.sender_by === "Me" ? styles.userMessage : styles.botMessage,
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
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    paddingTop: 40,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24,
    color: "white",
  },
  menu: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
    width: 200,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  menuItemText: {
    color: "white",
  },
  content: {
    width: "90%",
    maxWidth: 700,
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
    maxHeight: 600,
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
