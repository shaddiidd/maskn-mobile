import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import TextField from "../Components/TextField";

export default function PostProperty() {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    address: "",
    floor: "",
    bathrooms: "",
    bedrooms: "",
    area: "",
    propertyAge: "",
    location: "",
    nationalNumber: "",
    rentalPeriod: "",
    price: "",
  });

  const [images, setImages] = useState([]);

  const handleImagePick = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      Alert.alert("Sorry!", "Permission required to access the gallery.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImages((prevImages) => [...prevImages, pickerResult.assets[0].uri]);
    }
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleInputChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  handleImagePick()

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.container}
    >
      <Text style={styles.heading}>Property Images</Text>
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleImageDelete(index)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {images.length < 5 && (
        <Button title="Upload Image" onPress={handleImagePick} />
      )}

      <Text style={styles.heading}>Property Information</Text>
      <TextField placeholder="Title" value={formState.title} onChangeText={(value) => handleInputChange("title", value)} />
      <TextField textarea placeholder="Description" value={formState.description} onChangeText={(value) => handleInputChange("description", value)} />
      <TextField placeholder="Address" value={formState.address} onChangeText={(value) => handleInputChange("address", value)} />
      <TextField placeholder="Floor" value={formState.floor} onChangeText={(value) => handleInputChange("floor", value)} />
      <TextField placeholder="Number of Bathrooms" value={formState.bathrooms} onChangeText={(value) => handleInputChange("bathrooms", value)} />
      <TextField placeholder="Number of Bedrooms" value={formState.bedrooms} onChangeText={(value) => handleInputChange("bedrooms", value)} />
      <TextField placeholder="Area (SQM)" value={formState.area} onChangeText={(value) => handleInputChange("area", value)} />
      <TextField placeholder="Property Age (Years)" value={formState.propertyAge} onChangeText={(value) => handleInputChange("propertyAge", value)} />
      <TextField placeholder="Google Maps Location" value={formState.location} onChangeText={(value) => handleInputChange("location", value)} />

      <Text style={styles.heading}>Government & Contract</Text>
      <TextField placeholder="Property National Number" value={formState.nationalNumber} onChangeText={(value) => handleInputChange("nationalNumber", value)} />
      <TextField placeholder="Rental Period (Months)" value={formState.rentalPeriod} onChangeText={(value) => handleInputChange("rentalPeriod", value)} />
      <TextField placeholder="Price" value={formState.price} onChangeText={(value) => handleInputChange("price", value)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
