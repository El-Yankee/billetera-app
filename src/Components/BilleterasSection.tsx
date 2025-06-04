import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WalletCard } from "./WalletCard";

export function BilleterasSection({ billeteras, setBilleteras, styles }: any) {
  return (
    <View style={styles.section}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
          justifyContent: "space-between",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 12,
        }}
      >
        <Text style={styles.subtitle}>Billeteras:</Text>
        <TouchableOpacity
          style={[
            styles.button,
            { marginLeft: 12, paddingVertical: 4, paddingHorizontal: 10 },
          ]}
          onPress={() =>
            setBilleteras((prev: any) => [
              ...prev,
              {
                id: Date.now(),
                label: "Nueva billetera",
                value: 0,
              },
            ])
          }
        >
          <Text style={styles.buttonText}>+ Agregar billetera</Text>
        </TouchableOpacity>
      </View>
      {billeteras.map((b: any) => (
        <WalletCard
          key={b.id}
          label={b.label}
          value={b.value}
          onChange={(v: any) =>
            setBilleteras((prev: any) =>
              prev.map((w: any) => (w.id === b.id ? { ...w, value: v } : w))
            )
          }
          styles={styles}
          onDelete={() =>
            setBilleteras((prev: any) => prev.filter((w: any) => w.id !== b.id))
          }
          onEditLabel={(newLabel: string) =>
            setBilleteras((prev: any) =>
              prev.map((w: any) =>
                w.id === b.id ? { ...w, label: newLabel } : w
              )
            )
          }
        />
      ))}
    </View>
  );
}
