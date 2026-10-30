
import { useRouter } from "expo-router";
import { useState } from "react";

import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email.trim() || !password) {
      return "Please enter email and password.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Please enter a valid email.";
    }

    if (password.length < 6) {
      return "Password must contain at least 6 characters.";
    }

    return "";
  }

  async function loginWithEmail() {
    setError("");

    const message = validate();

    if (message) {
      setError(message);
      return;
    }

    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      if (!result.user.emailVerified) {
        await signOut(auth);
        setError("Please verify your email before login.");
        return;
      }

      // Navigate after successful login
      router.replace("/dashboard");
    } catch (e) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  async function loginWithGoogle() {
    setError("");
    setLoading(true);

    try {
      if (Platform.OS !== "web") {
        setError("Google login currently avail in web only.");
        return;
      }

      const result = await signInWithPopup(
        auth,
        new GoogleAuthProvider()
      );

      if (!result.user.emailVerified) {
        await signOut(auth);
        setError("Please use a verified email account.");
        return;
      }

      // Navigate after successful login
      router.replace("/dashboard");
    } catch (e) {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>HBPLUS</Text>
        <Text style={styles.subtitle}>Welcome Back!</Text>

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

        <Pressable
          style={styles.button}
          onPress={loginWithEmail}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </Pressable>

        <Text style={styles.or}>OR</Text>

        <Pressable
          style={styles.googleButton}
          onPress={loginWithGoogle}
          disabled={loading}
        >
          <Text style={styles.googleText}>Login with Google</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/registration")}>
  <Text style={{ color: "#2563eb", textAlign: "center" }}>
    Don't have an account? Register
  </Text>
</Pressable>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.note}>
          Only verified @hbplus.fit accounts are allowed.
        </Text>
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
  or: {
    textAlign: "center",
    color: "#888",
  },
  googleButton: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  googleText: {
    fontWeight: "bold",
  },
  error: {
    color: "#dc2626",
  },
  note: {
    color: "#666",
    fontSize: 12,
  },
});
