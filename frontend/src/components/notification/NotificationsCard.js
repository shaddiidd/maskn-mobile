import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { capitalizeFirstLetter } from "../../helpers/textFunctions";

export default function NotificationsCard({ notification }) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={2} style={styles.text}>
          {notification.content}
        </Text>
        <Text style={styles.time}>
          {capitalizeFirstLetter(
            formatDistanceToNow(new Date(notification.created), { addSuffix: true })
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  iconContainer: {
    backgroundColor: "#508D4E",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#888",
    fontWeight: "400",
  },
});
