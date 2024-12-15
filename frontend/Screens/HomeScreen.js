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
import { useEffect, useState, useContext } from "react";
import { get } from "../fetch";
import Context from "../Context";
import SearchModal from "../Components/SearchModal";

export default function HomeScreen() {
  const { setLoading } = useContext(Context);
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    setLoading(true);
    get("property")
      .then((response) => {
        setProperties(response.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (properties === null) return <></>

  return (
    <View style={styles.container}>
      <SearchModal />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            minHeight: "100%",
            justifyContent: properties?.length ? "flex-start" : "center",
            paddingTop: 5,
            paddingBottom: 20,
            rowGap: 15,
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
                No properties yet
              </Text>
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
  list: {
    width: "100%",
  },
});
