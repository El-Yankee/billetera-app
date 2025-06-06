import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export function DeudasSection({
  deudas,
  eliminarDeuda,
  styles,
  setDeudas,
}: any) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editMonto, setEditMonto] = useState("");

  const startEdit = (i: number, d: any) => {
    setEditIndex(i);
    setEditDescripcion(d.descripcion);
    setEditMonto(String(d.monto));
  };

  const saveEdit = (i: number) => {
    if (setDeudas) {
      setDeudas((prev: any[]) =>
        prev.map((d, idx) =>
          idx === i
            ? { ...d, descripcion: editDescripcion, monto: Number(editMonto) }
            : d
        )
      );
    }
    setEditIndex(null);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Plata que me deben:</Text>
      {deudas.map((d: any, i: number) => (
        <View key={i} style={styles.card}>
          {editIndex === i ? (
            <>
              <TextInput
                style={styles.textInput}
                value={editDescripcion}
                onChangeText={setEditDescripcion}
                placeholder="Descripción"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.textInput}
                value={editMonto}
                onChangeText={setEditMonto}
                placeholder="Monto"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
              />
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <TouchableOpacity
                  onPress={() => saveEdit(i)}
                  style={{
                    backgroundColor: "#2D9CDB",
                    padding: 6,
                    borderRadius: 6,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setEditIndex(null)}
                  style={{
                    backgroundColor: "#888",
                    padding: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>
                {d.descripcion} - ${d.monto}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => eliminarDeuda(i)}
                  style={{
                    backgroundColor: "#4CAF50",
                    padding: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => startEdit(i, d)}
                  style={{
                    backgroundColor: "#2196F3",
                    padding: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Editar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );
}
