import { Text, TextInput, View, Button, Alert, Switch } from "react-native";
import { styles } from "./styles/nuevaStyles";
import { useState } from "react";
import { useTransacciones } from "../context/TransaccionesContext";

export default function NuevaTransaccion() {
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Nueva transacción</Text>

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Ej: panadería, carga SUBE..."
      />

      <Text style={styles.label}>Monto</Text>
      <TextInput
        style={styles.input}
        value={monto}
        onChangeText={setMonto}
        placeholder="Ej: 1200"
        keyboardType="numeric"
      />

      <Text style={styles.label}>¿De quién es?</Text>
      <TextInput
        style={styles.input}
        value={persona}
        onChangeText={setPersona}
        placeholder="mio / hermana"
      />

      <Text style={styles.label}>¿Desde qué billetera?</Text>
      <TextInput
        style={styles.input}
        value={origen}
        onChangeText={setOrigen}
        placeholder="Ej: mp, uala"
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={styles.label}>¿Es una deuda?</Text>
        <Switch value={esDeuda} onValueChange={setEsDeuda} />
      </View>

      <Button title="Guardar" onPress={guardarTransaccion} />
    </View>
  );
}
