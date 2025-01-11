import { StyleSheet, TouchableOpacity, TextInput, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';

export default function AuthInput({ placeholder, value, setValue, error, password = false, keyboardType = "default", autoCapitalize = false, innerPlaceholder = "" }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.label}>{placeholder}</Text>
      <TextInput
        placeholder={innerPlaceholder}
        value={value}
        onChangeText={setValue}
        style={[styles.input, error && styles.errorInput]}
        keyboardType={keyboardType}
        secureTextEntry={password && !showPassword}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
      {(password && value.length) ? (
        <TouchableOpacity style={styles.eye} activeOpacity={0.7} onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} color="#666" size={25} />
        </TouchableOpacity>
      ) : null}
      {error && <Text style={styles.errorText}>{error.length ? error : "This field is required"}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    height: 55,
    width: "100%",
    fontSize: 16,
  },
  label: {
    color: "#333",
    marginLeft: 5,
    marginBottom: -3
  },
  errorInput: {
    borderColor: "#C6131B",
  },
  errorText: {
    color: "#C6131B",
    marginBottom: 10,
    width: "100%",
  },
  eye: {
    position: "absolute",
    right: 15,
    top: "50%", // Place it vertically at the center
    transform: [{ translateY: -5 }], // Adjust based on icon size (25px height, so move up by half)
  },
});
