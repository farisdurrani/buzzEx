import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  // BobBuyer
  BuyerAcceptScreen,
  MatchingDeliverer,
  PaymentScreen,
  // DanTheDeliverer
  ConfirmDelivery,
  ConfirmPickup,
  DeliveriesAvailable,
  DropoffAt,
  DropoffPackage,
  PickupPackage,
  PickupScreen,
  PictureDropoff,
  // SamTheSeller
  Contacts,
  ItemPriceScreen,
  SellerAwaitingScreen,
  SellerConfirmScreen,
  SizeSelection,
  // login
  LoginScreen,
  RegistrationScreen,
  // deliveryMaps
  DelivererToDropoff,
  DelivererToPickup,
  DeliveryComplete,
  Accepted,
  // common
  CancellationScreen,
  HomeScreen,
  MapScreen,
  TakePictureScreen,
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
          name="SizeSelection"
          component={SizeSelection}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SellerAwaiting"
          component={SellerAwaitingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Accepted"
          component={Accepted}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DeliveriesAvailable"
          component={DeliveriesAvailable}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PickupScreen"
          component={PickupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Cancellation"
          component={CancellationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BuyerAccept"
          component={BuyerAcceptScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Payment"
          component={PaymentScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DelivererToDropoff"
          component={DelivererToDropoff}
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
          name="MatchingDeliverer"
          component={MatchingDeliverer}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ConfirmDelivery"
          component={ConfirmDelivery}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ConfirmPickup"
          component={ConfirmPickup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DropoffAt"
          component={DropoffAt}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DropoffPackage"
          component={DropoffPackage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PictureDropoff"
          component={PictureDropoff}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PickupPackage"
          component={PickupPackage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
