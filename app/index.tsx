import { ScrollView, Text, View, TextInput } from "react-native";
import { Link } from "expo-router";
import { useTransacciones } from "../context/TransaccionesContext";
import { Pressable } from "react-native";
import { useState } from "react";
import { useTheme } from "./styles/useTheme";
import { createStyles } from "./styles/indexStyles";

export default function HomeScreen() {
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

      <Link href="/nueva" style={styles.buttonLink}>
        ➕ Agregar nueva transacción
      </Link>

      {/* Totales */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Totales:</Text>
        <View style={styles.card}>
          {editComidaSanti ? (
            <>
              <TextInput
                style={styles.input}
                value={comidaSanti.toString()}
                onChangeText={(v) => setComidaSanti(Number(v))}
                keyboardType="numeric"
              />
              <Pressable
                onPress={() => setEditComidaSanti(false)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#4CAF50" }}>Guardar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>Comida Santi: ${comidaSanti}</Text>
              <Pressable
                onPress={() => setEditComidaSanti(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#2196F3" }}>Editar</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.card}>
          {editComidaCami ? (
            <>
              <TextInput
                style={styles.input}
                value={comidaCami.toString()}
                onChangeText={(v) => setComidaCami(Number(v))}
                keyboardType="numeric"
              />
              <Pressable
                onPress={() => setEditComidaCami(false)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#4CAF50" }}>Guardar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>Comida Cami: ${comidaCami}</Text>
              <Pressable
                onPress={() => setEditComidaCami(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#2196F3" }}>Editar</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.card}>
          {editExtras ? (
            <>
              <TextInput
                style={styles.input}
                value={extras.toString()}
                onChangeText={(v) => setExtras(Number(v))}
                keyboardType="numeric"
              />
              <Pressable
                onPress={() => setEditExtras(false)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#4CAF50" }}>Guardar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>Extras: ${extras}</Text>
              <Pressable
                onPress={() => setEditExtras(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#2196F3" }}>Editar</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.card}>
          {editDolares ? (
            <>
              <TextInput
                style={styles.input}
                value={dolares.toString()}
                onChangeText={(v) => setDolares(Number(v))}
                keyboardType="numeric"
              />
              <Pressable
                onPress={() => setEditDolares(false)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#4CAF50" }}>Guardar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>Dólares: ${dolares}</Text>
              <Pressable
                onPress={() => setEditDolares(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#2196F3" }}>Editar</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>

      {/* Billeteras */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Billeteras:</Text>
        <View style={styles.card}>
          {editEfectivo ? (
            <>
              <TextInput
                style={styles.input}
                value={efectivo.toString()}
                onChangeText={(v) => setEfectivo(Number(v))}
                keyboardType="numeric"
              />
              <Pressable
                onPress={() => setEditEfectivo(false)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#4CAF50" }}>Guardar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>Efectivo: ${efectivo}</Text>
              <Pressable
                onPress={() => setEditEfectivo(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#2196F3" }}>Editar</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.card}>
          {editMp ? (
            <>
              <TextInput
                style={styles.input}
                value={mp.toString()}
                onChangeText={(v) => setMp(Number(v))}
                keyboardType="numeric"
              />
              <Pressable
                onPress={() => setEditMp(false)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#4CAF50" }}>Guardar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>Mercado Pago: ${mp}</Text>
              <Pressable
                onPress={() => setEditMp(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#2196F3" }}>Editar</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.card}>
          {editPersonalPay ? (
            <>
              <TextInput
                style={styles.input}
                value={personalPay.toString()}
                onChangeText={(v) => setPersonalPay(Number(v))}
                keyboardType="numeric"
              />
              <Pressable
                onPress={() => setEditPersonalPay(false)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#4CAF50" }}>Guardar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>Personal Pay: ${personalPay}</Text>
              <Pressable
                onPress={() => setEditPersonalPay(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#2196F3" }}>Editar</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.card}>
          {editUala ? (
            <>
              <TextInput
                style={styles.input}
                value={uala.toString()}
                onChangeText={(v) => setUala(Number(v))}
                keyboardType="numeric"
              />
              <Pressable
                onPress={() => setEditUala(false)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#4CAF50" }}>Guardar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>Ualá: ${uala}</Text>
              <Pressable
                onPress={() => setEditUala(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#2196F3" }}>Editar</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.card}>
          {editAstropay ? (
            <>
              <TextInput
                style={styles.input}
                value={astropay.toString()}
                onChangeText={(v) => setAstropay(Number(v))}
                keyboardType="numeric"
              />
              <Pressable
                onPress={() => setEditAstropay(false)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#4CAF50" }}>Guardar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>Astropay: ${astropay}</Text>
              <Pressable
                onPress={() => setEditAstropay(true)}
                style={{ marginLeft: 8 }}
              >
                <Text style={{ color: "#2196F3" }}>Editar</Text>
              </Pressable>
            </>
          )}
        </View>
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
