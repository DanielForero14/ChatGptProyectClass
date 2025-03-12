import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/FirebaseConfig";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validateInputs = () => {
    if (!email.includes("@") || password.length < 6) {
      setErrorMessage("Correo inválido o contraseña muy corta.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/welcome");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/welcome");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#B0B0B0"
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#B0B0B0"
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister} style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#FF4C4C",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#333",
    width: "100%",
    maxWidth: 350,
    padding: 15,
    borderRadius: 10,
    color: "#FFFFFF",
    marginBottom: 15,
    fontSize: 16,
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
    width: "80%",
    maxWidth: 300,
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: "#03DAC5",
    paddingVertical: 15,
    borderRadius: 25,
    width: "80%",
    maxWidth: 300,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default LoginScreen;
