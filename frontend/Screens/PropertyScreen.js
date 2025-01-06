import { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Alert } from "react-native";
import PaginatedCarousel from "../Components/PaginatedCarousel";
import ReviewCard from "../Components/ReviewCard";
import Button from "../Components/Button";
import PropertyInfoBox from "../Components/PropertyInfoBox";
import { get, post } from "../fetch";
import Context from "../Context";
import { capitalizeFirstLetter, formatPrice } from "../helpers/textFunctions";
import PropertyOwnerCard from "../Components/PropertyOwnerCard";
import { Ionicons } from "@expo/vector-icons";

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
      Alert.alert("Error", "Failed to get property");
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
        <Text style={styles.address}>{property?.address}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={22} color="gold" />
          <Text style={styles.rating}>{property?.rating}</Text>
        </View>
        <Text style={styles.description}>{property?.description}</Text>
        <View style={styles.priceContainer}>
          {property?.price && <Text style={styles.price}>JD {formatPrice(property?.price)} </Text>}
          {property?.rental_period && <Text style={styles.period}>- {capitalizeFirstLetter(property?.rental_period)}</Text>}
        </View>
        {(user.role === 1 && !property.request_status) && <Button onPress={handleRequestTour} additionalStyles={{ width: "90%" }} text="request tour" />}
        <Button additionalStyles={{ width: "90%" }} text="location" outline />
        {property.request_status === "approved" && (
          <PropertyOwnerCard
            id={property?.owner_id}
            name={property?.owner_details?.first_name + " " + property?.owner_details?.last_name}
            uri={property?.owner_details?.profile_photo?.length ? property?.owner_details?.profile_photo[0] : null}
            phoneNumber={property?.owner_details?.phone_number}
          />
        )}
        <Text style={[styles.title, { marginTop: 20, marginBottom: -5 }]}>Reviews</Text>
        <View style={{ width: "90%" }}>
          {property?.reviews?.length ? property?.reviews?.map((review, index) =>
            <ReviewCard
              key={index}
              title={review?.tenant?.first_name + " " + review?.tenant?.last_name}
              subtitle={"@" + review?.tenant?.username}
              imageUri={review?.tenant?.profile_picture?.length ? review?.tenant?.profile_picture[0] : null}
              review={review?.review_text}
            />
          ) : (
            <Text style={styles.noReviews}>No reviews yet...</Text>
          )}
        </View>
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
    color: "#444"
  },
  ratingContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 2,
    marginBottom: 10,
    columnGap: 4
  },
  rating: {
    color: "#666",
    fontWeight: "500",
    fontSize: 16
  },
  description: {
    width: "90%",
    color: "#828282",
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
  },
  noReviews: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
    width: "90%",
  }
});
