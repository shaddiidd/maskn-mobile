import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsCard({ notification }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={25} color="#fff" />
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.text}>
          {notification.content}
        </Text>
        <Text style={styles.time}>
          {formatDistanceToNow(new Date(notification.created), {
            addSuffix: true,
          })}
        </Text>
      </View>
    </TouchableOpacity>
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
    fontSize: 18,
    width: "100%",
  },
  time: {
    color: "grey",
    width: "100%",
  },
});
