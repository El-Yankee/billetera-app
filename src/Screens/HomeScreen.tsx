import React from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useHomeTotales } from "../Context/TotalesContext";
import { useBilleteras } from "../Context/BilleterasContext";
import { useTransacciones } from "../Context/TransaccionesContext";
import { Colors } from "../Utils/Colors";
import { TotalesSection } from "../Components/TotalesSection";
import { BilleterasSection } from "../Components/BilleterasSection";
import { DeudasSection } from "../Components/DeudasSection";
import { TransaccionesSection } from "../Components/TransaccionesSection";
import { NotasSection } from "../Components/NotasSection";

export default function HomeScreen({ navigation }: any) {
  const { totales, setTotales } = useHomeTotales();
  const { billeteras, setBilleteras } = useBilleteras();
  const { transacciones, deudas, eliminarDeuda, eliminarTransaccion } =
    useTransacciones();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumen de saldos</Text>

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
      <TotalesSection
        totales={totales}
        setTotales={setTotales}
        styles={styles}
      />

      {/* Billeteras */}
      <BilleterasSection
        billeteras={billeteras}
        setBilleteras={setBilleteras}
        styles={styles}
      />

      {/* Plata que me deben */}
      <DeudasSection
        deudas={deudas}
        eliminarDeuda={eliminarDeuda}
        styles={styles}
      />

      {/* Transacciones realizadas */}
      <TransaccionesSection
        transacciones={transacciones}
        totales={totales}
        billeteras={billeteras}
        setTotales={setTotales}
        setBilleteras={setBilleteras}
        eliminarTransaccion={eliminarTransaccion}
        styles={styles}
      />

      {/* Notas */}
      <NotasSection styles={styles} />
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
  button: {
    backgroundColor: Colors.buttonBg,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: Colors.buttonText,
    fontWeight: "bold",
    fontSize: 16,
  },
});
