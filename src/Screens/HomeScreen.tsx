import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView, // Agrega esto
  Platform, // Agrega esto
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useHomeTotales } from "../Context/TotalesContext";
import { useBilleteras } from "../Context/BilleterasContext";
import { useTransacciones } from "../Context/TransaccionesContext";
import { TotalesSection } from "../Components/TotalesSection";
import { BilleterasSection } from "../Components/BilleterasSection";
import { DeudasSection } from "../Components/DeudasSection";
import { TransaccionesSection } from "../Components/TransaccionesSection";
import { NotesSection } from "../Components/NotesSection";
import { Colors } from "../Utils/Colors";

export default function HomeScreen({ navigation }: any) {
  const { totales, setTotales } = useHomeTotales();
  const { billeteras, setBilleteras } = useBilleteras();
  const {
    transacciones,
    deudas,
    eliminarDeuda,
    eliminarTransaccion,
    setDeudas,
    setTransacciones,
  } = useTransacciones();

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
      enableOnAndroid={true}
      extraScrollHeight={300}
      keyboardShouldPersistTaps="handled"
    >
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
        setDeudas={setDeudas}
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
        setTransacciones={setTransacciones}
      />

      {/* Notas */}
      <NotesSection styles={styles} />
    </KeyboardAwareScrollView>
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
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 16,
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
  label: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 12,
    textAlign: "left",
    marginLeft: 4,
  },
  input: {
    color: Colors.text,
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  picker: {
    color: Colors.text,
    backgroundColor: Colors.inputBg,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    padding: 2,
    height: 50, // Ajusta la altura del Picker
  },
});
