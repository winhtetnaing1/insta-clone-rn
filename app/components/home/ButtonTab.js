import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS } from "../../config/theme";
import myContext from '../../utlity/context'

export default function ButtonTab({ icons }) {
  const { currentLoginUser } = useContext(myContext)
  const [activeTab, setactiveTab] = useState("home");

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setactiveTab(icon.name)}>
      {icon.name === "profile" ?
        <Image source={{ uri: currentLoginUser.profile_picture }}
          style={[
            styles.icon,
            styles.profile(activeTab)
          ]}
        />
        : <Image
          source={activeTab === icon.name ? icon.active : icon.inActive}
          style={[
            styles.icon,
          ]}
        />}
    </TouchableOpacity>

  );


  return (
    <View style={styles.wraper}>
      <View
        style={{ height: 1, width: "100%", backgroundColor: COLORS.gray1 }}
      />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon icon={icon} key={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wraper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 999,
    backgroundColor: COLORS.black,
  },
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  profile: (activeTab = "") => ({
    resizeMode: "cover",
    borderRadius: 20,
    padding: 15,
    borderWidth: activeTab === "profile" ? 2 : 0,
    borderColor: COLORS.white,
  }),
});
