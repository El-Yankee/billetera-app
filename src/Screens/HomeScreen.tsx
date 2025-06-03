import React from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { WalletCard } from "../Components/WalletCard";
import { TotalCard } from "../Components/TotalCard";
import { useHomeTotales } from "../Context/TotalesContext";
import { useBilleteras } from "../Context/BilleterasContext";
import { useTransacciones } from "../Context/TransaccionesContext";
import { Colors } from "../Utils/Colors";

export default function HomeScreen({ navigation }: any) {
  const { totales, setTotales } = useHomeTotales();
  const { billeteras, setBilleteras } = useBilleteras();
  const { transacciones, deudas, eliminarDeuda, eliminarTransaccion } =
    useTransacciones();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💰 Resumen de saldos</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Details")}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
            color: Colors.buttonText,
          }}
        >
          Agregar nueva transacción
        </Text>
      </TouchableOpacity>

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
          <TouchableOpacity
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
          </TouchableOpacity>
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
          <TouchableOpacity
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
          </TouchableOpacity>
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
        {deudas.map((d: any, i: any) => (
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

      {/* Transacciones realizadas */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Transacciones realizadas:</Text>
        {transacciones.map((t: any, i: any) => {
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

      {/* Notas */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Notas:</Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: "transparent" }]}
          placeholder="Escribe una nota..."
          placeholderTextColor={"#aaa"}
          multiline
          numberOfLines={5}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  section: {
    marginTop: 16,
    marginBottom: 16,
  },
  subtitle: {
    color: Colors.subtitle,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  card: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 8,
  },
  cardText: {
    color: Colors.text,
    fontSize: 16,
  },
  textInput: {
    color: Colors.text,
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonLink: {
    color: Colors.textBlue,
    backgroundColor: Colors.buttonBg,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.buttonText,
  },
  button: {
    color: Colors.buttonText,
    backgroundColor: Colors.buttonBg,
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});
