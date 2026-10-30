
import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    updateProfile,
} from "firebase/auth";

import { useRouter } from "expo-router";
import { auth } from "../firebase";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    setError("");
    setMessage("");

    const userEmail = email.trim().toLowerCase();

    if (!name.trim() || !userEmail || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      setError("Please enter a valid email.");
      return;
    }

    if (
  !userEmail.endsWith("@hbplus.fit") &&
  !userEmail.endsWith("@gmail.com")
) {
  setError("Only @hbplus.fit or @gmail.com accounts are allowed.");
  return;
}

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      await updateProfile(result.user, {
        displayName: name.trim(),
      });
      console.log("User name:", result.user.displayName);

      await sendEmailVerification(result.user);

      await signOut(auth);

      setMessage(
        "Account created! Please check your email and verify your account before logging in."
      );
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else {
        setError(e.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>HBPLUS</Text>
        <Text style={styles.subtitle}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Official Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Pressable
          style={styles.button}
          onPress={register}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </Pressable>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {message ? <Text style={styles.success}>{message}</Text> : null}

        <Pressable onPress={() => router.replace("/")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f3f6fb",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    padding: 28,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
  },
  subtitle: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#2563eb",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "#dc2626",
  },
  success: {
    color: "#16a34a",
    lineHeight: 21,
  },
  link: {
    textAlign: "center",
    color: "#2563eb",
  },
});
