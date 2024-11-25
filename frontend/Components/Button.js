import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({ text, onPress, outline = false, small = false }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, outline && styles.outline, small && styles.small]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, outline && styles.outlineButtonText]}>{text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#508D4E",
    borderWidth: 2,
    borderColor: "#508D4E",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderRadius: 10,
    marginTop: 10,
    width: "100%"
  },
  small: {
    width: "47%"
  },
  outline: {
    backgroundColor: "white",
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