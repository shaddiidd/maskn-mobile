import { Alert, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

export default function PaymentMethodCard({ paymentMethod, onPress, remove }) {
  const handleRemove = () => {
    Alert.alert(
      "Delete Payment Method",
      "Are you sure you want to delete this payment method?",
      [
        { text: "Cancel", style: "cancel", },
        { text: "Delete", style: "destructive", onPress: remove },
      ]
    );
  };  
  return (
    <TouchableOpacity style={styles.container} activeOpacity={onPress ? 0.7 : 1} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={ paymentMethod?.type === "visa" ? require("../../assets/card-icons/visa.png") : require("../../assets/card-icons/master.png")} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.name}>{paymentMethod?.name}</Text>
          <Text style={styles.number}>{paymentMethod?.displayNumber}</Text>
        </View>
      </View>
      {remove && <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7} onPress={handleRemove}>
        <Ionicons name="trash" size={15} color="white" />
      </TouchableOpacity>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    width: "100%",
    marginBottom: 5,
  },
  iconContainer: {
    backgroundColor: "#C6131B",
    padding: 8,
    borderRadius: 50,
  },
});
