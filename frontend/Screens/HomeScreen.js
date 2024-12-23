import { StyleSheet, View, RefreshControl, ScrollView, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import PropertyCard from "../Components/PropertyCard";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { get } from "../fetch";
import Context from "../Context";
import SearchModal from "../Components/SearchModal";

export default function HomeScreen() {
  const { setLoading } = useContext(Context);
  const [properties, setProperties] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProperties = async () => {
    try {
      const response = await get("property")
      setProperties(response.data);
    } catch (error) {
      setProperties([]);
      console.log(error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchProperties();
  }, []);

  if (properties === null) return <></>

  return (
    <View style={styles.container}>
      <SearchModal />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Text style={styles.emptyText}>No properties yet</Text>
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
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
    flex: 1,
    width: "100%"
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
