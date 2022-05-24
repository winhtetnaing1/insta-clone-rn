import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../config/theme";
import { USER } from "../../data/fakedata";

export default function Story() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        {USER.map((story, index) => (
          <View key={index} style={styles.storyContainer}>
            <Image source={story.image} style={styles.profile} />
            <Text style={{ color: COLORS.white, textTransform: "lowercase" }}>
              {story.name.length > 7
                ? story.name.slice(0, 7) + "..."
                : story.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  storyContainer: {
    width: 80,
    alignItems: "center",
  },
  profile: {
    width: 67,
    height: 67,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.rainbow,
  },
});
