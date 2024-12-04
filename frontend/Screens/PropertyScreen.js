import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import PaginatedCarousel from "../Components/PaginatedCarousel";
import { Ionicons } from "@expo/vector-icons";
import Reviews from "../Components/Reviews";
import Button from "../Components/Button";
import PropertyInfoBox from "../Components/PropertyInfoBox";

export default function PropertyScreen({ route }) {
  const { property } = route.params;
  const propertyImages = [
    require("../assets/house.png"),
    require("../assets/house.png"),
    require("../assets/house.png"),
  ];
  const reviews = [
    {
      id: 1,
      star_rating: 5,
      profile_picture: require("../assets/hazodeh.png"),
      name: "Hazem Odeh",
      date: "August 5, 2024",
      title: "Review title",
      description: "Review description",
    },
    {
      id: 2,
      star_rating: 3,
      profile_picture: require("../assets/anas.png"),
      name: "Anas Bajawi",
      date: "August 5, 2024",
      title: "Review title",
      description: "Review description",
    },
  ];

  return (
    <ScrollView bounces={false} style={{ backgroundColor: "white" }}>
      <SafeAreaView style={styles.container}>
        <PaginatedCarousel propertyImages={propertyImages} />
        <ScrollView
          contentContainerStyle={styles.infoBoxesContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <PropertyInfoBox title="Area" value={property?.area} />
          <PropertyInfoBox title="Bedrooms" value={property?.bedroom_num} />
          <PropertyInfoBox title="Bathrooms" value={property?.bathroom_num} />
          <PropertyInfoBox title="Floor" value={property?.floor_num} />
          <PropertyInfoBox title="Furnished" value={property?.is_furnished ? "Yes" : "No"} />
        </ScrollView>

        <Text style={styles.title}>{property?.title}</Text>
        <Text style={styles.address}>{property?.address}</Text>
        <Text style={styles.description}>{property?.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>JD {property?.price} </Text>
          <Text style={styles.period}>
            -{" "}
            {property?.rental_period?.split("")[0].toUpperCase() +
              property?.rental_period?.slice(1).toLowerCase()}
          </Text>
        </View>
        <Button additionalStyles={{ width: "90%" }} text="request tour" />
        <Button additionalStyles={{ width: "90%" }} text="location" outline />
        <Reviews additionalStyles={{ width: "90%" }} seeAll reviews={reviews} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoBoxesContainer: {
    flexDirection: "row",
    marginVertical: 30,
    paddingHorizontal: 10,
    height: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    width: "90%",
  },
  address: {
    width: "90%",
    marginTop: 2,
    marginBottom: 10,
    color: "#444"
  },
  description: {
    width: "90%",
    color: "#828282",
  },
  wideBtn: {
    backgroundColor: "#508D4E",
    borderWidth: 1.5,
    borderColor: "#508D4E",
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderRadius: 10,
    marginTop: 20,
  },
  outlined: {
    backgroundColor: "transparent",
  },
  wideBtnTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  priceContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "90%",
    alignItems: "baseline",
  },
  price: {
    fontWeight: "500",
    fontSize: 18,
  },
  period: {
    fontSize: 16,
    color: "#828282",
  },
});
