import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PropertyCard({ property }) {
  const navigation = useNavigation();
  // navigation.navigate("Utilities", { id: property.id });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate("PropertyDetails", { property })}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: property.photos ? property?.photos[0] : "" }} />
      </View>
      <Text style={styles.title}>{property.title}</Text>
      <Text style={styles.price}>JD {property.price}</Text>
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
    marginVertical: 12,
    width: "90%",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    // overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    fontSize: 16,
    fontWeight: "500",
    width: "95%",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
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
