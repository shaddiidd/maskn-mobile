import { StyleSheet, TextInput, Text } from 'react-native';

export default function AuthInput({ placeholder, value, setValue, error, password = false, keyboardType = "default", autoCapitalize = false }) {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        style={[styles.input, error && styles.errorInput]}
        keyboardType={keyboardType}
        secureTextEntry={password}
        autoCapitalize={autoCapitalize}
      />
      {error && <Text style={styles.errorText}>This field is required</Text>}
    </>
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
  },
  errorInput: {
    borderColor: "#C6131B",
  },
  errorText: {
    color: "#C6131B",
    marginBottom: 10,
  },
});
