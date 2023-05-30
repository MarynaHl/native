import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useSelector } from "react-redux";
import { collection, query, onSnapshot } from "firebase/firestore";

import { db } from "../../../firebase/config";

import PostList from "../../components/PostList";

const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { nickname, email, avatar } = useSelector((state) => state.auth);
  // console.log(avatar);

  const getAllPosts = async () => {
    const q = await query(collection(db, "posts"));
    await onSnapshot(q, (data) => {
      const posts = data.docs.map((post) => ({
        ...post.data(),
        id: post.id,
      }));

      return setPosts(posts);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.avatarBox}>
          {avatar && (
            <Image
              source={{ uri: avatar }}
              style={{ width: 60, height: 60, borderRadius: 16 }}
            />
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{nickname}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>

      <PostList items={posts} navigation={navigation} />
    </View>
  );
};

export default DefaultPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingLeft: 16,
    paddingRight: 16,
  },
  userContainer: {
    flexDirection: "row",
    marginTop: 32,
  },
  avatarBox: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontWeight: "700",
    color: "#212121",
  },
  userEmail: {
    fontWeight: "400",
    color: "rgba(33, 33, 33, 0.8)",
  },
});
