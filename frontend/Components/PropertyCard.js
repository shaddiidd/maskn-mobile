import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatPrice } from "../helpers/textFunctions";

export default function PropertyCard({ property }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate("PropertyDetails", { property_id: property.property_id })}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={property.photos ? { uri: property?.photos[0] } : require("../assets/house.png")} />
      </View>
      <Text style={styles.title}>{property.title}</Text>
      <Text style={styles.price}>JD {formatPrice(property.price)}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={19} color="gold" />
        <Text style={styles.ratingTxt}> {property.rating || "5"} </Text>
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
    backgroundColor: "#eee"
  },
  image: {
    borderRadius: 12,
    width: "100%",
    height: "100%"
  },
  title: {
    fontSize: 20,
    width: "95%",
    marginTop: 7,
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    width: "95%",
    color: "#333",
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
    right: 8
  },
  ratingTxt: {
    fontSize: 16,
  },
});
