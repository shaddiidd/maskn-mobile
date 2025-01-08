import { TextInput, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TextField({ value, setValue, placeholder, icon, error, small, textarea, ar, additionalStyles = {}, keyboardType = "default" }) {
  return (
    <View style={[styles.container, small && { flex: 1 }, additionalStyles, error && styles.error, textarea && styles.textareaContainer]}>
      {icon && <Ionicons name={icon} size={25} style={{ marginRight: 10 }} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={setValue}
        style={[textarea ? styles.textarea : styles.input,ar && { textAlign: "right" }]}
        autoCorrect={false}
        multiline={textarea}
        numberOfLines={textarea ? 6 : 1}
        scrollEnabled={textarea}
        keyboardType={keyboardType}
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
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    borderColor: "red",
  },
  input: {
    width: "100%",
    height: 40,
    fontSize: 15
  },
  textarea: {
    width: "100%",
    minHeight: 100,
    maxHeight: 200,
    textAlignVertical: "top",
    paddingTop: 10,
    fontSize: 15
  },
  textareaContainer: {
    alignItems: "flex-start",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});