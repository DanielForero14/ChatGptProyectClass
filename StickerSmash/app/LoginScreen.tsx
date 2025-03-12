import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/FirebaseConfig";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Registrar nuevo usuario
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/welcome");
    } catch (error: any) {
      console.log("Error de registro", error.message);
    }
  };

  // Iniciar sesión
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/welcome");
    } catch (error: any) {
      console.log("Error de inicio de sesión", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#ccc"
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister} style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#2A2A2A",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#444",
    color: "white",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#00b894",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#0984e3",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
