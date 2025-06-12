import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect } from "react";

const TransaccionesContext = createContext<any>(null);

export function TransaccionesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const [deudas, setDeudas] = useState<any[]>([]);

  // Cargar datos al iniciar con manejo de errores
  useEffect(() => {
    (async () => {
      try {
        const t = await AsyncStorage.getItem("transacciones");
        if (t) {
          const parsedT = JSON.parse(t);
          if (Array.isArray(parsedT)) {
            setTransacciones(parsedT);
          } else {
            setTransacciones([]);
          }
        }
      } catch (e) {
        setTransacciones([]);
      }
      try {
        const d = await AsyncStorage.getItem("deudas");
        if (d) {
          const parsedD = JSON.parse(d);
          if (Array.isArray(parsedD)) {
            setDeudas(parsedD);
          } else {
            setDeudas([]);
          }
        }
      } catch (e) {
        setDeudas([]);
      }
    })();
  }, []);

  // Guardar datos cuando cambian
  useEffect(() => {
    AsyncStorage.setItem("transacciones", JSON.stringify(transacciones));
  }, [transacciones]);

  useEffect(() => {
    AsyncStorage.setItem("deudas", JSON.stringify(deudas));
  }, [deudas]);

  const agregar = (transaccion: any) =>
    setTransacciones((prev) => [transaccion, ...prev]);
  const agregarDeuda = (deuda: any) => setDeudas((prev) => [deuda, ...prev]);
  const eliminarDeuda = (index: number) => {
    setDeudas((prev) => prev.filter((_, i) => i !== index));
  };
  const eliminarTransaccion = (index: number) => {
    setTransacciones((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <TransaccionesContext.Provider
      value={{
        transacciones,
        agregar,
        deudas,
        agregarDeuda,
        eliminarDeuda,
        eliminarTransaccion,
        setDeudas,
        setTransacciones,
      }}
    >
      {children}
    </TransaccionesContext.Provider>
  );
}

export function useTransacciones() {
  return useContext(TransaccionesContext);
}
