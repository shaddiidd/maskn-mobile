import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Checkbox({ value, setValue, label }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setValue(!value)}
      activeOpacity={0.7}
    >
      <View style={styles.checkbox}>
        {value && <Ionicons name="checkmark" size={20} color="white" />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});
