import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TourRequestsCard from '../Components/TourRequestsCard';
import { useNavigation } from '@react-navigation/native';
import Context from '../Context';
import { get, post } from '../fetch';
import { Ionicons } from "@expo/vector-icons";

export default function TourRequestsScreen() {
  const navigation = useNavigation();
  const { setLoading, user } = useContext(Context);

  const [sentRequests, setSentRequests] = useState(null);
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await get("property/get-tour-requests");
      const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const sent = sorted.filter(request => request.tenant_id === user.userId);
      const received = sorted.filter(request => request.owner_id === user.userId);
      setSentRequests(sent);
      setReceivedRequests(received);
    } catch {
      Alert.alert("Error", "Failed to get requests");
      setSentRequests([]);
      setReceivedRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRequests();
  }, []);

  const handleAccept = async (request_id) => {
    try {
      await post(`property/accept-tour-request/${request_id}`);
      fetchRequests();
      Alert.alert("Request Accepted", "The request has been accepted successfully", [{ text: "OK" }]);
    } catch (error) {
      Alert.alert("Error", "Failed to accept request");
    }
  }

  const SentRequests = () => {
    if (sentRequests.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Ionicons name="home-outline" size={50} color="#666" />
          <Text style={styles.emptyText}>No sent requests</Text>
        </View>
      );
    }
    return (
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center", paddingTop: 0, padding: 10, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {sentRequests.map((item) => (
          <TourRequestsCard key={item.request_id} type="sent" item={item} />
        ))}
      </ScrollView>
    );
  };

  const ReceivedRequests = () => {
    if (receivedRequests.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Ionicons name="home-outline" size={50} color="#666" />
          <Text style={styles.emptyText}>No received requests</Text>
        </View>
      );
    }
    return (
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center", paddingTop: 0, padding: 10, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {receivedRequests.map((item) => (
          <TourRequestsCard handleAccept={handleAccept} key={item.request_id} type="received" item={item} />
        ))}
      </ScrollView>
    );
  };

  if (sentRequests === null) return <View style={{ flex: 1, backgroundColor: "white" }} />;
  return (
    <SafeAreaView style={styles.container}>
      {user.role === 1 ? <SentRequests /> : <ReceivedRequests />}
    </SafeAreaView>
  );

//   const initialRoutes = [
//     { key: 'sent', title: 'Sent' },
//     { key: 'received', title: 'Received' },
//   ];

//   const renderScene = SceneMap({
//     sent: SentRequests,
//     received: ReceivedRequests,
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <TabView
//         navigationState={{ index: 0, routes: initialRoutes }}
//         renderScene={renderScene}
//         onIndexChange={(index) => { }}
//         renderTabBar={(props) => (
//           <TabBar
//             {...props}
//             indicatorStyle={{ backgroundColor: 'white' }}
//             style={{ backgroundColor: '#508D4E' }}
//             labelStyle={{ fontWeight: 'bold' }}
//           />
//         )}
//       />
//     </SafeAreaView>
//   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyText: {
    color: "#666",
    fontSize: 17,
    marginTop: 5,
  }
});
