import { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, ScrollView, Image, Linking, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReviewCard from "../../components/survey/ReviewCard";
import { useNavigation } from "@react-navigation/native";
import Context from "../../context/Context";
import { Ionicons } from "@expo/vector-icons";
import { get } from "../../utils/fetch";

export default function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const { user, setLoading } = useContext(Context);
  const userId = route?.params?.userId;

  const fetchProfile = async () => {
    try {
      const response = await get(`users/${userId ? userId : user.userId}`);
      setProfile(response.data.user);
    } catch {
      Alert.alert("Error", "Failed to get profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchProfile();
  }, [userId, user]);

  const handleCall = () => {
    Linking.openURL(`tel:+962${profile?.phone_number.slice(1)}`);
  }

  if (profile === null) return <View style={{ flex: 1, backgroundColor: "white" }} />;
  return (
    <ScrollView style={{ paddingHorizontal: 20, backgroundColor: "white" }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {profile?.profile_photo && profile?.profile_photo.length ? (
                <Image style={styles.profilePicture} source={{ uri: profile?.profile_photo[0] }} />
              ) : (
                <View style={styles.profilePicture}>
                  <Ionicons name="person" color="#666" size={32} />
                </View>
              )}
              <View>
                <Text style={styles.name}>{profile?.first_name} {profile?.last_name}</Text>
                <Text style={styles.infoTxt}>@{profile?.username}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={18} color="gold" />
                  <Text style={styles.rating}> {!profile?.rating ? "Not rated" : profile?.rating}</Text>
                </View>
              </View>
            </View>
            {userId ? (
              <TouchableOpacity activeOpacity={0.7} style={styles.circleBtn} onPress={handleCall}>
                <Icon name="phone" size={20} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.7} style={styles.circleBtn} onPress={() => navigation.navigate("EditProfile")}>
                <Icon name="edit" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.infoItem}>
            <Icon name="email" size={24} color="#000" />
            <Text style={styles.infoTxt}>{profile?.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="phone" size={24} color="#000" />
            <Text style={styles.infoTxt}>{profile?.phone_number}</Text>
          </View>
        </View>
        {profile?.role_id === 1 && <>
          <Text style={styles.title}>Reviews</Text>
          {profile?.tenant_reviews_owner?.length ? profile?.tenant_reviews_owner?.map((review, index) =>
            <ReviewCard
              key={index}
              title={review?.owner?.first_name + " " + review?.owner?.last_name}
              subtitle={"@" + review?.owner?.username}
              imageUri={review?.owner?.profile_picture?.length ? review?.owner?.profile_picture[0] : null}
              review={review?.review_text}
            />
          ) : (
            <Text style={styles.noReviews}>No reviews yet...</Text>
          )}
        </>}
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
    // borderWidth: 1,
    width: "100%",
    // flexDirection: "row",
    rowGap: 5,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    borderColor: "#D9D9D9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
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
    fontSize: 16,
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
  infoTxt: {
    color: "#333",
    fontSize: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    width: "100%",
    marginTop: 20,
    marginBottom: -5
  },
  noReviews: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
    width: "100%",
    marginTop: 10
  }
});
