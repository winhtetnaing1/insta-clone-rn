import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/home/Header";
import Story from "../components/home/Story";
import { COLORS } from "../config/theme";
import Post from "../components/home/Post";
import { buttonTabIcons, } from "../data/fakedata";
import ButtonTab from "../components/home/ButtonTab";
import { collectionGroup, onSnapshot, } from "firebase/firestore";
import { db } from "../database/firebase";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => onSnapshot(collectionGroup(db, "posts"), (snapshot) =>
    setPosts(snapshot.docs.map((doc) => {
      console.log('fetch')
      return { post_id: doc.id, ...doc.data() }
    })
    )), [])



  return (
    <View style={styles.container}>
      <Header />
      <Story />
      <ScrollView>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <View style={{ marginTop: 50 }}>
        <ButtonTab icons={buttonTabIcons} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.black,
  },
});
