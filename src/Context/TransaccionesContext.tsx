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

  // Cargar datos al iniciar
  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("transacciones");
      const d = await AsyncStorage.getItem("deudas");
      if (t) setTransacciones(JSON.parse(t));
      if (d) setDeudas(JSON.parse(d));
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

  // NUEVO: función para eliminar transacción
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
        eliminarTransaccion, // <-- agrega aquí
        setDeudas, // <-- agrega aquí si necesitas modificar deudas desde otros componentes
        setTransacciones, // <-- agrega aquí si necesitas modificar transacciones desde otros componentes
      }}
    >
      {children}
    </TransaccionesContext.Provider>
  );
}

export function useTransacciones() {
  return useContext(TransaccionesContext);
}
