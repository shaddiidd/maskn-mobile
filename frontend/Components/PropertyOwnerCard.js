import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PropertyOwnerCard({ id, name, imageUrl, phoneNumber }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={styles.image} source={imageUrl} />
        <View>
          <Text style={styles.subText}>owner</Text>
          <Text style={styles.mainText}>{name}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.7} style={styles.circleBtn}>
          <Ionicons name="call" size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.greenBtn} onPress={""}>
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500" }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    columnGap: 10,
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  mainText: {
    fontSize: 17,
    fontWeight: "500",
  },
  subText: {
    fontSize: 15,
    color: "#828282",
  },
  greenBtn: {
    backgroundColor: "#508D4E",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 7
  },
  circleBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#508D4E",
    width: 30,
    height: 30,
    borderRadius: 15,
  }
});
