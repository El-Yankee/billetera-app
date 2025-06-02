import { createContext, useContext, useState } from "react";

const TransaccionesContext = createContext<any>(null);

export function TransaccionesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const [deudas, setDeudas] = useState<any[]>([]);

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
      }}
    >
      {children}
    </TransaccionesContext.Provider>
  );
}

export function useTransacciones() {
  return useContext(TransaccionesContext);
}
