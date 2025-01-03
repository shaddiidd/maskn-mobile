import { StyleSheet, View, RefreshControl, ScrollView, Text, Alert } from "react-native";
import PropertyCard from "../Components/PropertyCard";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { get } from "../fetch";
import Context from "../Context";
import FiltersContainer from "../Components/FiltersContainer";

export default function PropertySearch({ route }) {
  const { searchText, bedrooms, bathrooms, priceRange, firnished } = route.params;
  const { setLoading } = useContext(Context);
  const [filters, setFilters] = useState({});
  const [properties, setProperties] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProperties = async () => {
    try {
      const body = {}
      if (bedrooms.length) body.bedroom_num = parseInt(bedrooms);
      if (bathrooms.length) body.bathroom_num = parseInt(bathrooms);
      if (priceRange.length) body.price_range = `${priceRange[0]}-${priceRange[1]}`;
      if (firnished) body.is_furnished = firnished;
      const response = await get("property", body);
      let filteredProperties = response.data;
      if (searchText) {
        filteredProperties = filteredProperties.filter(property => property?.title?.toLowerCase().includes(searchText?.toLowerCase()));
      }
      setProperties(filteredProperties);
    } catch {
      Alert.alert("Error", "Failed to get properties");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    setFilters({
      price_range: priceRange.length ? `${priceRange[0]}-${priceRange[1]} JOD` : "",
      bathroom_num: bathrooms.length ? `${bathrooms} Bathrooms` : "",
      bedroom_num: bedrooms.length ? `${bedrooms} Bedrooms` : "",
      is_furnished: firnished ? "Furnished" : "Not furnished",
    });
    setLoading(true);
    fetchProperties();
  }, []);

  if (properties === null) return <></>;
  return (
    <View style={styles.container}>
      <FiltersContainer filters={filters} />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchProperties(); }} />}
        contentContainerStyle={[styles.scrollContainer, { justifyContent: properties?.length ? "flex-start" : "center", }]}
        style={styles.scrollView}
      >
        {properties?.length ? (
          properties?.map((property) => (
            <PropertyCard key={property.property_id} property={property} />
          ))
        ) : (
          <>
            <Ionicons name="home-outline" size={50} color="#666" />
            <Text style={styles.emptyText}>No properties found</Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollView: {
    minWidth: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    minHeight: "100%",
    paddingTop: 5,
    paddingBottom: 20,
    rowGap: 15,
  },
  list: {
    width: "100%",
  },
  emptyText: {
    color: "#666",
    fontSize: 17,
    marginTop: 5,
    marginBottom: 100,
  }
});
