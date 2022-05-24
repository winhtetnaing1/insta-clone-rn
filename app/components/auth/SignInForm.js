import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../config/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../database/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";


const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export default function SignInForm() {
  const navigation = useNavigation()

  const onSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('login success')
    } catch (error) { alert(error.message) }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onSignIn(values.email, values.password)}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleSubmit, errors, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values["email"].length && errors["email"]
                      ? COLORS.danger
                      : COLORS.gray,
                },
              ]}
            >
              <TextInput
                onChangeText={handleChange("email")}
                placeholder="email"
                placeholderTextColor={"#444"}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ fontSize: 16 }}
                selectionColor="#0096f6"
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values["password"].length && errors["password"]
                      ? COLORS.danger
                      : COLORS.gray,
                },
              ]}
            >
              <TextInput
                onChangeText={handleChange("password")}
                placeholder="password"
                placeholderTextColor={"#444"}
                autoCapitalize="none"
                autoCorrecte={false}
                secureTextEntry={true}
                style={{ fontSize: 16 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginBottom: 30,
              }}
            >
              <Text style={{ color: "#6880f5" }}>Forget Password?</Text>
            </View>
            <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>
            <View style={styles.signUpContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                <Text style={{ color: "#6880f5" }}> Sign Up </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}


const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 8,
    borderRadius: 4,
  },
  wrapper: { marginTop: 60 },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9acaf7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 43,
    borderRadius: 4,
  }),
  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 20,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});
