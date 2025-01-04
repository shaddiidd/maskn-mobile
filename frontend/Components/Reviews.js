import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function Reviews({ reviews, seeAll = false, additionalStyles = {} }) {
  return (
    <View style={[styles.container, additionalStyles]}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        {/* <TouchableOpacity activeOpacity={0.7}>
          {seeAll ? <Text style={styles.seeAll}>See all</Text> : <></>}
        </TouchableOpacity> */}
      </View>
      {reviews.length > 0 ? reviews.map((review, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.user}>
            {review?.tenant?.profile_photo?.length ? (
              <Image style={styles.profile_picture} source={{ uri: review?.tenant?.profile_photo[0] }} />
            ) : (
              <View style={styles.profile_picture}>
                <Ionicons name="person" color="#666" size={22} />
              </View>
            )}
            {console.log(review)}
            <View>
              <Text style={styles.name}>{review?.tenant?.first_name} {review?.tenant?.last_name}</Text>
              <Text style={styles.username}>@{review?.tenant?.username}</Text>
            </View>
          </View>
          <Text style={styles.description}>{review.review_text}</Text>
        </View>
      )) : (
        <Text style={styles.noReviews}>No reviews yet...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 20,
    rowGap: 15,
    width: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: -10,
  },
  seeAll: {
    color: "#508D4E",
    fontSize: 18,
    fontWeight: "600"
  },
  card: {
    borderRadius: 8,
    minWidth: "100%",
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 12,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    rowGap: 10
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  description: {
    fontSize: 15,
    color: "#666",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 15
  },
  profile_picture: {
    height: 45,
    width: 45,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#508D4E"
  },
  name: {
    fontSize: 17,
    fontWeight: "600"
  },
  username: {
    color: "#B3B3B3",
  },
  noReviews: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
    width: "100%",
  }
});
