import { ScrollView, Text, View, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { useTransacciones } from "../context/TransaccionesContext";
import { Pressable } from "react-native";
import { useState } from "react";
import { useTheme } from "./styles/useTheme";
import { createStyles } from "./styles/indexStyles";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { WalletCard } from "../components/WalletCard";
import { TotalCard } from "../components/TotalCard";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = createStyles(theme);
  // Estados para totales
  const [comidaSanti, setComidaSanti] = useState(0);
  const [editComidaSanti, setEditComidaSanti] = useState(false);
  const [comidaCami, setComidaCami] = useState(0);
  const [editComidaCami, setEditComidaCami] = useState(false);
  const [extras, setExtras] = useState(0);
  const [editExtras, setEditExtras] = useState(false);
  const [dolares, setDolares] = useState(0);
  const [editDolares, setEditDolares] = useState(false);

  // Estados para billeteras
  const [efectivo, setEfectivo] = useState(0);
  const [editEfectivo, setEditEfectivo] = useState(false);
  const [mp, setMp] = useState(0);
  const [editMp, setEditMp] = useState(false);
  const [personalPay, setPersonalPay] = useState(0);
  const [editPersonalPay, setEditPersonalPay] = useState(false);
  const [uala, setUala] = useState(0);
  const [editUala, setEditUala] = useState(false);
  const [astropay, setAstropay] = useState(0);
  const [editAstropay, setEditAstropay] = useState(false);

  const { transacciones, deudas, eliminarDeuda } = useTransacciones();

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <Text style={styles.subtitle}>Totales:</Text>
        <TotalCard
          label="Comida Santi"
          value={comidaSanti}
          onChange={setComidaSanti}
          styles={styles}
        />
        <TotalCard
          label="Comida Cami"
          value={comidaCami}
          onChange={setComidaCami}
          styles={styles}
        />
        <TotalCard
          label="Extras"
          value={extras}
          onChange={setExtras}
          styles={styles}
        />
        <TotalCard
          label="Dólares"
          value={dolares}
          onChange={setDolares}
          styles={styles}
        />
      </View>

      {/* Billeteras */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Billeteras:</Text>
        <WalletCard
          icon={
            <FontAwesome5
              name="money-bill-wave"
              size={22}
              color="#4caf50"
              style={{ marginRight: 10 }}
            />
          }
          label="Efectivo"
          value={efectivo}
          onChange={setEfectivo}
          styles={styles}
        />
        <WalletCard
          icon={
            <MaterialCommunityIcons
              name="credit-card"
              size={22}
              color="#1976d2"
              style={{ marginRight: 10 }}
            />
          }
          label="Mercado Pago"
          value={mp}
          onChange={setMp}
          styles={styles}
        />
        <WalletCard
          icon={
            <MaterialCommunityIcons
              name="cellphone"
              size={22}
              color="#ff9800"
              style={{ marginRight: 10 }}
            />
          }
          label="Personal Pay"
          value={personalPay}
          onChange={setPersonalPay}
          styles={styles}
        />
        <WalletCard
          icon={
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={22}
              color="#512da8"
              style={{ marginRight: 10 }}
            />
          }
          label="Ualá"
          value={uala}
          onChange={setUala}
          styles={styles}
        />
        <WalletCard
          icon={
            <MaterialCommunityIcons
              name="star-four-points"
              size={22}
              color="#e040fb"
              style={{ marginRight: 10 }}
            />
          }
          label="Astropay"
          value={astropay}
          onChange={setAstropay}
          styles={styles}
        />
      </View>

      {/* Plata que me deben */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Plata que me deben:</Text>
        {deudas.map((d, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardText}>
              {d.descripcion} - ${d.monto} ({d.persona}, {d.origen})
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
        {transacciones.map((t, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardText}>
              {t.descripcion} - ${t.monto} ({t.persona}, {t.origen})
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
        ))}
      </View>
    </ScrollView>
  );
}
