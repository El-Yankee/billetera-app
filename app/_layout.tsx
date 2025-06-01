import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TransaccionesProvider } from "../context/TransaccionesContext";

export default function Layout() {
  return (
    <TransaccionesProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "index") iconName = "home";
            else if (route.name === "nueva") iconName = "add-circle";

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Inicio" }} />
        <Tabs.Screen name="nueva" options={{ title: "Nueva" }} />
      </Tabs>
    </TransaccionesProvider>
  );
}
