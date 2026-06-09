import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress, secondary }) {
  return (
    <TouchableOpacity style={[styles.button, secondary && styles.secondary]} onPress={onPress}>
      <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: "#15803d", padding: 14, borderRadius: 14, alignItems: "center", marginVertical: 6 },
  secondary: { backgroundColor: "#e5e7eb" },
  text: { color: "white", fontWeight: "800" },
  secondaryText: { color: "#111827" }
});
