import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BillCard({ bill }) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Payment", {
      name: "Water Bill",
      price: "53.762",
      additionalInfo: {
        Reference: "01/76515/185241",
        Month: "September",
      },
    })
  }
  return (
    <View activeOpacity={0.7} style={styles.container}>
      <Text style={styles.title}>Water Bill</Text>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        <Text style={styles.payBtn}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  payBtn: {
    fontSize: 16,
    color: "#508D4E",
    fontWeight: "600",
  }
});
