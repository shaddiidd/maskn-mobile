import { TextInput, View, Text, StyleSheet } from "react-native";

export default function LabelTextField({ value, setValue, placeholder, icon, error, small, textarea, ar, additionalStyles = {}, keyboardType = "default", innerPlaceholder = "" }) {
  return (
    <View style={[styles.container, small && { flex: 1 }]}>
      <Text style={styles.label}>{placeholder}</Text>
      <TextInput
        placeholder={innerPlaceholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={setValue}
        style={[
          textarea ? styles.textarea : styles.input,
          ar && { textAlign: "right" },
          additionalStyles,
          error && styles.error,
        ]}
        autoCorrect={false}
        multiline={textarea}
        numberOfLines={textarea ? 6 : 1}
        scrollEnabled={textarea}
        keyboardType={keyboardType}
        textAlignVertical={textarea ? "top" : "center"} // Ensure proper alignment
      />
      {error && <Text style={styles.errorText}>This field is required</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    color: "#333",
    marginBottom: 5,
  },
  error: {
    borderColor: "red",
  },
  input: {
    width: "100%",
    height: 40,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  textarea: {
    width: "100%",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    minHeight: 100, // Minimum height for textarea
    maxHeight: 200, // Maximum height for textarea
    textAlignVertical: "top", // Ensure text starts at the top
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
