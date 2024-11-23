import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Reviews({ reviews, seeAll = false }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        <TouchableOpacity activeOpacity={0.7}>
            {seeAll ? <Text style={styles.seeAll}>See all</Text> : <></>}
        </TouchableOpacity>
      </View>
      {reviews.length > 0 ? reviews.map((review) => (
      <View key={review.id} style={styles.card}>
        <View style={styles.starContainer}>
            {Array(review.star_rating).fill(0).map((_, index) => (
                <Image 
                    key={index} 
                    style={styles.star} 
                    source={require("../assets/star.png")} 
                />
            ))}
            {Array(5 - review.star_rating).fill(0).map((_, index) => (
                <Image 
                    key={index} 
                    style={styles.star} 
                    source={require("../assets/star-outline.png")} 
                />
            ))}
        </View>
        <View style={{ marginVertical: 25 }}>
            <Text style={styles.title}>{review.title}</Text>
            <Text style={styles.description}>{review.description}</Text>
        </View>
        <View style={styles.user}>
          <Image style={styles.profile_picture} source={review.profile_picture} />
          <View>
            <Text style={styles.name}>{review.name}</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>
        </View>
      </View>
      )) : (
        <Text>No reviews yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5
  },
  title: {
    fontSize: 24,
    fontWeight: '600',

  },
  seeAll: {
    color: "#508D4E",
    fontSize: 18,
    fontWeight: "600"
  },
  card: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    minWidth: "100%",
    paddingHorizontal: 20,
    paddingVertical: 25,
    justifyContent: "space-between",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  star: {
    marginRight: 5
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
    marginTop: 2
  },
  user: {
    flexDirection: "row",
    alignItems: "center"
  },
  profile_picture: {
    height: 45,
    width: 45,
    borderRadius: 25,
    marginRight: 10
  },
  name: {
    fontSize: 17,
    color: "#757575",
    fontWeight: "600"
  },
  date: {
    color: "#B3B3B3",
    marginTop: 1
  }
});
