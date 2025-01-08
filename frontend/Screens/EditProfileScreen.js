import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import LabelTextField from '../Components/LabelTextField';
import Context from '../Context';
import Icon from "react-native-vector-icons/MaterialIcons";
import Button from '../Components/Button';
import * as ImagePicker from "expo-image-picker";
import { put } from '../fetch';
import { optimizeImage } from '../utils/images';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen() {
    const { user, generateToken, setLoading } = useContext(Context);
    const [profile, setProfile] = useState(user);
    const [selectedProfilePic, setSelectedProfilePic] = useState(null);
    const navigation = useNavigation();

    const handleSave = async () => {
        if (!profile.username || !profile.first_name || !profile.last_name || !profile.email || !profile.phone_number) {
            Alert.alert("All fields are required", "Please fill in all the fields.");
            return;
        }
        setLoading(true);
        try {
            const body = new FormData();
            body.append("username", profile.username);
            body.append("first_name", profile.first_name);
            body.append("last_name", profile.last_name);
            body.append("email", profile.email);
            body.append("phone_number", profile.phone_number);
    
            if (selectedProfilePic) {
                const optimizedImage = await optimizeImage(selectedProfilePic);
                const fileName = selectedProfilePic.uri.split("/").pop();
                const fileType = "image/jpeg";
                body.append("profile_photo", {
                    uri: optimizedImage.uri,
                    name: fileName,
                    type: fileType,
                });    
            }
            await put("users/update-profile", body);
            Alert.alert("Success", "Profile updated successfully!");
            generateToken();
            navigation.pop();
        } catch (error) {
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "Failed to update profile.");
            } else {
                Alert.alert("Error", "Something went wrong. Please try again later.");
            }
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
        <ScrollView style={{ backgroundColor: "#fff" }} contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                {selectedProfilePic ? (
                    <Image source={{ uri: selectedProfilePic.uri }} style={styles.profilePicture} />
                ) : user.profile_photo?.[0] ? (
                    <Image source={{ uri: user.profile_photo[0] }} style={styles.profilePicture} />
                ) : null}

                {!selectedProfilePic && !user.profile_photo?.[0] && (
                <View style={styles.profilePicture}>
                    <Ionicons name="person" color="#666" size={50} />
                </View>
                )}
                <View style={styles.circleBtn}>
                    <Icon name="edit" size={18} color="#fff" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                <Text style={styles.profilePictureText}>Upload a profile picture</Text>
            </TouchableOpacity>
            <LabelTextField value={profile.username} setValue={(value) => setProfile({ ...profile, username: value })} placeholder="Username" />
            <LabelTextField value={profile.first_name} setValue={(value) => setProfile({ ...profile, first_name: value })} placeholder="First name" />
            <LabelTextField value={profile.last_name} setValue={(value) => setProfile({ ...profile, last_name: value })} placeholder="Last name" />
            <LabelTextField value={profile.email} setValue={(value) => setProfile({ ...profile, email: value })} placeholder="Email" />
            <LabelTextField value={profile.phone_number} setValue={(value) => setProfile({ ...profile, phone_number: value })} placeholder="Phone number" />
            <Button text="Save" onPress={handleSave} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: "center",
        minWidth: "100%",
        padding: 20,
        paddingTop: 5
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
