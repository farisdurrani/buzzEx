import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginScreen,
  ItemPriceScreen,
  RegistrationScreen,
  TakePictureScreen,
  HomeScreen,
  ContactScreen,
  MapScreen,
  SellerConfirmScreen,
  SellerAwaitingScreen,
  SellerAcceptedScreen,
  Contacts,
  DeliveriesAvailable,
  CancellationScreen,
} from "../screens/index";

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
          component={Contacts}
        />
        {/* Temporary Screen for Map Demo */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Map"
          component={MapScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SellerConfirm"
          component={SellerConfirmScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SellerAwaiting"
          component={SellerAwaitingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SellerAccepted"
          component={SellerAcceptedScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Deliverer"
          component={DeliveriesAvailable}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Cancellation"
          component={CancellationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
