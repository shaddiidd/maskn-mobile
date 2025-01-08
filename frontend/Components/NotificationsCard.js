import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { capitalizeFirstLetter } from "../helpers/textFunctions";

export default function NotificationsCard({ notification }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={25} color="#fff" />
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={2} style={styles.text}>{notification.content}</Text>
        <Text style={styles.time}>
          {capitalizeFirstLetter(formatDistanceToNow(new Date(notification.created), { addSuffix: true }))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 5
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
    paddingLeft: 10
  },
  iconContainer: {
    backgroundColor: "#508D4ECC",
    padding: 8,
    borderRadius: 5,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    width: "100%",
  },
  time: {
    color: "grey",
    width: "100%",
  },
});