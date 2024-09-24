import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InfoCard({ property }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={() => navigation.navigate("PropertyDetails", { id: property.id })}>
      <Image style={styles.image} source={property.img} />
      <Text style={styles.title}>{property.title}</Text>
      <View style={styles.line3}>
        <Text style={styles.price}>${property.price}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTxt}>{property.rating} </Text>
          <Image style={styles.star} source={require("../assets/star.png")} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 12
  },
  image: {
    width: "100%",
    borderRadius: 6,
    height: 250,
  },
  title: {
    fontSize: 18,
    width: "100%",
    marginTop: 15
  },
  line3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10
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
