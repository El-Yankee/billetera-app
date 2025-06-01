import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "index") iconName = "home";
          else if (route.name === "nueva") iconName = "add-circle";
          else if (route.name === "historial") iconName = "time";

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="nueva" options={{ title: "Nueva" }} />
      <Tabs.Screen name="historial" options={{ title: "Historial" }} />
    </Tabs>
  );
}
