import { Stack } from "expo-router";
import { TransaccionesProvider } from "../context/TransaccionesContext";
import { TotalesProvider } from "../context/TotalesContext";
import { BilleterasProvider } from "../context/BilleterasContext";

export default function Layout() {
  return (
    <TransaccionesProvider>
      <TotalesProvider>
        <BilleterasProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </BilleterasProvider>
      </TotalesProvider>
    </TransaccionesProvider>
  );
}
