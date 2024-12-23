import { StyleSheet, Text, View } from "react-native";
import NotificationsCard from "../Components/NotificationsCard";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
// import { get } from "../fetch";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // get("notifications")
    //   .then((response) => {
    //     setNotifications(response.result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setNotifications([
      { id: 1, content: "lorem ipsum dolor sit amet consectetur adipisicing elit", created: Date.now() },
      { id: 2, content: "lorem ipsum dolor sit amet consectetur", created: Date.now() },
      { id: 3, content: "lorem ipsum dolor sit amet consectetur adipisicing", created: Date.now() },
    ])
  }, []);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", gap: 15 }} style={styles.container}>
      {notifications?.map((notification) => (
          <NotificationsCard key={notification.id} notification={notification} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
