import React from "react";
import { View, Text, TextInput } from "react-native";

export function NotasSection({ styles }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Notas:</Text>
      <TextInput
        style={[styles.textInput, { backgroundColor: "transparent" }]}
        placeholder="Escribe una nota..."
        placeholderTextColor={"#aaa"}
        multiline
        numberOfLines={5}
      />
    </View>
  );
}
