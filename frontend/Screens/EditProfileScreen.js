import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import TextField from '../Components/TextField';
import Context from '../Context';
import Icon from "react-native-vector-icons/MaterialIcons";
import Button from '../Components/Button';
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';
import { optimizeImage } from '../utils/images';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfileScreen() {
    const { user, generateToken, setLoading, token } = useContext(Context);
    const [profile, setProfile] = useState(user);
    const [selectedProfilePic, setSelectedProfilePic] = useState(null);

    const handleSave = async () => {
        setLoading(true);
        try {
            const body = new FormData();
            body.append("username", profile.username);
            body.append("first_name", profile.first_name);
            body.append("last_name", profile.last_name);
            body.append("email", profile.email);
            body.append("phone_number", profile.phone_number);
            if (selectedProfilePic) {
                const { uri } = await optimizeImage(selectedProfilePic);
                const filename = uri.split('/').pop();
                const type = "jpg";
                body.append("photos", {
                    uri,
                    name: filename || "profile_photo.jpg",
                    type: type || "image/jpeg",
                });
            }
            await axios({
                method: "PUT",
                url: "http://localhost:5002/users/update-profile",
                data: body,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            await generateToken();
        } catch (error) {
            console.log(error)
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
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!pickerResult.canceled) {
            setSelectedProfilePic(pickerResult.assets[0]);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                {/* Conditional Rendering for Profile Picture */}
                {selectedProfilePic ? (
                    <Image source={{ uri: selectedProfilePic.uri }} style={styles.profilePicture} />
                ) : user.profile_photo?.[0] ? (
                    <Image source={{ uri: user.profile_photo[0] }} style={styles.profilePicture} />
                ) : null}

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
            <TextField value={profile.username} setValue={(value) => setProfile({ ...profile, username: value })} placeholder="Username" />
            <TextField value={profile.first_name} setValue={(value) => setProfile({ ...profile, first_name: value })} placeholder="First name" />
            <TextField value={profile.last_name} setValue={(value) => setProfile({ ...profile, last_name: value })} placeholder="Last name" />
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
