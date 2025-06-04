import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export function DeudasSection({ deudas, eliminarDeuda, styles }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Plata que me deben:</Text>
      {deudas.map((d: any, i: number) => (
        <View key={i} style={styles.card}>
          <Text style={styles.cardText}>
            {d.descripcion} - ${d.monto}
          </Text>
          <TouchableOpacity
            onPress={() => eliminarDeuda(i)}
            style={{
              backgroundColor: "#4CAF50",
              padding: 6,
              borderRadius: 6,
              marginTop: 8,
              alignSelf: "flex-end",
            }}
          >
            <Text style={{ color: "#fff" }}>Confirmar devolución</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
