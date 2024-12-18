import { StyleSheet, Text, View } from "react-native";

export default function PropertyInfoBox({ title, value }) {
  return (
    <View>
      <View style={styles.infoBox}>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
      <Text style={styles.infoTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    width: 75,
    height: 75,
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  infoTitle: {
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
    marginTop: 10,
    fontSize: 13,
  },
  infoValue: {
    textAlign: "center",
    color: "#508D4E",
    fontWeight: "600",
    fontSize: 18,
    width: "70%",
  },
});
