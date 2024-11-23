import { StyleSheet, Text, View } from "react-native";

export default function Payment() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    width: "100%",
    marginBottom: 20,
  },
});
