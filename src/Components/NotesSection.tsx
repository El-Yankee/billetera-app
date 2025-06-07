import React, { useState } from "react";
import { View, Text, TextInput, Platform } from "react-native";

export function NotesSection({ styles }: any) {
  const [nota, setNota] = useState("");
  const [inputHeight, setInputHeight] = useState(80);

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Notas:</Text>
      <TextInput
        style={[
          styles.textInput,
          {
            height: Math.max(80, inputHeight),
          },
        ]}
        placeholder="Escribe una nota..."
        placeholderTextColor="#aaa"
        multiline
        value={nota}
        onChangeText={setNota}
        onContentSizeChange={(e) =>
          setInputHeight(e.nativeEvent.contentSize.height)
        }
        numberOfLines={4}
        blurOnSubmit={false}
        returnKeyType={Platform.OS === "ios" ? "default" : "none"}
      />
    </View>
  );
}
