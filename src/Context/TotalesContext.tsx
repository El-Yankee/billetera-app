import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Total = { id: number; label: string; value: number };

type TotalesContextType = {
  totales: Total[];
  setTotales: React.Dispatch<React.SetStateAction<Total[]>>;
};

const TotalesContext = createContext<TotalesContextType | undefined>(undefined);

const totalesIniciales: Total[] = [{ id: 1, label: "Plata", value: 0 }];

export const TotalesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [totales, setTotales] = useState<Total[]>(totalesIniciales);

  // Cargar totales al iniciar con manejo de errores
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("totales");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setTotales(parsed);
          } else {
            setTotales(totalesIniciales);
          }
        }
      } catch (e) {
        setTotales(totalesIniciales);
      }
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
