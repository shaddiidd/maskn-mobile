import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PropertyCard from "../Components/PropertyCard";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { get } from "../fetch";

export default function MyProperties() {
  const [properties, setProperties] = useState([
    {
      property_id: 1,
      title: "Property 1",
      price: 320,
      rating: 4.5,
      date: "Jul 2023 - ",
    },
    {
      property_id: 2,
      title: "Property 2",
      price: 350,
      rating: 4.5,
      date: "Jul 2023 - ",
    },
  ]);

  // useEffect(() => {
  //   get("myProperties")
  //     .then((response) => {
  //       setProperties(response.result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          minHeight: "100%",
          justifyContent: properties?.length ? "flex-start" : "center",
          paddingTop: 10
        }}
        style={{ flex: 1, width: "100%" }}
      >
        {properties?.length ? (
          properties?.map((property) => (
            <PropertyCard key={property.property_id} property={property} />
          ))
        ) : (
          <>
            <Ionicons name="home-outline" size={50} color="#666" />
            <Text
              style={{
                color: "#666",
                fontSize: 17,
                marginTop: 5,
                marginBottom: 100,
              }}
            >
              Nothing to show
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchContainer: {
    marginVertical: 15,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    height: 50,
  },
  filterBtn: {
    backgroundColor: "#508D4E",
    padding: 12,
    aspectRatio: 1,
    borderRadius: 100,
  },
  inputContainer: {
    flex: 1,
    height: "100%",
    borderColor: "#508D4E",
    borderWidth: 1,
    borderRadius: "50%",
    marginLeft: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    height: "100%",
    flex: 1,
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  sortItem: {
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    marginHorizontal: 5,
    borderRadius: 6,
    height: 30,
  },
  selectedSortItem: {
    backgroundColor: "#508D4E",
  },
  sortTxt: {
    color: "#757575",
    fontSize: 16,
  },
  selectedSortTxt: {
    color: "white",
  },
  list: {
    width: "100%",
  },
});
