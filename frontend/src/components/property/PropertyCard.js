import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatPrice } from "../../helpers/textFunctions";
import React, { useState } from "react";

export default function PropertyCard({ property }) {
  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate("PropertyDetails", { property_id: property.property_id })}
    >
      <View style={styles.imageContainer}>
        {imageError || !property.photos ? (
          <Ionicons name="image-outline" size={80} color="#ccc" style={styles.placeholderIcon} />
        ) : (
          <Image
            style={styles.image}
            source={{ uri: property?.photos[0] }}
            onError={() => setImageError(true)}
          />
        )}
      </View>
      <Text numberOfLines={2} style={styles.title}>{property.title}</Text>
      <Text style={styles.price}>JD {formatPrice(property.price)}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={19} color="gold" />
        <Text style={styles.ratingTxt}> {property.rating ? "Not rated" : property.rating} </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "90%",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 12,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 12,
    width: "100%",
    height: "100%",
  },
  placeholderIcon: {
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    width: "95%",
    marginTop: 7,
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    width: "95%",
    color: "#508D4E",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF99",
    fontWeight: "600",
    padding: 5,
    borderRadius: 6,
    position: "absolute",
    top: 8,
    right: 8,
  },
  ratingTxt: {
    fontSize: 16,
  },
});
