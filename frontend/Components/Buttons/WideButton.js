import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function WideButton({ text, onPress, outline = false }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, outline && styles.outline]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, outline && styles.outlineButtonText]}>{text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#508D4E",
    borderWidth: 1.5,
    borderColor: "#508D4E",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderRadius: 10,
    marginTop: 10,
    flex: 1
  },
  outline: {
    backgroundColor: "none",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  outlineButtonText: {
    color: "#508D4E",
  },
});
