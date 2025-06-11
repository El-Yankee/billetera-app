import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Total = { id: number; label: string; value: number };

type TotalesContextType = {
  totales: Total[];
  setTotales: React.Dispatch<React.SetStateAction<Total[]>>;
};

const TotalesContext = createContext<TotalesContextType | undefined>(undefined);

export const TotalesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [totales, setTotales] = useState<Total[]>([
    { id: 1, label: "Comida Santi", value: 0 },
    { id: 2, label: "Comida Cami", value: 0 },
    { id: 3, label: "Extras", value: 0 },
    { id: 4, label: "Dólares", value: 0 },
  ]);

  // Cargar totales al iniciar
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("totales");
      if (saved) setTotales(JSON.parse(saved));
    })();
  }, []);

  // Guardar totales cuando cambian
  useEffect(() => {
    AsyncStorage.setItem("totales", JSON.stringify(totales));
  }, [totales]);

  return (
    <TotalesContext.Provider value={{ totales, setTotales }}>
      {children}
    </TotalesContext.Provider>
  );
};

export const useHomeTotales = () => {
  const ctx = useContext(TotalesContext);
  if (!ctx)
    throw new Error("useHomeTotales debe usarse dentro de TotalesProvider");
  return ctx;
};
