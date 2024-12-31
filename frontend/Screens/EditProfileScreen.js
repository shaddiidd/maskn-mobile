import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, Image, Text, TouchableOpacity, View } from 'react-native';
import TextField from '../Components/TextField';
import Context from '../Context';
import Icon from "react-native-vector-icons/MaterialIcons";

export default function EditProfileScreen() {
    const { user } = useContext(Context);
    const [profile, setProfile] = useState(user);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => console.log("Upload a profile picture")}>
                <Image source={require("../assets/hazodeh.png")} style={styles.profilePicture} />
                <View style={styles.circleBtn}>
                    <Icon name="edit" size={18} color="#fff" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => console.log("Upload a profile picture")}>
                <Text style={styles.profilePictureText}>Upload a profile picture</Text>
            </TouchableOpacity>
            <TextField value={profile.userName} setValue={(value) => setProfile({ ...profile, userName: value })} placeholder="Username" />
            <TextField value={profile.firstName} setValue={(value) => setProfile({ ...profile, firstName: value })} placeholder="First name" />
            <TextField value={profile.lastName} setValue={(value) => setProfile({ ...profile, lastName: value })} placeholder="Last name" />
            <TextField value={profile.email} setValue={(value) => setProfile({ ...profile, email: value })} placeholder="Email" />
            <TextField value={profile.phoneNumber} setValue={(value) => setProfile({ ...profile, phoneNumber: value })} placeholder="Phone number" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: "center",
        minWidth: "100%",
        minHeight: "100%",
        padding: 20,
    },
    profilePicture: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "#eee",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#508D4E"
    },
    profilePictureText: {
      fontSize: 15,
      fontWeight: "500",
      marginTop: 5,
      marginBottom: 20,
      textAlign: "center",
      color: "#508D4E"
    },
    circleBtn: {
      width: 25,
      height: 25,
      borderRadius: 25,
      backgroundColor: "#508D4E",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 2,
      right: 2
    },
})