import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PropertyOwnerCard({ id, name, uri, phoneNumber }) {
  const navigation = useNavigation();

  const openProfile = () => {
    navigation.navigate("Profile", { userId: id });
  }

  const handleCall = () => {
    Linking.openURL(`tel:+962${phoneNumber.slice(1)}`);
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {uri ? (
          <Image style={styles.image} source={{ uri }} />
        ) : (
          <View style={styles.image}>
            <Ionicons name="person" color="#666" size={22} />
          </View>
        )}
        <View>
          <Text style={styles.subText}>owner</Text>
          <Text style={styles.mainText}>{name}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.7} style={styles.circleBtn} onPress={handleCall}>
          <Ionicons name="call" size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.greenBtn} onPress={openProfile}>
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
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#508D4E",
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
