import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InfoCard({ property }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={() => navigation.navigate("PropertyDetails", { property })}>
      <Image style={styles.image} source={""} />
      <Text style={styles.title}>{property.title}</Text>
      <View style={styles.line3}>
        <Text style={styles.price}>JD {property.price}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTxt}>{property.rating || "5"} </Text>
          <Image style={styles.star} source={require("../assets/star.png")} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 12,
    width: "90%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: "100%",
    height: 200,
    backgroundColor: "lightgrey"
  },
  title: {
    fontSize: 18,
    width: "100%",
    marginTop: 15,
    paddingHorizontal: 15
  },
  line3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 15
  },
  price: {
    fontSize: 18,
    fontWeight: "500"
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  ratingTxt: {
    fontSize: 18,
  },
  star: {
    width: 22,
    height: 22,
    resizeMode: "contain"
  }
});
