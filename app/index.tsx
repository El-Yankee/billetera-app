import { ScrollView, Text, View, TextInput } from "react-native";
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

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  const { totales, setTotales } = useHomeTotales();
  const { transacciones, deudas, eliminarDeuda } = useTransacciones();

  // Estados para billeteras
  const [efectivo, setEfectivo] = useState(0);
  const [mp, setMp] = useState(0);
  const [personalPay, setPersonalPay] = useState(0);
  const [uala, setUala] = useState(0);
  const [astropay, setAstropay] = useState(0);

  const [billeteras, setBilleteras] = useState([
    {
      id: 1,
      label: "Efectivo",
      value: 0,
      icon: (
        <FontAwesome5
          name="money-bill-wave"
          size={22}
          color="#4caf50"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      id: 2,
      label: "Mercado Pago",
      value: 0,
      icon: (
        <MaterialCommunityIcons
          name="credit-card"
          size={22}
          color="#1976d2"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      id: 3,
      label: "Personal Pay",
      value: 0,
      icon: (
        <MaterialCommunityIcons
          name="cellphone"
          size={22}
          color="#ff9800"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      id: 4,
      label: "Ualá",
      value: 0,
      icon: (
        <MaterialCommunityIcons
          name="credit-card-outline"
          size={22}
          color="#512da8"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      id: 5,
      label: "Astropay",
      value: 0,
      icon: (
        <MaterialCommunityIcons
          name="star-four-points"
          size={22}
          color="#e040fb"
          style={{ marginRight: 10 }}
        />
      ),
    },
  ]);

  return (
    <ScrollView
      style={{ backgroundColor: theme.background, flex: 1 }}
      contentContainerStyle={styles.container}
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
                  icon: (
                    <MaterialCommunityIcons
                      name="wallet"
                      size={22}
                      color="#888"
                      style={{ marginRight: 10 }}
                    />
                  ),
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
            totales.find((total) => total.id === t.totalId)?.label ??
            "Sin total";
          return (
            <View key={i} style={styles.card}>
              <Text style={styles.cardText}>
                {t.descripcion} - ${t.monto} ({totales[t.totalId - 1]?.label},{" "}
                {t.origen})
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Pressable
                  onPress={() => alert("✅ Aceptado")}
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
          style={styles.textInput}
          placeholder="Escribe una nota..."
          placeholderTextColor={theme.placeholderText}
          multiline
          numberOfLines={5}
        />
      </View>
    </ScrollView>
  );
}
