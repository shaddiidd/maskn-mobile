import { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import BillCard from "../Components/BillCard";

export default function UtilitiesScreen() {
  const [utilities, setUtilities] = useState([
    { id: 6, type: "water", payed: false, month: 2 },
    { id: 5, type: "electricity", payed: false, month: 2 },
    { id: 4, type: "water", payed: false, month: 1 },
    { id: 3, type: "electricity", payed: true, month: 1 },
    { id: 2, type: "water", payed: true, month: 0 },
    { id: 1, type: "electricity", payed: true, month: 0 },
  ]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const groupedUtilities = utilities.reduce((acc, utility) => {
    const monthName = months[utility.month];
    if (!acc[monthName]) acc[monthName] = [];
    acc[monthName].push(utility);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {Object.keys(groupedUtilities).map((monthName) => (
        <View key={monthName} style={styles.section}>
          <Text style={styles.title}>{monthName}</Text>
          {groupedUtilities[monthName].map((utility) => (
            <BillCard
              key={utility.id}
              type={utility.type}
              payed={utility.payed}
              month={monthName}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  section: {
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 10,
  },
});
