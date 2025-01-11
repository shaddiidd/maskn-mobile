import { StyleSheet, View, RefreshControl, ScrollView, Text, Alert } from "react-native";
import PropertyCard from "../components/property/PropertyCard";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { get } from "../utils/fetch";
import Context from "../context/Context";
import SearchModal from "../components/property/SearchModal";

export default function HomeScreen() {
  const { setLoading } = useContext(Context);
  const [properties, setProperties] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProperties = async () => {
    try {
      const response = await get("property")
      setProperties(response.data);
    } catch {
      Alert.alert("Error", "Failed to get properties");
      setProperties([]);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchProperties();
  }, []);

  if (properties === null) return <View style={{ flex: 1, backgroundColor: "white" }} />;
  return (
    <View style={styles.container}>
      <SearchModal />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchProperties(); }} />}
        contentContainerStyle={[styles.scrollContainer, { flex: 1, justifyContent: properties?.length ? "flex-start" : "center", }]}
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
    width: "100%"
  },
  scrollContainer: {
    alignItems: "center",
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
