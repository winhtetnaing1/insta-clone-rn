import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "../config/theme";
import SignUpForm from "../components/auth/SignUpForm";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/icons/appicon.png")}
          style={styles.image}
        />
      </View>
      <SignUpForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logoContainer: { alignItems: "center", marginTop: 60 },
  image: { width: 120, height: 120, resizeMode: "contain" },
});
