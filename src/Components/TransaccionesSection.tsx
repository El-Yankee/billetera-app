import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export function TransaccionesSection({
  transacciones,
  totales,
  billeteras,
  setTotales,
  setBilleteras,
  eliminarTransaccion,
  setTransacciones,
  styles,
}: any) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editMonto, setEditMonto] = useState("");
  const [editTotalId, setEditTotalId] = useState<number | null>(null);
  const [editBilletera, setEditBilletera] = useState<string>("");

  const startEdit = (i: number, t: any) => {
    setEditIndex(i);
    setEditDescripcion(t.descripcion);
    setEditMonto(String(t.monto));
    setEditTotalId(t.totalId);
    setEditBilletera(t.origen);
  };

  const saveEdit = (i: number) => {
    if (setTransacciones) {
      setTransacciones((prev: any[]) =>
        prev.map((t, idx) =>
          idx === i
            ? {
                ...t,
                descripcion: editDescripcion,
                monto: Number(editMonto),
                totalId: editTotalId,
                origen: editBilletera,
              }
            : t
        )
      );
    }
    setEditIndex(null);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Transacciones realizadas:</Text>
      {transacciones.map((t: any, i: number) => {
        const totalLabel =
          totales.find((total: any) => total.id === t.totalId)?.label ?? "N/A";
        const billeteraLabel =
          billeteras.find((b: any) => b.label === t.origen)?.label ?? t.origen;

        const handleAceptar = () => {
          setTotales((prev: any) =>
            prev.map((total: any) =>
              total.id === t.totalId
                ? { ...total, value: total.value - t.monto }
                : total
            )
          );
          setBilleteras((prev: any) =>
            prev.map((b: any) =>
              b.label === t.origen ? { ...b, value: b.value - t.monto } : b
            )
          );
          eliminarTransaccion(i);
        };

        return (
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
                <Text style={styles.label}>Total:</Text>
                <Picker
                  selectedValue={editTotalId}
                  style={styles.picker}
                  onValueChange={setEditTotalId}
                  dropdownIconColor={styles.textInput.color}
                >
                  {totales.map((total: any) => (
                    <Picker.Item
                      key={total.id}
                      label={total.label}
                      value={total.id}
                    />
                  ))}
                </Picker>
                <Text style={styles.label}>Billetera:</Text>
                <Picker
                  selectedValue={editBilletera}
                  style={styles.picker}
                  onValueChange={setEditBilletera}
                  dropdownIconColor={styles.textInput.color}
                >
                  {billeteras.map((b: any) => (
                    <Picker.Item key={b.id} label={b.label} value={b.label} />
                  ))}
                </Picker>
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
                  {t.descripcion} - ${t.monto} ({totalLabel}, {billeteraLabel})
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={handleAceptar}
                    style={{
                      backgroundColor: "#4CAF50",
                      padding: 6,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Aceptar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => startEdit(i, t)}
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
        );
      })}
    </View>
  );
}
