import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function NotesSection({ styles }: any) {
  const [nota, setNota] = useState("");
  const [inputHeight, setInputHeight] = useState(80);

  // Cargar nota al iniciar
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("nota");
      if (saved) setNota(saved);
    })();
  }, []);

  // Guardar nota cuando cambia
  useEffect(() => {
    AsyncStorage.setItem("nota", nota);
  }, [nota]);

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
