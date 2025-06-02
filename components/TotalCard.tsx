import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

type TotalCardProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  styles: any;
  onDelete: () => void;
  onEditLabel: (newLabel: string) => void;
};

export function TotalCard({
  label,
  value,
  onChange,
  styles,
  onDelete,
  onEditLabel,
}: TotalCardProps) {
  const [editing, setEditing] = useState(false);
  const [editingLabel, setEditingLabel] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());
  const [tempLabel, setTempLabel] = useState(label);

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          <Text style={styles.cardText}>
            {label}: ${value}
          </Text>
          <Pressable
            onPress={() => setEditingLabel(true)}
            style={{ marginRight: 8 }}
          >
            <Text style={{ fontSize: 18 }}>✏️</Text>
          </Pressable>
          <Pressable onPress={() => setEditing(true)} style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 18 }}>📝</Text>
          </Pressable>
          <Pressable onPress={onDelete} style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 18, color: "red" }}>🗑️</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
