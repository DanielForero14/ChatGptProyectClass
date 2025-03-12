import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/FirebaseConfig"; // Importa Firebase
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Mostrar errores en pantalla
  const router = useRouter();

  // Validar correo y contraseña antes de enviar
  const validateInputs = () => {
    if (!email.includes("@") || password.length < 6) {
      setErrorMessage("Correo inválido o contraseña muy corta.");
      return false;
    }
    return true;
  };

  // Registro de usuario
  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/chat"); // Redirigir al chat después de registrarse
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // Inicio de sesión
  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/chat"); // Redirigir al chat después del login
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
        Iniciar Sesión
      </Text>

      {errorMessage ? (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
          {errorMessage}
        </Text>
      ) : null}

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
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: "blue", padding: 10, alignItems: "center", marginBottom: 10 }}
      >
        <Text style={{ color: "white" }}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Botón de Registro */}
      <TouchableOpacity
        onPress={handleRegister}
        style={{ backgroundColor: "green", padding: 10, alignItems: "center" }}
      >
        <Text style={{ color: "white" }}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
