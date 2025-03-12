import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/FirebaseConfig"; // Importa la configuración de Firebase
import { useRouter } from "expo-router"; // ✅ Usa expo-router en lugar de react-navigation

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // ✅ Usa useRouter

  // Registrar nuevo usuario
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registro exitoso");
      router.push("/chat"); // ✅ Redirige al chat
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  // Iniciar sesión
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso");
      router.push("/chat"); // ✅ Redirige al chat
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      {/* Botón de Iniciar Sesión */}
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "blue", padding: 10, alignItems: "center", marginBottom: 10 }}>
        <Text style={{ color: "white" }}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Botón de Registro */}
      <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: "green", padding: 10, alignItems: "center" }}>
        <Text style={{ color: "white" }}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
