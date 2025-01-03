import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import TextField from "../Components/TextField";
import Button from "../Components/Button";
import RadioButtons from "../Components/RadioButtons";
import DropdownMenu from "../Components/DropdownMenu";
import { get } from "../fetch";
import axios from "axios";
import Context from "../Context";
import { optimizeImage } from "../utils/images";

export default function PostProperty() {
  const [propertyInfo, setPropertyInfo] = useState({ water_meter_subscription_number: `WATER${Date.now()}`, electricity_meter_reference_number: `ELECTRICITY${Date.now()}`, is_furnished: false });
  const [images, setImages] = useState([]);
  const [villages, setVillages] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const { setLoading, token } = useContext(Context);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await get("property/get-villages");
        const villages = response.data.villages.map((village) => ({
          id: village.id,
          label: village.village_name,
        }));
        setVillages(villages);
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    }

    fetchVillages();
  }, []);

  useEffect(() => {
    if (!propertyInfo.village_id) return;
    const fetchBlocks = async () => {
      try {
        const response = await get(`property/get-/blocks/${propertyInfo.village_id}`);
        const blocks = response.data.blocks.map((block) => ({
          id: block.id,
          label: block.block_name,
        }));
        setBlocks(blocks);
        setPropertyInfo((prevState) => ({
          ...prevState,
          block_id: undefined
        }))
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    }
    fetchBlocks();
  }, [propertyInfo.village_id]);

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Denied", "Please allow access to the gallery.");
      return;
    }
    if (images.length >= 5) {
      Alert.alert("Limit Reached", "You can only upload up to 5 images.");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const selectedImages = pickerResult.assets;
      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleInputChange = (name, value) => {
    setPropertyInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const requiredFields = ["description", "title", "address", "area", "price", "rental_period", "village_id", "block_id", "parcel_number", "building_number", "apartment_number"];
    const missingFields = requiredFields.filter((field) => !propertyInfo[field]);
    if (missingFields.length) {
      Alert.alert("Missing Fields", `Please fill in: ${missingFields.join(", ")}`);
      setIsSubmitting(false);
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      Object.keys(propertyInfo).forEach((key) => {
        form.append(key, propertyInfo[key]);
      });
      form.append("neighborhood_id", propertyInfo.block_id);
      form.append("is_furnished", propertyInfo.is_furnished ? true : false);
      for (const [_, image] of images.entries()) {
        const optimizedImage = await optimizeImage(image);
        const blob = await fetch(optimizedImage.uri).then((r) => r.blob())
        form.append("photos", blob);
      }      
      await axios.post("http://localhost:5002/property/add-property", form, { headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` } });
      Alert.alert("Success", "Property posted successfully!");
      navigation.pop();
    } catch (error) {
      Alert.alert("Error", "Failed to post the property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 30, paddingHorizontal: 20 }}>
        <Text style={styles.heading}>Property Images</Text>
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleImageDelete(index)}>
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))}
          {images.length < 5 && (
            <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
              <Ionicons name="camera" size={20} color="#666" />
              <Text style={styles.uploadButtonText}> Upload</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.heading}>Property Information</Text>
        <TextField placeholder="Title" value={propertyInfo.title} setValue={(value) => handleInputChange("title", value)} />
        <TextField textarea placeholder="Description" value={propertyInfo.description} setValue={(value) => handleInputChange("description", value)} />
        <TextField placeholder="Address" value={propertyInfo.address} setValue={(value) => handleInputChange("address", value)} />
        <TextField placeholder="Area" keyboardType="numeric" value={propertyInfo.area} setValue={(value) => handleInputChange("area", value)} />
        <TextField placeholder="Number of Bedrooms" keyboardType="numeric" value={propertyInfo.bedroom_num} setValue={(value) => handleInputChange("bedroom_num", value)} />
        <TextField placeholder="Number of Bathrooms" keyboardType="numeric" value={propertyInfo.bathroom_num} setValue={(value) => handleInputChange("bathroom_num", value)} />
        <TextField placeholder="Property Age" keyboardType="numeric" value={propertyInfo.property_age} setValue={(value) => handleInputChange("property_age", value)} />
        <DropdownMenu items={[{  label: "Monthly", id: "monthly" }, { label: "Yearly", id: "yearly" }]} selectedValue={propertyInfo.rental_period} onValueChange={(value) => handleInputChange("rental_period", value)} placeholder="Choose rental period" />
        <TextField placeholder="Building Number" keyboardType="numeric" value={propertyInfo.building_number} setValue={(value) => handleInputChange("building_number", value)} />
        <TextField placeholder="Floor Number" keyboardType="numeric" value={propertyInfo.floor_num} setValue={(value) => handleInputChange("floor_num", value)} />
        <TextField placeholder="Apartment Number" keyboardType="numeric" value={propertyInfo.apartment_number} setValue={(value) => handleInputChange("apartment_number", value)} />
        <TextField placeholder="Location" value={propertyInfo.location} setValue={(value) => handleInputChange("location", value)} />
        <TextField placeholder="Price" keyboardType="numeric" value={propertyInfo.price} setValue={(value) => handleInputChange("price", value)} />
        <TextField placeholder="Parcel Number" keyboardType="numeric" value={propertyInfo.parcel_number} setValue={(value) => handleInputChange("parcel_number", value)} />
        <DropdownMenu items={villages} selectedValue={propertyInfo.village_id} onValueChange={(value) => handleInputChange("village_id", value)} placeholder="Choose a village" />
        {blocks.length ? <DropdownMenu items={blocks} selectedValue={propertyInfo.block_id} onValueChange={(value) => handleInputChange("block_id", value)} placeholder="Choose a block" /> : null}
        <RadioButtons selectedValue={propertyInfo.is_furnished} setSelectedValue={(value) => handleInputChange("is_furnished", value)} />
        <Button text="submit" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    flexDirection: "row",
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#666",
  },
});
