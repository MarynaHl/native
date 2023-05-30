import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { AntDesign } from "@expo/vector-icons";

import DefaultPostsScreen from "../nested/DefaultPostsScreen";

const NestedStack = createStackNavigator();

const PostsScreen = ({ navigation: { goBack } }) => {
  return (
    <NestedStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { height: 88 },
        headerTitleStyle: { fontSize: 17, color: "#212121" },
      }}
    >
      <NestedStack.Screen
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => goBack()}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        }}
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
      />
    </NestedStack.Navigator>
  );
};

export default PostsScreen;
