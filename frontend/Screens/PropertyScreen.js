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
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>{property?.area}</Text>
            </View>
            <Text style={styles.infoTitle}>Area</Text>
          </View>
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>{property?.bedroom_num}</Text>
            </View>
            <Text style={styles.infoTitle}>Bedrooms</Text>
          </View>
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>{property?.bathroom_num}</Text>
            </View>
            <Text style={styles.infoTitle}>Bathrooms</Text>
          </View>
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>{property?.floor_num}</Text>
            </View>
            <Text style={styles.infoTitle}>Floor</Text>
          </View>
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>
                {property?.is_furnished ? "Yes" : "No"}
              </Text>
            </View>
            <Text style={styles.infoTitle}>Furnished</Text>
          </View>
        </ScrollView>

        <Text style={styles.title}>{property?.title}</Text>
        <Text style={styles.address}>{property?.address}</Text>
        <Text style={styles.description}>{property?.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>JD {property?.price} </Text>
          <Text style={styles.period}>
            / {property?.rental_period?.split("")[0].toUpperCase() +
              property?.rental_period?.slice(1).toLowerCase()}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.wideBtn, styles.outlined]}
        >
          <Ionicons name="location" size={25} color="#508D4E" />
          <Text style={[styles.wideBtnTxt, { color: "#508D4E" }]}>
            {" "}
            LOCATION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.wideBtn}>
          <Ionicons name="eye" size={25} color="#fff" />
          <Text style={styles.wideBtnTxt}> REQUEST TOUR</Text>
        </TouchableOpacity>
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
  infoBox: {
    width: 75,
    height: 75,
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  infoTitle: {
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
    marginTop: 10,
    fontSize: 13,
  },
  infoValue: {
    textAlign: "center",
    color: "#508D4E",
    fontWeight: "600",
    fontSize: 18,
    width: "70%",
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    width: "90%",
  },
  address: {
    width: "90%",
    marginVertical: 10,
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
    color: "#828282"
  },
});
