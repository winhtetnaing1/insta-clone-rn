import { Text, View, Image, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS } from "../../config/theme";
import myContent from "../../utlity/context";
import { doc, FieldValue, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, } from "../../database/firebase";

export default function Post({ post }) {

  const { currentLoginUser } = useContext(myContent)


  const handleLike = () => {
    const currentLikeState = !post.likes_by_users.includes(currentLoginUser.email);

    updateDoc(doc(db, `users/${post.user_email}/posts/${post.post_id}`), {
      likes_by_users: currentLikeState ?
        arrayUnion(currentLoginUser.email) :
        arrayRemove(currentLoginUser.email)
    }).then(() => console.log('doc update success'))
      .catch(err => console.log('doc update fail'))
  }

  return (
    <View style={{ marginBottom: 25 }}>
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter handleLike={handleLike} post={post} currentLoginUser={currentLoginUser} />
        <Likes post={post} />
        <PostCaptions post={post} />
        <CommentSection post={post} />
        <Comment post={post} />
      </View>
    </View>
  );
}

const PostHeader = ({ post }) => (
  <View>
    <View
      style={{
        width: "100%",
        height: 1,
        backgroundColor: COLORS.transparentWhite,
      }}
    />
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
            borderWidth: 1,
            borderColor: COLORS.rainbow,
          }}
          source={{ uri: post.profile_picture }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ color: COLORS.white }} numberOfLines={1}>
            {post.user}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text
          style={{
            flex: 1,
            color: COLORS.white,
            fontSize: 25,
            fontWeight: "900",
            transform: [{ rotate: "90deg" }],
          }}
        >
          ...
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 400 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ width: "100%", height: '100%' }}
      resizeMode="cover"
    />
  </View>
);

const PostFooter = ({ handleLike, post, currentLoginUser }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        width: "30%",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={handleLike}>
        <Image source={post.likes_by_users.includes(currentLoginUser.email) ?
          require("../../assets/icons/heart_selected.png") :
          require("../../assets/icons/heart.png")}
          style={styles.icons} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image source={require("../../assets/icons/comment.png")} style={styles.icons} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image source={require("../../assets/icons/direct_message.png")} style={styles.icons} />
      </TouchableOpacity>

    </View>
    <TouchableOpacity>
      <Image source={require("../../assets/icons/save.png")} style={styles.icons} />
    </TouchableOpacity>
  </View>
);



const Likes = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ fontSize: 15, color: COLORS.white, fontWeight: "600" }}>
      {post.likes_by_users.length} likes
    </Text>

  </View>
);

const PostCaptions = ({ post }) => {
  // const [seemore, setSeemore] = useState(false)
  return (
    <Pressable onPress={() => setSeemore(true)}>
      <View>
        <Text style={{ color: COLORS.white, fontSize: 16 }}>
          <Text style={{ fontWeight: "bold" }}>{post.user}</Text>
          <Text style={{ fontWeight: "300", fontSize: 16, }}>
            {" "}
            {post.caption}
            {/* {!seemore ? post.caption.slice(0, 50) : post.caption}
            {!seemore && <Text style={{ color: COLORS.light, fontSize: 16 }}> ... see more </Text>} */}
          </Text>
        </Text>
      </View>
    </Pressable>
  )
}

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: COLORS.medium, fontSize: 15 }}>
        View
        <Text>
          {post.comments.length > 1
            ? ` all ${post.comments.length} comments`
            : ` ${post.comments.length} comment`}
        </Text>
      </Text>
    )}
  </View>
);

const Comment = ({ post }) => (
  <>
    {post.comments.map((comments, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: COLORS.white }}>
          <Text style={{ fontWeight: "bold" }}>{comments.user}</Text>{" "}
          {comments.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  icons: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: COLORS.white,
  },
});
