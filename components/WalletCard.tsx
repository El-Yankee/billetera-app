import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

type WalletCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
  styles: any;
};

export function WalletCard({
  icon,
  label,
  value,
  onChange,
  styles,
}: WalletCardProps) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());

  const handleSave = () => {
    onChange(Number(tempValue));
    setEditing(false);
  };

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon}
        {editing ? (
          <>
            <TextInput
              style={styles.input}
              value={tempValue}
              onChangeText={setTempValue}
              keyboardType="numeric"
            />
            <Pressable onPress={handleSave} style={{ marginLeft: 8 }}>
              <Text style={{ color: "#4CAF50" }}>Guardar</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.cardText}>
              {label}: ${value}
            </Text>
            <Pressable
              onPress={() => setEditing(true)}
              style={{ marginLeft: 8 }}
            >
              <Text style={{ color: "#2196F3" }}>Editar</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}
