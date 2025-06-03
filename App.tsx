import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/Navigation/StackNavigator";
import { TransaccionesProvider } from "./src/Context/TransaccionesContext";
import { TotalesProvider } from "./src/Context/TotalesContext";
import { BilleterasProvider } from "./src/Context/BilleterasContext";

export default function App() {
  return (
    <TransaccionesProvider>
      <TotalesProvider>
        <BilleterasProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </BilleterasProvider>
      </TotalesProvider>
    </TransaccionesProvider>
  );
}
