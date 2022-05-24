import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../config/theme";
import { useNavigation } from "@react-navigation/native";

export default function AddnewPost() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
    </View>
  );
}

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/icons/back.png")}
        style={{
          width: 30,
          height: 30,
          resizeMode: "center",
          tintColor: COLORS.white,
        }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>New Post</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: COLORS.white,
    fontSize: 20,
    textTransform: "capitalize",
  },
});
