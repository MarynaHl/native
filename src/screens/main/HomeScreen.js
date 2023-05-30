import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { authSignOutUser } from "../../../redux/auth/authOperations";

const MainTab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const dispatch = useDispatch();

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarStyle: { height: 83 },
        headerTitleAlign: "center",
        headerStyle: { height: 88 },
        headerTitleStyle: { fontSize: 17, color: "#212121" },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarItemStyle: {
            marginLeft: 82,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => {
                dispatch(authSignOutUser());
              }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
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
          tabBarItemStyle: {
            borderRadius: 20,
            backgroundColor: "#FF6C00",
            width: 70,
            height: 40,
            marginTop: 9,
            marginBottom: "auto",
            marginLeft: 31,
            marginRight: 31,
            paddingHorizontal: 28.5,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="plus" size={size} color="#ffffff" />
          ),
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarItemStyle: {
            marginRight: 82,
          },
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;
