import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

// import { useUser } from "../../../userContext";

import { authSignInUser } from "../../../redux/auth/authOperations";

const image = "../../../assets/images/bg.jpg";
const initialState = { email: "", password: "" };

const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [hidePassword, setHidePassword] = useState(true);
  const [focused, setFocused] = useState("");

  const { email, password } = state;

  // const { logIn } = useUser();

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    // Keyboard.dismiss();
    // setIsShowKeyboard(false);
    keyboardHide();
    if (email === "" || password === "") {
      alert("Всі поля повинні бути заповнені!");
      return;
    }

    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <ImageBackground source={require(image)} style={styles.imgBg}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.registrationContainer}>
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.form}>
              <View>
                <TextInput
                  value={email}
                  placeholder={"Адреса електронної пошти"}
                  placeholderTextColor={"#BDBDBD"}
                  inputMode={"email"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused("email");
                  }}
                  selectionColor={"#FF6C00"}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  onBlur={() => setFocused("")}
                  style={{
                    ...styles.input,
                    backgroundColor:
                      focused === "email" ? "#ffffff" : "#F6F6F6",
                    borderColor: focused === "email" ? "#FF6C00" : "#E8E8E8",
                  }}
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  value={password}
                  secureTextEntry={hidePassword}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused("password");
                  }}
                  selectionColor={"#FF6C00"}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  onBlur={() => setFocused("")}
                  style={{
                    ...styles.input,
                    marginBottom: isShowKeyboard ? 32 : 0,
                    backgroundColor:
                      focused === "password" ? "#ffffff" : "#F6F6F6",
                    borderColor: focused === "password" ? "#FF6C00" : "#E8E8E8",
                  }}
                />
                <Ionicons
                  onPress={() => setHidePassword(!hidePassword)}
                  name={hidePassword ? "md-eye-off" : "md-eye"}
                  size={30}
                  color={"#000000"}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 16,
                    color: "#808080",
                  }}
                />
              </View>
              {!isShowKeyboard && (
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnTitle}>Увійти</Text>
                </TouchableOpacity>
              )}
            </View>
            {!isShowKeyboard && (
              <View style={styles.textWrapper}>
                <Text style={styles.text}>Немає акаунту? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("RegistrationScreen")}
                >
                  <Text style={styles.text}>Зареєструватися</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imgBg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  registrationContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    marginTop: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
    lineHeight: 35,
    letterSpacing: 0.01,
  },
  form: {
    marginTop: 32,
    marginHorizontal: 16,
  },

  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingLeft: 16,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    color: "#212121",
  },
  btn: {
    marginTop: 43,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    color: "#f0f8ff",
    fontSize: 16,
    lineHeight: 19,
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 144,
  },
  text: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
  },
});
