import React from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { COLORS } from '../../config/theme';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../database/firebase';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(3),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export default function SignUpForm() {
  const navigation = useNavigation()

  const getRandomProfilePicture = async () => {
    try {
      const response = await fetch('https://randomuser.me/api')
      const data = await response.json()
      return data.results[0].picture.large
    } catch (error) { console.log(error.message) }
  }

  const onSignUp = async (email, password, username) => {
    try {
      const authUser = await createUserWithEmailAndPassword(auth, email, password)

      const colRef = doc(db, 'users', authUser.user.email)

      await setDoc(colRef, {
        user_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile_picture: await getRandomProfilePicture()
      })

      console.log('sign up success')
    } catch (error) { alert(error.message) }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => onSignUp(values.email, values.password, values.username)}
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
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values["username"].length && errors["username"]
                      ? COLORS.danger
                      : COLORS.gray,
                },
              ]}
            >
              <TextInput
                onChangeText={handleChange("username")}
                placeholder="username"
                placeholderTextColor={"#444"}
                autoCapitalize="none"
                style={{ fontSize: 16 }}
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
              <Text style={styles.buttonText}>Sign Up </Text>
            </Pressable>
            <View style={styles.loginContainer}>
              <Text>already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6880f5" }}> Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});
