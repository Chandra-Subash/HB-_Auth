
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });

    return unsubscribe;
  }, []);

  async function logout() {
    await signOut(auth);
  }

  if (checking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  // Determine role using email domain
  const email = user.email?.toLowerCase() || "";

  const role = email.endsWith("@hbplus.fit")
    ? "Owner"
    : email.endsWith("@gmail.com")
    ? "User"
    : "Unknown";

  if (!user.emailVerified || role === "Unknown") {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HBPLUS</Text>

      <Text style={styles.welcome}>
        Welcome, {role}!
      </Text>

      <Text style={styles.name}>
        {user.displayName || "User"}
      </Text>

      <Text style={styles.email}>
        {user.email}
      </Text>

      <Text style={styles.role}>
        Role: {role}
      </Text>

      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
} // Closing Dashboard function

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f3f6fb",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
  },
  email: {
    color: "#666",
    marginTop: 10,
  },
  role: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: "bold",
  },
  button: {
    marginTop: 25,
    padding: 15,
    backgroundColor: "#dc2626",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
