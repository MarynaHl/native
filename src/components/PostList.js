import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { collection, doc, query, onSnapshot } from "firebase/firestore";

import { FontAwesome, Feather } from "@expo/vector-icons";

import { db } from "../../firebase/config";

const Item = ({
  postId,
  title,
  location,
  photo,
  navigation,
  latitude,
  longitude,
}) => {
  const [commentsAmount, setCommentsAmount] = useState(null);

  const { userId } = useSelector((store) => store.auth);

  useEffect(() => {
    const docRef = doc(db, "posts", postId);
    const q = query(collection(docRef, "comments"));
    const unsubscribe = onSnapshot(q, (data) => {
      setCommentsAmount(data.docs.length);
    });
    return () => {
      unsubscribe();
    };
  }, [postId]);
  return (
    <View style={styles.item}>
      <View style={styles.photoWrapper}>
        <Image style={{ flex: 1, borderRadius: 8 }} source={{ uri: photo }} />
      </View>
      <Text style={styles.text}>{title}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Коментарі", { photo, postId });
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome
              name="comment-o"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.comments}>{commentsAmount}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Карта", { latitude, longitude });
            }}
          >
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 4 }}
            />
          </TouchableOpacity>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const PostList = ({ items, navigation }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <Item
          postId={item.id}
          latitude={item.photoLocation.coords.latitude}
          longitude={item.photoLocation.coords.longitude}
          title={item.title}
          location={item.location}
          photo={item.photoRef}
          navigation={navigation}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 32,
  },
  photoWrapper: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: "#212121",
  },
  comments: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  location: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default PostList;
