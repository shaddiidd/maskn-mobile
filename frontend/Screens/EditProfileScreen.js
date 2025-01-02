import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import TextField from '../Components/TextField';
import Context from '../Context';
import Icon from "react-native-vector-icons/MaterialIcons";
import Button from '../Components/Button';
import { put } from '../fetch';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function EditProfileScreen() {
    const { user, generateToken, setLoading } = useContext(Context);
    const [profile, setProfile] = useState(user);
    const [selectedProfilePic, setSelectedProfilePic] = useState(null);

    const handleSave = async () => {
        setLoading(true);
        try {
            const body = new FormData();
            body.append("username", profile.userName);
            body.append("first_name", profile.firstName);
            body.append("last_name", profile.lastName);
            body.append("email", profile.email);
            body.append("phone_number", profile.phone_number);
            if (selectedProfilePic) {
                const fileInfo = await FileSystem.getInfoAsync(selectedProfilePic.uri);
                body.append("profile_photo", {
                    uri: selectedProfilePic.uri,
                    type: "image/jpeg",
                    name: fileInfo.name || "profile_photo.jpg"
                });
            }
            await put(`users/update-profile`, body, { headers: { "Content-Type": "multipart/form-data" } });
            generateToken();
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Sorry!", "Permission required to access the gallery.");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
        if (!result.canceled) {
            setSelectedProfilePic(pickerResult.assets[0]);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                <Image
                    source={
                        selectedProfilePic
                            ? { uri: selectedProfilePic.uri }
                            : user.profile_photo?.[0]
                                ? { uri: user.profile_photo[0] }
                                : null
                    }
                    style={styles.profilePicture}
                />
                {!selectedProfilePic && !user.profile_photo?.[0] && (
                    <Text style={styles.noImageText}>Upload a profile picture</Text>
                )}
                <View style={styles.circleBtn}>
                    <Icon name="edit" size={18} color="#fff" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                <Text style={styles.profilePictureText}>Upload a profile picture</Text>
            </TouchableOpacity>
            <TextField value={profile.userName} setValue={(value) => setProfile({ ...profile, userName: value })} placeholder="Username" />
            <TextField value={profile.firstName} setValue={(value) => setProfile({ ...profile, firstName: value })} placeholder="First name" />
            <TextField value={profile.lastName} setValue={(value) => setProfile({ ...profile, lastName: value })} placeholder="Last name" />
            <TextField value={profile.email} setValue={(value) => setProfile({ ...profile, email: value })} placeholder="Email" />
            <TextField value={profile.phone_number} setValue={(value) => setProfile({ ...profile, phone_number: value })} placeholder="Phone number" />
            <Button text="Save" onPress={handleSave} />
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
        borderColor: "#508D4E",
    },
    noImageText: {
        fontSize: 15,
        fontWeight: "500",
        marginTop: 10,
        textAlign: "center",
        color: "#508D4E",
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
        right: 2,
    },
    profilePictureText: {
      fontSize: 15,
      fontWeight: "500",
      marginTop: 5,
      marginBottom: 20,
      textAlign: "center",
      color: "#508D4E"
    },
});
