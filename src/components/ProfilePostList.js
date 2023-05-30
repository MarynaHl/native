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
import {
  collection,
  doc,
  getDoc,
  query,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";

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
      {/* //     <Text style={styles.title}>{title}</Text> */}
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Коментарі", { photo, postId });
            }}
          >
            <FontAwesome
              name="comment"
              size={24}
              color="#FF6C00"
              style={{ marginRight: 6 }}
            />
          </TouchableOpacity>
          <Text style={styles.comments}>{commentsAmount}</Text>
          <TouchableOpacity>
            <AntDesign
              name="like2"
              size={24}
              color="#FF6C00"
              style={{ marginRight: 6 }}
            />
          </TouchableOpacity>
          <Text style={styles.likes}>0</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Карта", { latitude, longitude })
            }
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

const ProfilePostList = ({ navigation, items }) => {
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
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    // backgroundColor: "#f9c2ff",
    marginTop: 32,
  },
  title: {
    fontSize: 32,
  },
  photoWrapper: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: "#212121",
  },
  comments: { fontSize: 16, color: "#212121", marginRight: 24 },
  likes: { fontSize: 16, color: "#212121", marginRight: 24 },
  location: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default ProfilePostList;
