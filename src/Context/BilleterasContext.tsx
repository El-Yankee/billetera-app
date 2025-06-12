import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Billetera = {
  id: number;
  label: string;
  value: number;
};

type BilleterasContextType = {
  billeteras: Billetera[];
  setBilleteras: React.Dispatch<React.SetStateAction<Billetera[]>>;
};

const BilleterasContext = createContext<BilleterasContextType | undefined>(
  undefined
);

const billeterasIniciales: Billetera[] = [
  { id: 1, label: "Efectivo", value: 0 },
  { id: 2, label: "Mercado Pago", value: 0 },
  { id: 3, label: "Personal Pay", value: 0 },
  { id: 4, label: "Ualá", value: 0 },
  { id: 5, label: "Astropay", value: 0 },
  // ...agrega las demás billeteras iniciales aquí...
];

export const BilleterasProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [billeteras, setBilleteras] =
    useState<Billetera[]>(billeterasIniciales);

  // Cargar billeteras al iniciar
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("billeteras");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setBilleteras(parsed);
          } else {
            setBilleteras(billeterasIniciales);
          }
        }
      } catch (e) {
        setBilleteras(billeterasIniciales);
      }
    })();
  }, []);

  // Guardar billeteras cuando cambian
  useEffect(() => {
    AsyncStorage.setItem("billeteras", JSON.stringify(billeteras));
  }, [billeteras]);

  return (
    <BilleterasContext.Provider value={{ billeteras, setBilleteras }}>
      {children}
    </BilleterasContext.Provider>
  );
};

export const useBilleteras = () => {
  const ctx = useContext(BilleterasContext);
  if (!ctx)
    throw new Error("useBilleteras debe usarse dentro de BilleterasProvider");
  return ctx;
};
