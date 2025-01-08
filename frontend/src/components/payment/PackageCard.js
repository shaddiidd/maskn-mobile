import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../helpers/dateFunctions";

export default function PackageCard({ pack }) {
  const navigation = useNavigation();
  const handlePress = () => 
    navigation.navigate("Payment", {
      id: pack.packageId,
      name: `${pack.name} Plan`,
      price: pack.price,
      additionalInfo: {
        From: formatDate(Date.now()),
        To: formatDate(Date.now() + 30 * 24 * 60 * 60 * 1000),
      }
    })

  return (
    <TouchableOpacity style={{ width: "100%" }} activeOpacity={0.7} onPress={handlePress}>
      <LinearGradient colors={["#508D4E", "#8AB489"]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.iconContainer}>
            <Ionicons name="home" size={30} color="#508D4E" />
          </View>
          <View>
            <Text style={styles.title}>{pack?.name}</Text>
            <Text style={styles.description}>{pack?.description}</Text>
          </View>
        </View>
        <Text style={styles.price}>JD {pack?.price}/m</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    width: "100%",
    textAlign: "right",
  },
});
