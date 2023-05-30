import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";

import { FontAwesome, Feather } from "@expo/vector-icons";

const Item = ({ comment, nickname, date }) => {
  const { avatar } = useSelector((state) => state.auth);

  return (
    <View style={styles.item}>
      <View style={styles.avatarBox}>
        {avatar && (
          <Image
            source={{ uri: avatar }}
            style={{ width: 28, height: 28, borderRadius: 50 }}
          />
        )}
      </View>
      <View style={{ ...styles.commentWrapper }}>
        <Text>{comment}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const CommentsList = ({ items, navigation }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <Item
          comment={item.comment}
          nickname={item.nickname}
          date={item.date}
          // photo={item.photoRef}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginTop: 32,
  },
  avatarBox: {
    marginRight: 16,
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
  },
  commentWrapper: {
    width: "100%",
    padding: 16,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#F6F6F6",
  },
  date: {
    marginLeft: "auto",
    marginRight: 44,
    marginTop: 8,
    fontSize: 10,
    color: "#BDBDBD",
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: "#212121",
  },
});

export default CommentsList;
