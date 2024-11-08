import { StyleSheet, SafeAreaView, View, FlatList, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import InfoCard from "../Components/InfoCard";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [order, setOrder] = useState("New");
  const [properties, setProperties] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.filterBtn}>
          <Ionicons name="funnel-outline" size={25} color="#fff" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder='Search' />
          <Ionicons name="search" size={20} color="#508D4E" />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ alignItems: "center" }} style={{ flex: 1, width: "100%" }}>
        {properties?.map((property) => (
          <InfoCard property={property} />
        ))}
      </ScrollView>

      {/* <FlatList
        style={styles.list}
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        data={properties}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      /> */}
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
  searchContainer: {
    marginVertical: 15,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    height: 50,
  },
  filterBtn: {
    backgroundColor: "#508D4E",
    padding: 12,
    aspectRatio: 1,
    borderRadius: "50%"
  },
  inputContainer: {
    flex: 1,
    height: "100%",
    borderColor: "#508D4E",
    borderWidth: 1,
    borderRadius: "50%",
    marginLeft: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    height: "100%"
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  sortItem: {
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    marginHorizontal: 5,
    borderRadius: 6,
    height: 30
  },
  selectedSortItem: {
    backgroundColor: "#508D4E"
  },
  sortTxt: {
    color: "#757575",
    fontSize: 16
  },
  selectedSortTxt: {
    color: "white"
  },
  list: {
    width: "100%",
  },
});
