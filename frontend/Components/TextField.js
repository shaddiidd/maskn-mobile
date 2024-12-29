import { TextInput, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TextField({ value, setValue, placeholder, icon, error, small, textarea, ar, additionalStyles = {} }) {
  return (
    <View style={[styles.container, small && { flex: 1 }, additionalStyles]}>
      {icon && <Ionicons name={icon} size={25} style={{ marginRight: 10 }} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={setValue}
        style={[textarea ? styles.textarea : styles.input, ar && { textAlign: "right" }]}
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
    width: "100%",
    height: "100%",
  },
  textarea: {
    width: "100%",
    minHeight: 200,
    textAlignVertical: "top",
  }
});
