import { StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import AddnewPost from "../components/newPost/AddnewPost";
import { COLORS } from "../config/theme";
import FormikPostUploader from "../components/newPost/FormikPostUploader";

export default function NewPostScreen() {
  return (
    <View style={styles.container}>
      <AddnewPost />
      <FormikPostUploader />
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
