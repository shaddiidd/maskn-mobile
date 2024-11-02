import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import TourRequestsCard from '../components/TourRequestsCard';

export default function TourRequestsScreen() {
  const requests = [
    { id: '1', name: "Hazem Odeh", property: "750 SQM Villa", image: require("../assets/hazodeh.png") },
    { id: '2', name: "Anas Bajawi", property: "750 SQM Villa", image: require("../assets/anas.png") },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={requests}
        renderItem={TourRequestsCard}
        keyExtractor={item => item.id}
        style={{ width: "90%" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
