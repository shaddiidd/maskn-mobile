import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { get } from "../fetch";
import PackageCard from "../Components/PackageCard";

export default function BecomeRenter() {
  const [packs, setPacks] = useState([
    { packageId: 1, name: "Basic", price: 5, description: "List 1 property" },
    {
      packageId: 2,
      name: "Standard",
      price: 10,
      description: "List up to 5 properties",
    },
    {
      packageId: 3,
      name: "Premium",
      price: 20,
      description: "List unlimited properties",
    },
  ]);

  //   useEffect(() => {
  //     get("subscriptionPlans")
  //       .then((response) => {
  //         setPacks(response.result);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Plans</Text>
      {packs.length > 0 ? (
        packs.map((pack) => <PackageCard key={pack.packageId} pack={pack} />)
      ) : (
        <Text>No packages found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    width: "100%",
    marginBottom: 20
  },
});
