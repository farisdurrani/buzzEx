import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ItemPriceScreen from "../screens/ItemPriceScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import TakePictureScreen from "../screens/TakePictureScreen";
import HomeScreen from "../screens/HomeScreen";
import ContactScreen  from "../screens/ContactScreen";
import Contacts  from "../screens/Contacts";
import FindDelivererScreen  from "../screens/FindDelivererScreen";
import BuyerAcceptScreen  from "../screens/BuyerAcceptScreen";
import CancelScreen  from "../screens/CancelScreen";
import DelivererToPickup  from "../screens/DelivererToPickup";
import DeliveryComplete  from "../screens/DeliveryComplete";
import DelivererToDropoff  from "../screens/DelivererToDropoff";
import MatchingDeliverer  from "../screens/MatchingDeliverer";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ItemPrice"
          component={ItemPriceScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TakePicture"
          component={TakePictureScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Contacts"
          component={ContactScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Contactstemp"
          component={Contacts}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="FindDelivererScreen"
          component={FindDelivererScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BuyerAcceptScreen"
          component={BuyerAcceptScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CancelScreen"
          component={CancelScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DelivererToPickup"
          component={DelivererToPickup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DeliveryComplete"
          component={DeliveryComplete}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DelivererToDropoff"
          component={DelivererToDropoff}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MatchingDeliverer"
          component={MatchingDeliverer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
