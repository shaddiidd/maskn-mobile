import { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Alert } from "react-native";
import PaginatedCarousel from "../Components/PaginatedCarousel";
import Reviews from "../Components/Reviews";
import Button from "../Components/Button";
import PropertyInfoBox from "../Components/PropertyInfoBox";
import { get, post } from "../fetch";
import Context from "../Context";
import { capitalizeFirstLetter, formatPrice } from "../helpers/textFunctions";
import PropertyOwnerCard from "../Components/PropertyOwnerCard";

export default function PropertyScreen({ route }) {
  const [property, setProperty] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { property_id } = route.params;
  const { user, setLoading } = useContext(Context);

  const getProperty = async () => {
    try {
      const response = await get(`property/get-property/${property_id}`);
      setProperty(response.data.data);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    getProperty();
  }, []);

  const handleRequestTour = async () => {
    try {
      await post(`property/request-tour/${property_id}`)
      setProperty({ ...property, request_status: "pending" })
      Alert.alert("Request Sent", "Your request has been sent successfully", [{ text: "OK" }])
    } catch {
      Alert.alert("Request Failed", "Your request has failed", [{ text: "OK" }])
    }
  }
  
  const reviews = [
    // { id: 1, star_rating: 5, profile_picture: require("../assets/hazodeh.png"), name: "Hazem Odeh",date: "August 5, 2024", title: "Review title", description: "Review description", },
    // { id: 2, star_rating: 3, profile_picture: require("../assets/anas.png"), name: "Anas Bajawi",date: "August 5, 2024", title: "Review title", description: "Review description", },
  ];

  if (property === null) return null;
  return (
    <ScrollView bounces={false} style={{ backgroundColor: "white" }}>
      <SafeAreaView style={styles.container}>
        {property?.photos ? (
          <PaginatedCarousel propertyImages={property?.photos} />
        ) : (
          <PaginatedCarousel propertyImages={[require("../assets/house.png")]} />
        )}
        <ScrollView contentContainerStyle={styles.infoBoxesContainer} horizontal showsHorizontalScrollIndicator={false}>
          <PropertyInfoBox title="Area" value={parseInt(property?.area)} />
          <PropertyInfoBox title="Bedrooms" value={property?.bedroom_num} />
          <PropertyInfoBox title="Bathrooms" value={property?.bathroom_num} />
          <PropertyInfoBox title="Floor" value={property?.floor_num} />
          <PropertyInfoBox title="Furnished" value={property?.is_furnished ? "Yes" : "No"} />
        </ScrollView>
        <Text style={styles.title}>{property?.title}</Text>
        {/* Add rating here */}
        <Text style={styles.address}>{property?.address}</Text>
        <Text style={styles.description}>{property?.description}</Text>
        <View style={styles.priceContainer}>
          {property?.price && <Text style={styles.price}>JD {formatPrice(property?.price)} </Text>}
          {property?.rental_period && <Text style={styles.period}>- {capitalizeFirstLetter(property?.rental_period)}</Text>}
        </View>
        {(user.role === 1 && !property.request_status) && <Button onPress={handleRequestTour} additionalStyles={{ width: "90%" }} text="request tour" />}
        <Button additionalStyles={{ width: "90%" }} text="location" outline />
        {property.request_status === "approved" && (
          <PropertyOwnerCard id={property?.owner_id} name="Anas Bajawi" imageUrl={require("../assets/anas.png")} phoneNumber="0796199221" />
        )}
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
  ownerProfileContainer: {
    flexDirection: "row",
  }
});
