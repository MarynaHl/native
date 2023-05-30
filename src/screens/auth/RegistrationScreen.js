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
  Image,
} from "react-native";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { storage } from "../../../firebase/config";

import { authSignUpUser } from "../../../redux/auth/authOperations";

const image = "../../../assets/images/bg.jpg";
const initialState = { login: "", email: "", password: "", avatar: "" };

const RegistrationScreen = ({ navigation }) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [hidePassword, setHidePassword] = useState(true);
  const [focused, setFocused] = useState("");

  const { login, email, password, avatar } = state;

  const dispatch = useDispatch();

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setUserPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadAvatarToServer = async () => {
    try {
      const response = await fetch(userPhoto);
      const file = await response.blob();
      const uniqueAvatarId = Date.now().toString();

      const storageRef = ref(storage, `avatar/${uniqueAvatarId}`);
      const result = await uploadBytesResumable(storageRef, file);
      const processedPhoto = await getDownloadURL(storageRef);

      return processedPhoto;
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearAvatar = () => {
    setUserPhoto(null);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    keyboardHide();
    if (login === "" || email === "" || password === "") {
      alert("Всі поля повинні бути заповнені!");
      return;
    }

    if (userPhoto) {
      const avatar = await uploadAvatarToServer();
      // console.log("avatar: ", avatar);
      setState((prevState) => ({
        ...prevState,
        avatar,
      }));

      dispatch(authSignUpUser({ login, email, password, avatar }));
      setState(initialState);
      return;
    } else {
      dispatch(authSignUpUser(state));
      setState(initialState);
    }
  };
  // console.log(state);
  return (
    <ImageBackground source={require(image)} style={styles.imgBg}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.registrationContainer}>
            <View style={styles.avatarBox}>
              <View style={styles.avatar}>
                {userPhoto && (
                  <Image
                    source={{ uri: userPhoto }}
                    style={{ width: 120, height: 120, borderRadius: 16 }}
                  />
                )}

                {!userPhoto ? (
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 81,
                      right: -12,
                    }}
                    onPress={pickImage}
                  >
                    <AntDesign
                      name={"pluscircleo"}
                      size={25}
                      color={"#FF6C00"}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 81,
                      right: -12,
                    }}
                    onPress={clearAvatar}
                  >
                    <AntDesign
                      name={"closecircleo"}
                      size={25}
                      color={"#BDBDBD"}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.form}>
              <View>
                <TextInput
                  value={login}
                  placeholder={"Логін"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused("login");
                  }}
                  selectionColor={"#FF6C00"}
                  onBlur={() => setFocused("")}
                  style={{
                    ...styles.input,
                    backgroundColor:
                      focused === "login" ? "#ffffff" : "#F6F6F6",
                    borderColor: focused === "login" ? "#FF6C00" : "#E8E8E8",
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
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
                  <Text style={styles.btnTitle}>Зареєструватися</Text>
                </TouchableOpacity>
              )}
            </View>
            {!isShowKeyboard && (
              <View style={styles.textWrapper}>
                <Text style={styles.text}>Вже є акаунт? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text style={styles.text}>Увійти</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegistrationScreen;

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
  avatarBox: {
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -60,
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  title: {
    marginTop: 92,
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
    marginBottom: 78,
  },
  text: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
  },
});
