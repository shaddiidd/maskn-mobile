import { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Reviews from "../Components/Reviews";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import Context from "../Context";
import { Ionicons } from "@expo/vector-icons";
import { get } from "../fetch";

export default function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const { user, setLoading } = useContext(Context);
  const userId = route?.params?.userId;

  const fetchProfile = async () => {
    try {
      const response = await get(`users/${userId}`);
      console.log(response.data);
      // setProfile(response.data);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // if (userId) {
    //   setLoading(true);
    //   fetchProfile(userId);
    // } else {
      setProfile(user);
    // }
  }, [userId]);

  // const infoItems = [
  //   { icon: "work-outline", text: "Student" },
  //   { icon: "people-outline", text: "Single" },
  //   { icon: "location-on", text: "Jordanian" },
  // ];
  const reviews = [
    { id: 1, star_rating: 5, profile_picture: require("../assets/hazodeh.png"), name: "Hazem Odeh", date: "August 5, 2024", title: "Review title", description: "Review description" },
    { id: 2, star_rating: 3, profile_picture: require("../assets/anas.png"), name: "Anas Bajawi", date: "August 5, 2024", title: "Review title", description: "Review description" },
  ];

  if (profile === null) return null;
  return (
    <ScrollView
      bounces={false}
      style={{ paddingHorizontal: 20, backgroundColor: "white" }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {profile?.profile_picture ? (
              <Image style={styles.profilePicture} source={{ uri: profile?.profile_picture }} />
            ) : (
              <View style={styles.profilePicture}>
                <Ionicons name="person" color="#666" size={32} />
              </View>
            )}
            <View>
              <Text style={styles.name}>{profile?.firstName} {profile?.lastName}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={22} color="gold" />
                <Text style={styles.rating}> {profile?.rating || 5}</Text>
              </View>
            </View>
          </View>
          {userId ? (
            <TouchableOpacity activeOpacity={0.7} style={styles.circleBtn}>
              <Icon name="phone" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.7} style={styles.circleBtn} onPress={() => navigation.navigate("EditProfile")}>
              <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="email" size={24} color="#333" />
            <Text style={styles.infoTxt}>{profile?.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="phone" size={24} color="#333" />
            <Text style={styles.infoTxt}>{profile?.phoneNumber || "No phone number"}</Text>
          </View>
        </View>

        {/* <View style={styles.infoContainer}>
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
        </View> */}
        {/* <TouchableOpacity activeOpacity={0.7} style={styles.historyBtn}>
          <Icon name="history" size={25} color="#fff" />
          <Text style={styles.historyBtnTxt}>  RENT HISTORY</Text>
        </TouchableOpacity> */}
        <Button text="rent history" onPress={() => navigation.navigate("RentHistory")} />
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
  profilePicture: {
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
  circleBtn: {
    backgroundColor: "#508D4E",
    borderRadius: 50,
    padding: 5,
  },
  infoContainer: {
    marginTop: 10,
    width: "100%",
    rowGap: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    width: "100%",
    paddingHorizontal: 10,
  },
  rightAlignedItem: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  infoTxt: {
    color: "#333",
    fontSize: 15,
  },
});
