import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TourRequestsCard from '../Components/TourRequestsCard';
import { useNavigation } from '@react-navigation/native';

export default function TourRequestsScreen() {
  const navigation = useNavigation();
  const [hasReceivedRequests, setHasReceivedRequests] = useState(true);

  const sentRequests = [
    { id: '1', name: "Hazem Odeh", property: "750 SQM Villa", image: require("../assets/hazodeh.png") },
    { id: '2', name: "Anas Bajawi", property: "750 SQM Villa", image: require("../assets/anas.png") },
  ];

  const receivedRequests = [
    { id: '3', name: "Mona Salman", property: "500 SQM Apartment", image: require("../assets/anas.png") },
    { id: '4', name: "Khaled Youssef", property: "1000 SQM Villa", image: require("../assets/anas.png") },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, []);

  const SentRequests = () => (
    <FlatList
      data={sentRequests}
      renderItem={TourRequestsCard}
      keyExtractor={item => item.id}
      style={{ width: "100%" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 20, paddingHorizontal: 20, width: "100%" }}
    />
  );

  const ReceivedRequests = () => (
    <FlatList
      data={receivedRequests}
      renderItem={TourRequestsCard}
      keyExtractor={item => item.id}
      style={{ width: "100%" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 20, paddingHorizontal: 20, width: "100%" }}
    />
  );

  const initialRoutes = [
    { key: 'sent', title: 'Sent Requests' },
    ...(hasReceivedRequests ? [{ key: 'received', title: 'Received Requests' }] : []),
  ];

  const renderScene = SceneMap({
    sent: SentRequests,
    received: hasReceivedRequests ? ReceivedRequests : () => <View />,
  });

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index: 0, routes: initialRoutes }}
        renderScene={renderScene}
        onIndexChange={index => { }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#508D4E' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
