import "react-native-gesture-handler";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { authRoute } from "../authRoute";

import { authStateChangeUser } from "../../redux/auth/authOperations";

import NestedComponent from "./NestedComponent";

const MainComponent = () => {
  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <View style={styles.container} onLayout={onLayoutRootView}>
        {!stateChange ? authRoute() : <NestedComponent />}
      </View>
    </NavigationContainer>
  );
};

export default MainComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
