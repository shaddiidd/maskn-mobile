import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Reviews from "../Components/Reviews";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import Context from "../Context";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useContext(Context);
  const infoItems = [
    { icon: "work-outline", text: "Student" },
    { icon: "people-outline", text: "Single" },
    { icon: "location-on", text: "Jordanian" },
  ];
  const reviews = [
    {
      id: 1,
      star_rating: 5,
      profile_picture: require("../assets/hazodeh.png"),
      name: "Hazem Odeh",
      date: "August 5, 2024",
      title: "Review title",
      description: "Review description",
    },
    {
      id: 2,
      star_rating: 3,
      profile_picture: require("../assets/anas.png"),
      name: "Anas Bajawi",
      date: "August 5, 2024",
      title: "Review title",
      description: "Review description",
    },
  ];

  return (
    <ScrollView
      bounces={false}
      style={{ paddingHorizontal: 20, backgroundColor: "white" }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Image style={styles.profile_picture} source={require("../assets/hazodeh.png")} /> */}
            <View style={styles.profile_picture}>
              <Ionicons name="person" color="#666" size={25} />
            </View>
            <View>
              <Text style={styles.name}>
                {user.firstName} {user.lastName}
              </Text>
              <View style={styles.ratingContainer}>
                <Image source={require("../assets/star.png")} />
                <Text style={styles.rating}> {user?.rating || 5}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.editBtn}>
            <Icon name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          {infoItems.map((item, index) => (
            <View
              key={index}
              style={[
                styles.infoItem,
                index % 2 === 1 ? styles.rightAlignedItem : null,
              ]}
            >
              <Icon name={item.icon} size={24} color="#000" />
              <Text style={styles.infoTxt}>{item.text}</Text>
            </View>
          ))}
        </View>
        {/* <TouchableOpacity activeOpacity={0.7} style={styles.historyBtn}>
          <Icon name="history" size={25} color="#fff" />
          <Text style={styles.historyBtnTxt}>  RENT HISTORY</Text>
        </TouchableOpacity> */}
        <Button
          text="rent history"
          onPress={() => navigation.navigate("RentHistory")}
        />
        <Reviews reviews={reviews} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    borderWidth: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 25,
    borderRadius: 10,
    borderColor: "#D9D9D9",
  },
  profile_picture: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 10,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#508D4E"
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  rating: {
    fontSize: 18,
    color: "#1E1E1E",
  },
  editBtn: {
    backgroundColor: "#508D4E",
    borderRadius: 50,
    padding: 5,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "95%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginVertical: 5,
  },
  rightAlignedItem: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  infoTxt: {
    color: "#747474",
    fontSize: 18,
    marginLeft: 8,
  },
  historyBtn: {
    backgroundColor: "#508D4E",
    borderWidth: 1.5,
    borderColor: "#508D4E",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderRadius: 10,
    marginTop: 20,
  },
  historyBtnTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
