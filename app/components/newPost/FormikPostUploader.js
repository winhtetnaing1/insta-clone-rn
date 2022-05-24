import { Button, View, TextInput, Text, Image, Alert, TouchableOpacity } from "react-native";
import React, { useContext, } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../config/theme";
import { db, storage } from '../../database/firebase'
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { useNavigation } from "@react-navigation/native";
import myContent from "../../utlity/context";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

const validationSchema = Yup.object().shape({
  caption: Yup.string().max(2000, "caption is limited to 2000").required(),
  imageUrl: Yup.string().required(),
});

export default function FormikPostUploader() {
  const navigation = useNavigation()
  const { currentLoginUser } = useContext(myContent)


  const handleUpload = async (caption, imageUrl) => {
    try {
      const url = imageUrl.split('/').pop()
      const storageRef = ref(storage, `images/${url}`)

      const changeByte = await fetch(imageUrl)
      const blob = await changeByte.blob()

      await uploadBytes(storageRef, blob)
      const respUrl = await getDownloadURL(storageRef)

      if (url) {
        await addDoc(collection(db, `users/${currentLoginUser.email}/posts`), {
          imageUrl: respUrl,
          caption: caption,
          user: currentLoginUser.username,
          profile_picture: currentLoginUser.profile_picture,
          createAt: serverTimestamp(),
          user_email: currentLoginUser.email,
          likes_by_users: [],
          comments: []
        })
        alert('post success')
      }

      navigation.goBack()
    }
    catch (error) {
      Alert.alert('Oops something wrong', error.message,
        [{ text: 'ok' },])
    }
  }
  const onImageSelect = async (setFieldValue) => {
    const response = await ImagePicker.launchImageLibraryAsync()
    if (!response.cancelled) setFieldValue('imageUrl', response.uri)
  }



  return (
    <View style={{ margin: 10 }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ caption: "", imageUrl: "" }}
        onSubmit={(values) => handleUpload(values.caption, values.imageUrl)}
      >
        {({ handleChange, handleSubmit, errors, isValid, setFieldValue, values }) => (
          <>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", }}
            >
              <TouchableOpacity
                onPress={() => onImageSelect(setFieldValue)}
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: COLORS.lightGray,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10
                }}
              >
                {values.imageUrl ?
                  <Image
                    source={{ uri: values.imageUrl }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                  : <MaterialCommunityIcons name="camera" size={40} color={COLORS.dark} />}
              </TouchableOpacity>

              <View style={{ flex: 1, marginLeft: 10, }}>
                <TextInput
                  placeholder="caption"
                  onChangeText={handleChange("caption")}
                  placeholderTextColor={COLORS.white}
                  multiline
                  style={{
                    color: COLORS.white,
                  }}
                />
                {errors["caption"] && (
                  <Text style={{ color: COLORS.danger }}>
                    {errors["caption"]}
                  </Text>
                )}
              </View>
            </View>
            {errors["imageUrl"] && (
              <Text style={{ color: COLORS.danger }}>
                {errors["imageUrl"]}
              </Text>
            )}
            <View style={{ marginTop: 10 }}>
              <Button title="share" onPress={handleSubmit} disabled={!isValid} />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
