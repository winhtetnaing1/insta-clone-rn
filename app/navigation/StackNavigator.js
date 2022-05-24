import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import NewPostScreen from "../screens/NewPostScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();


const SignInStack = () => (
  <Stack.Navigator
    initialRouteName="signIn"
    screenOptions={{ headerShown: false, animation: "simple_push" }}
  >
    <Stack.Screen name="home" component={HomeScreen} />
    <Stack.Screen name="newPost" component={NewPostScreen} />
  </Stack.Navigator>
);


const SignOutStack = () => (
  <Stack.Navigator
    initialRouteName="signIn"
    screenOptions={{ headerShown: false, animation: "simple_push" }}
  >
    <Stack.Screen name="signIn" component={SignInScreen} />
    <Stack.Screen name="signUp" component={SignUpScreen} />
  </Stack.Navigator>
);

export { SignInStack, SignOutStack }
