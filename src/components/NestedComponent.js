import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/main/HomeScreen";
import CommentsScreen from "../screens/nested/CommentsScreen";
import MapScreen from "../screens/nested/MapScreen";

const Stack = createStackNavigator();

const NestedComponent = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        }}
        name="Коментарі"
        component={CommentsScreen}
      />
      <Stack.Screen
        options={{
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        }}
        name="Карта"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

export default NestedComponent;
