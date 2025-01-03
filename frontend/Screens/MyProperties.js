import { StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Text, Alert } from "react-native";
import PropertyCard from "../Components/PropertyCard";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { get } from "../fetch";
import { useNavigation } from "@react-navigation/native";
import Context from "../Context";

export default function MyProperties() {
  const navigation = useNavigation();
  const { setLoading } = useContext(Context);
  const [properties, setProperties] = useState(null);

  const fetchProperties = async () => {
    try {
      const response = await get("property/get-by-user-id");
      setProperties(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to get properties");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchProperties();
  }, []);

  if (properties === null) return <></>;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { justifyContent: properties?.length ? "flex-start" : "center" }]} style={{ flex: 1, width: "100%" }}>
        {properties?.length ? (
          properties?.map((property) => (
            <PropertyCard key={property.property_id} property={property} />
          ))
        ) : (
          <>
            <Ionicons name="home-outline" size={50} color="#666" />
            <Text style={styles.noContent}>Nothing to show</Text>
          </>
        )}
      </ScrollView>
      <TouchableOpacity activeOpacity={0.7} style={styles.addBtn} onPress={() => navigation.navigate("PostProperty")}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
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
  scrollContainer: {
    alignItems: "center",
    minHeight: "100%",
    paddingTop: 20,
    rowGap: 15,
  },
  noContent: {
    color: "#666",
    fontSize: 17,
    marginTop: 5,
    marginBottom: 100,
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
  addBtn: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: "#508D4E",
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
