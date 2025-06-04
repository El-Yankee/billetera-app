import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export function TransaccionesSection({
  transacciones,
  totales,
  billeteras,
  setTotales,
  setBilleteras,
  eliminarTransaccion,
  styles,
}: any) {
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
                onPress={() =>
                  alert("✏️ Función de edición aún no implementada")
                }
                style={{
                  backgroundColor: "#2196F3",
                  padding: 6,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "#fff" }}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}
