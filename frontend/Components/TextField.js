import { TextInput, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TextField({
  value,
  setValue,
  placeholder,
  icon,
  error,
  small = false,
}) {
  return (
    <View style={[styles.container, small && { flex: 1 }]}>
      {icon && <Ionicons name={icon} size={25} style={{ marginRight: 10 }} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={setValue}
        style={styles.input}
        autoCorrect={false}
      />
      {error && <Text style={styles.errorText}>This field is required</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    height: 45,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    borderColor: "red",
  },
  input: {
    flex: 1,
  },
});
