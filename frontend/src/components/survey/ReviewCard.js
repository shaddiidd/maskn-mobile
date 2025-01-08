import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function ReviewCard({ imageUri, title, subtitle, review }) {
  return (
    <View style={styles.card}>
      <View style={styles.user}>
        {imageUri ? (
          <Image style={styles.profile_picture} source={{ uri: imageUri }} />
        ) : (
          <View style={styles.profile_picture}>
            <Ionicons name="person" color="#666" size={22} />
          </View>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      <Text style={styles.review}>{review}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 12,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    rowGap: 10,
    marginTop: 20
  },
  review: {
    fontSize: 15,
    color: "#666",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
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
  title: {
    fontSize: 17,
    fontWeight: "600"
  },
  subtitle: {
    color: "#B3B3B3",
  },
});
