import { Alert, StyleSheet, Text, View, ScrollView } from "react-native";
import NotificationsCard from "../../components/notification/NotificationsCard";
import { useEffect, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { get } from "../../utils/fetch";
import Context from "../../context/Context";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(null);
  const { setLoading } = useContext(Context);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await get("notification/get-notification");
        setNotifications(response.data.sort((a, b) => new Date(b.created) - new Date(a.created)));
      } catch {
        Alert.alert("Error", "Failed to get notifications");
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (notifications === null) return <View style={{ flex: 1, backgroundColor: "white" }} />;
  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", gap: 15 }} style={styles.container}>
      {notifications?.length ? notifications?.map((notification) => (
        <NotificationsCard key={notification.id} notification={notification} />
      )) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Ionicons name="notifications-outline" size={50} color="#666" />
          <Text style={styles.noContent}>You have no notifications</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  noContent: {
    color: "#666",
    fontSize: 17,
    marginTop: 5,
    marginBottom: 100,
  }
});
