import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TotalCard } from "./TotalCard";

export function TotalesSection({ totales, setTotales, styles }: any) {
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
        <Text style={styles.subtitle}>Totales:</Text>
        <TouchableOpacity
          style={[
            styles.button,
            { marginLeft: 12, paddingVertical: 4, paddingHorizontal: 10 },
          ]}
          onPress={() =>
            setTotales((prev: any) => [
              ...prev,
              {
                id: Date.now(),
                label: "Nuevo total",
                value: 0,
              },
            ])
          }
        >
          <Text style={styles.buttonText}>+ Agregar total</Text>
        </TouchableOpacity>
      </View>
      {totales.map((total: any) => (
        <TotalCard
          key={total.id}
          label={total.label}
          value={total.value}
          onChange={(v: any) =>
            setTotales((prev: any) =>
              prev.map((t: any) => (t.id === total.id ? { ...t, value: v } : t))
            )
          }
          styles={styles}
          onDelete={() =>
            setTotales((prev: any) =>
              prev.filter((t: any) => t.id !== total.id)
            )
          }
          onEditLabel={(newLabel: string) =>
            setTotales((prev: any) =>
              prev.map((t: any) =>
                t.id === total.id ? { ...t, label: newLabel } : t
              )
            )
          }
        />
      ))}
    </View>
  );
}
// This component renders a section for managing totals, allowing users to add, edit, and delete total entries.
// It uses the TotalCard component to display each total entry and provides functionality to modify them.
