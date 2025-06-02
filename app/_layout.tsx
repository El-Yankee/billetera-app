import { Stack } from "expo-router";
import { TransaccionesProvider } from "../context/TransaccionesContext";

export default function Layout() {
  return (
    <TransaccionesProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Oculto por defecto
          animation: "slide_from_right", // Animación moderna y fluida
        }}
      >
        {/* Puedes definir opciones específicas por pantalla aquí si quieres */}
      </Stack>
    </TransaccionesProvider>
  );
}
