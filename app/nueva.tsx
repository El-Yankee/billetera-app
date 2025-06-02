import {
  Text,
  TextInput,
  View,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useTransacciones } from "../context/TransaccionesContext";
import { useRouter } from "expo-router";
import { useTheme } from "./styles/useTheme";
import { createStyles } from "./styles/indexStyles";
import { Picker } from "@react-native-picker/picker";
import { Pressable } from "react-native";

const billeteras = [
  { label: "Efectivo", value: "efectivo" },
  { label: "Mercado Pago", value: "mp" },
  { label: "Personal Pay", value: "personalpay" },
  { label: "Ualá", value: "uala" },
  { label: "Astropay", value: "astropay" },
];

export const unstable_settings = {
  headerShown: true,
  headerTitle: "Nueva transacción",
  headerStyle: {
    backgroundColor: "#181a20",
  },
  headerTitleStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  headerTintColor: "#fff",
};

export default function NuevaTransaccion() {
  const router = useRouter();
  const theme = useTheme();
  const styles = createStyles(theme);

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [persona, setPersona] = useState("mio");
  const [origen, setOrigen] = useState("mp");
  const [esDeuda, setEsDeuda] = useState(false);
  const { agregar, agregarDeuda } = useTransacciones();

  const guardarTransaccion = () => {
    if (!descripcion || !monto) {
      Alert.alert("Faltan datos", "Completá la descripción y el monto.");
      return;
    }

    const nueva = {
      descripcion,
      monto: parseFloat(monto),
      persona,
      origen,
    };

    if (esDeuda) {
      agregarDeuda(nueva);
      Alert.alert("Guardado", "Deuda agregada correctamente");
    } else {
      agregar(nueva);
      Alert.alert("Guardado", "Transacción agregada correctamente");
    }

    setDescripcion("");
    setMonto("");
    setEsDeuda(false);

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.card, { marginTop: 24 }]}>
        <Text style={styles.title}>➕ Nueva transacción</Text>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Ej: panadería, carga SUBE..."
          placeholderTextColor={theme.inputBorder}
        />

        <Text style={styles.label}>Monto</Text>
        <TextInput
          style={styles.input}
          value={monto}
          onChangeText={setMonto}
          placeholder="Ej: 1200"
          keyboardType="numeric"
          placeholderTextColor={theme.inputBorder}
        />

        <Text style={styles.label}>¿De quién es?</Text>
        <TextInput
          style={styles.input}
          value={persona}
          onChangeText={setPersona}
          placeholder="mio / hermana"
          placeholderTextColor={theme.inputBorder}
        />

        <Text style={styles.label}>¿Desde qué billetera?</Text>
        <View style={[styles.input, { padding: 0, marginBottom: 16 }]}>
          <Picker
            selectedValue={origen}
            onValueChange={setOrigen}
            style={{ color: theme.text, backgroundColor: "transparent" }}
            dropdownIconColor={theme.text}
          >
            {billeteras.map((b) => (
              <Picker.Item key={b.value} label={b.label} value={b.value} />
            ))}
          </Picker>
        </View>

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

        <Pressable style={styles.button} onPress={guardarTransaccion}>
          <Text style={styles.buttonText}>Guardar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
