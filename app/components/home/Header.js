import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { COLORS } from "../../config/theme";
import { useNavigation } from "@react-navigation/native";
import { auth } from '../../database/firebase'
import { signOut } from "firebase/auth";

export default function Header() {
  const navigation = useNavigation();

  const onSignOut = async () => {
    try {
      await signOut(auth)
    }
    catch (error) { console.log(error.message) }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSignOut}>
        <Image
          source={require("../../assets/icons/logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.headerIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("newPost")}>
          <Image
            source={require("../../assets/icons/add.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../assets/icons/heart.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeTitle}>10</Text>
          </View>
          <Image
            source={require("../../assets/icons/direct_message.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 120,
    height: 50,
    tintColor: COLORS.white,
    resizeMode: "center",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: COLORS.white,
    resizeMode: "center",
    marginRight: 20,
  },
  headerIconContainer: {
    flexDirection: "row",
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    position: "absolute",
    width: 20,
    height: 18,
    left: 10,
    top: -4,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  unreadBadgeTitle: { fontSize: 12, color: COLORS.white },
});
