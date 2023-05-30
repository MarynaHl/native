import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { AntDesign, Feather } from "@expo/vector-icons";

import { db } from "../../../firebase/config";

import ProfilePostList from "../../components/ProfilePostList";

const image = "../../../assets/images/bg.jpg";

import { authSignOutUser } from "../../../redux/auth/authOperations";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { nickname, userId, avatar } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    const q = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    await onSnapshot(q, (data) => {
      const posts = data.docs.map((post) => ({
        ...post.data(),
        id: post.id,
      }));
      return setUserPosts(posts);
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const dispatch = useDispatch();

  return (
    <ImageBackground source={require(image)} style={styles.imgBg}>
      <View style={styles.registrationContainer}>
        <TouchableOpacity
          style={{ position: "absolute", top: 22, right: 16 }}
          onPress={() => {
            // logOut();
            dispatch(authSignOutUser());
          }}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <View style={styles.avatarBox}>
          <View style={styles.avatar}>
            {avatar && (
              <Image
                source={{ uri: avatar }}
                style={{ width: 120, height: 120, borderRadius: 16 }}
              />
            )}
            <AntDesign
              // name={isAvatar ? "pluscircleo" : "closecircleo"}
              name="closecircleo"
              size={25}
              color={"#BDBDBD"}
              style={{
                position: "absolute",
                top: 81,
                right: -12,
              }}
            />
          </View>
        </View>
        <Text style={styles.title}>{nickname}</Text>
        <ProfilePostList items={userPosts} navigation={navigation} />
      </View>
    </ImageBackground>
  );
};

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
    paddingBottom: 43,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 300,
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

export default ProfileScreen;
