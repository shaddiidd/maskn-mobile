import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({
  text,
  onPress,
  outline = false,
  small = false,
  compressed = false,
  disabled = false,
  additionalStyles = {},
  additionalTextStyles = {}
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        outline && styles.outline,
        small && styles.small,
        compressed && styles.compressed,
        disabled && styles.disabled,
        additionalStyles,
      ]}
      onPress={!disabled ? onPress : null}
    >
      <Text style={[styles.buttonText, outline && styles.outlineButtonText, additionalTextStyles]}>
        {text?.toUpperCase()}
      </Text>
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
    width: "100%",
  },
  small: {
    width: "47%",
  },
  outline: {
    backgroundColor: "transparent",
  },
  compressed: {
    height: 45,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  outlineButtonText: {
    color: "#508D4E",
  },
  disabled: {
    opacity: 0.7
  }
});
