import {
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useTransacciones } from "../Context/TransaccionesContext";
import { Picker } from "@react-native-picker/picker";
import { Pressable } from "react-native";
import { useHomeTotales } from "../Context/TotalesContext";
import { useBilleteras } from "../Context/BilleterasContext";

export default function DetailsScreen({ navigation }: any) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [esDeuda, setEsDeuda] = useState(false);
  const { agregar, agregarDeuda } = useTransacciones();
  const { totales } = useHomeTotales(); // O trae los totales como corresponda
  const [total, setTotal] = useState(totales[0]?.id ?? 0); // <-- número, no string
  const { billeteras } = useBilleteras();
  const [origen, setOrigen] = useState(billeteras[0]?.label ?? "");

  const guardarTransaccion = () => {
    if (!descripcion || !monto) {
      Alert.alert("Faltan datos", "Completá la descripción y el monto.");
      return;
    }

    const nueva = {
      descripcion,
      monto: parseFloat(monto),
      totalId: total, // <-- usa total como id
      origen,
    };

    if (esDeuda) {
      agregarDeuda(nueva);
    } else {
      agregar(nueva);
    }

    setDescripcion("");
    setMonto("");
    setEsDeuda(false);

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.container,
          { flexGrow: 1, justifyContent: "flex-start" },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.card, { marginTop: 24 }]}>
          <Text style={styles.title}>➕ Nueva transacción</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
              marginTop: 4,
            }}
          >
            <Text style={[styles.label, { marginRight: 12 }]}>
              ¿Es una deuda?
            </Text>
            <Switch value={esDeuda} onValueChange={setEsDeuda} />
          </View>

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Ej: panadería, carga SUBE..."
            placeholderTextColor={"#aaa"}
          />

          <Text style={styles.label}>Monto</Text>
          <TextInput
            style={styles.input}
            value={monto}
            onChangeText={setMonto}
            placeholder="Ej: 1200"
            keyboardType="numeric"
            placeholderTextColor={"#aaa"}
          />

          {!esDeuda && (
            <>
              <Text style={styles.label}>¿De qué total?</Text>
              <View style={[styles.input, { padding: 0, marginBottom: 16 }]}>
                <Picker
                  selectedValue={total}
                  onValueChange={(value: any) => setTotal(Number(value))}
                  style={{ color: "#000", backgroundColor: "transparent" }}
                  dropdownIconColor={"#000"}
                >
                  {totales.map((t) => (
                    <Picker.Item key={t.id} label={t.label} value={t.id} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>¿Desde qué billetera?</Text>
              <View style={[styles.input, { padding: 0, marginBottom: 16 }]}>
                <Picker
                  selectedValue={origen}
                  onValueChange={setOrigen}
                  style={{ backgroundColor: "transparent" }}
                  dropdownIconColor={"#000"}
                >
                  {billeteras.map((b) => (
                    <Picker.Item key={b.id} label={b.label} value={b.label} />
                  ))}
                </Picker>
              </View>
            </>
          )}

          <Pressable style={styles.button} onPress={guardarTransaccion}>
            <Text style={styles.buttonText}>Guardar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
