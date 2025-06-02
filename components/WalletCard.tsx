import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

type WalletCardProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  styles: any;
  onDelete: () => void;
  onEditLabel: (newLabel: string) => void;
};

export function WalletCard({
  label,
  value,
  onChange,
  styles,
  onDelete,
  onEditLabel,
}: WalletCardProps) {
  const [editing, setEditing] = useState(false);
  const [editingLabel, setEditingLabel] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());
  const [tempLabel, setTempLabel] = useState(label);
  const [showActions, setShowActions] = useState(false);

  const handleSave = () => {
    onChange(Number(tempValue));
    setEditing(false);
  };

  const handleSaveLabel = () => {
    onEditLabel(tempLabel);
    setEditingLabel(false);
  };

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        ) : editingLabel ? (
          <>
            <TextInput
              style={styles.input}
              value={tempLabel}
              onChangeText={setTempLabel}
            />
            <Pressable onPress={handleSaveLabel} style={{ marginLeft: 8 }}>
              <Text style={{ color: "#4CAF50" }}>Guardar</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.cardText}>
              {label}: ${value}
            </Text>
            {!showActions ? (
              <Pressable
                onPress={() => setShowActions(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ fontSize: 18 }}>✏️</Text>
              </Pressable>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                  onPress={() => {
                    setEditingLabel(true);
                    setShowActions(false);
                  }}
                  style={{ marginLeft: 8 }}
                >
                  <Text style={{ fontSize: 18 }}>📝</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setEditing(true);
                    setShowActions(false);
                  }}
                  style={{ marginLeft: 8 }}
                >
                  <Text style={{ fontSize: 18 }}>🔢</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    onDelete();
                    setShowActions(false);
                  }}
                  style={{ marginLeft: 8 }}
                >
                  <Text style={{ fontSize: 18, color: "red" }}>🗑️</Text>
                </Pressable>
                <Pressable
                  onPress={() => setShowActions(false)}
                  style={{ marginLeft: 8 }}
                >
                  <Text style={{ fontSize: 18, color: "#888" }}>❌</Text>
                </Pressable>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}
