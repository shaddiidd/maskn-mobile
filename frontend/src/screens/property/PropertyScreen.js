import { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Alert, Linking } from "react-native";
import PaginatedCarousel from "../../components/property/PaginatedCarousel";
import ReviewCard from "../../components/survey/ReviewCard";
import Button from "../../ui/Button";
import PropertyInfoBox from "../../components/property/PropertyInfoBox";
import { get, post } from "../../utils/fetch";
import Context from "../../context/Context";
import { capitalizeFirstLetter, formatPrice } from "../../helpers/textFunctions";
import PropertyOwnerCard from "../../components/property/PropertyOwnerCard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PropertyScreen({ route }) {
  const [property, setProperty] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { property_id } = route.params;
  const { user, setLoading } = useContext(Context);
  const navigation = useNavigation();

  const getProperty = async () => {
    try {
      const response = await get(`property/get-property/${property_id}`);
      setProperty(response.data.data);
    } catch {
      Alert.alert("Sorry", "Property is not listed yet");
      navigation.pop();
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

  const handleLocation = () => {
    Linking.openURL(property.location)
  }

  if (property === null) return <View style={{ flex: 1, backgroundColor: "white" }} />;
  return (
    <ScrollView bounces={false} style={{ backgroundColor: "white" }}>
      <SafeAreaView style={styles.container}>
        {property?.photos ? (
          <PaginatedCarousel propertyImages={property?.photos} />
        ) : (
          <PaginatedCarousel propertyImages={[require("../../assets/house.png")]} />
        )}
        <ScrollView contentContainerStyle={styles.infoBoxesContainer} horizontal showsHorizontalScrollIndicator={false}>
          <PropertyInfoBox title="Area (SQM)" value={parseInt(property?.area)} />
          <PropertyInfoBox title="Bedrooms" value={property?.bedroom_num} />
          <PropertyInfoBox title="Bathrooms" value={property?.bathroom_num} />
          <PropertyInfoBox title="Age (years)" value={property?.property_age} />
          <PropertyInfoBox title="Floor" value={property?.floor_num} />
          <PropertyInfoBox title="Furnished" value={property?.is_furnished ? "Yes" : "No"} />
        </ScrollView>
        <Text style={styles.title}>{property?.title}</Text>
        <Text style={styles.address}>{property?.address}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="gold" />
          <Text style={styles.rating}>{property?.rating === "0.00" ? "Not rated" : property?.rating}</Text>
        </View>
        <Text style={styles.description}>{property?.description}</Text>
        <View style={styles.priceContainer}>
          {property?.price && <Text style={styles.price}>JD {formatPrice(property?.price)} </Text>}
          {property?.rental_period && <Text style={styles.period}>- {capitalizeFirstLetter(property?.rental_period)}</Text>}
        </View>
        {(user.role === 1 && !property.request_status) && <Button onPress={handleRequestTour} additionalStyles={{ width: "90%" }} text="request tour" />}
        <Button additionalStyles={{ width: "90%" }} text="location" outline onPress={handleLocation} />
        {(property.request_status === "approved") && (
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
              imageUri={review?.tenant?.profile_photo?.length ? review?.tenant?.profile_photo[0] : null}
              review={review?.review_text}
            />
          ) : (
            <Text style={styles.noReviews}>No reviews yet...</Text>
          )}
          {/* <ReviewCard
            title={"Abdullah Shadid"}
            subtitle="@shaddiidd"
            review="The studio was perfect for my needs. Spacious, clean, and in a great location! The owner was responsive and helpful throughout my stay."
          />

          <ReviewCard
            title={"Lina Mohammad"}
            subtitle="@lina.m"
            review="The studio is a gem! It’s small but very cozy, and everything I needed was within walking distance. Highly recommend for students or young professionals."
          /> */}
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
    marginVertical: 20,
    paddingHorizontal: 20,
    height: 100,
    columnGap: 20
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
    marginTop: 5,
    marginBottom: 10,
    columnGap: 4,
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
    marginVertical: 10
  }
});
