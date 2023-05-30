import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";

const Stack = createStackNavigator();

export const authRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};
