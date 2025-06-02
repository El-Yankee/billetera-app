import {
  ScrollView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTransacciones } from "../context/TransaccionesContext";
import { Pressable } from "react-native";
import { useState } from "react";
import { useTheme } from "./styles/useTheme";
import { createHomeStyles } from "./styles/homeStyles";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { WalletCard } from "../components/WalletCard";
import { TotalCard } from "../components/TotalCard";
import { useHomeTotales } from "../context/TotalesContext";
import { useBilleteras } from "../context/BilleterasContext";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  const { totales, setTotales } = useHomeTotales();
  const { billeteras, setBilleteras } = useBilleteras();
  const { transacciones, deudas, eliminarDeuda, eliminarTransaccion } =
    useTransacciones();
  return (
    <ScrollView
      style={{ backgroundColor: theme.background, flex: 1 }}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: 32 }, // Ajusta el valor según necesites
      ]}
    >
      <Text style={styles.title}>💰 Resumen de saldos</Text>

      <Pressable
        style={styles.buttonLink}
        onPress={() => router.push("/nueva")}
      >
        <Text
          style={{
            color: theme.buttonText,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Agregar nueva transacción
        </Text>
      </Pressable>

      {/* Totales */}
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
          <Pressable
            style={[
              styles.button,
              { marginLeft: 12, paddingVertical: 4, paddingHorizontal: 10 },
            ]}
            onPress={() =>
              setTotales((prev) => [
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
          </Pressable>
        </View>
        {totales.map((total) => (
          <TotalCard
            key={total.id}
            label={total.label}
            value={total.value}
            onChange={(v) =>
              setTotales((prev) =>
                prev.map((t) => (t.id === total.id ? { ...t, value: v } : t))
              )
            }
            styles={styles}
            onDelete={() =>
              setTotales((prev) => prev.filter((t) => t.id !== total.id))
            }
            onEditLabel={(newLabel) =>
              setTotales((prev) =>
                prev.map((t) =>
                  t.id === total.id ? { ...t, label: newLabel } : t
                )
              )
            }
          />
        ))}
      </View>

      {/* Billeteras */}
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
          <Pressable
            style={[
              styles.button,
              { marginLeft: 12, paddingVertical: 4, paddingHorizontal: 10 },
            ]}
            onPress={() =>
              setBilleteras((prev) => [
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
          </Pressable>
        </View>
        {billeteras.map((b) => (
          <WalletCard
            key={b.id}
            label={b.label}
            value={b.value}
            onChange={(v) =>
              setBilleteras((prev) =>
                prev.map((w) => (w.id === b.id ? { ...w, value: v } : w))
              )
            }
            styles={styles}
            onDelete={() =>
              setBilleteras((prev) => prev.filter((w) => w.id !== b.id))
            }
            onEditLabel={(newLabel) =>
              setBilleteras((prev) =>
                prev.map((w) => (w.id === b.id ? { ...w, label: newLabel } : w))
              )
            }
          />
        ))}
      </View>

      {/* Plata que me deben */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Plata que me deben:</Text>
        {deudas.map((d, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardText}>
              {d.descripcion} - ${d.monto}
            </Text>
            <Pressable
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
            </Pressable>
          </View>
        ))}
      </View>

      {/* Transacciones realizadas */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Transacciones realizadas:</Text>
        {transacciones.map((t, i) => {
          const totalLabel =
            totales.find((total) => total.id === t.totalId)?.label ?? "N/A";
          const billeteraLabel =
            billeteras.find((b) => b.label === t.origen)?.label ?? t.origen;

          const handleAceptar = () => {
            // Descontar del total
            setTotales((prev) =>
              prev.map((total) =>
                total.id === t.totalId
                  ? { ...total, value: total.value - t.monto }
                  : total
              )
            );
            // Descontar de la billetera
            setBilleteras((prev) =>
              prev.map((b) =>
                b.label === t.origen ? { ...b, value: b.value - t.monto } : b
              )
            );
            // (Opcional) Eliminar la transacción aceptada:
            // Eliminar la transacción aceptada
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
                <Pressable
                  onPress={handleAceptar}
                  style={{
                    backgroundColor: "#4CAF50",
                    padding: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Aceptar</Text>
                </Pressable>
                <Pressable
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
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>

      {/* Notas */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Notas:</Text>
        <TextInput
          style={[
            styles.textInput,
            { color: theme.text, backgroundColor: "transparent" },
          ]}
          placeholder="Escribe una nota..."
          placeholderTextColor={theme.text}
          multiline
          numberOfLines={5}
        />
      </View>
    </ScrollView>
  );
}
