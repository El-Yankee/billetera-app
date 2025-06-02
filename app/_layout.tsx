import { Stack } from "expo-router";
import { TransaccionesProvider } from "../context/TransaccionesContext";
import { TotalesProvider } from "../context/TotalesContext";

export default function Layout() {
  return (
    <TransaccionesProvider>
      <TotalesProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </TotalesProvider>
    </TransaccionesProvider>
  );
}
