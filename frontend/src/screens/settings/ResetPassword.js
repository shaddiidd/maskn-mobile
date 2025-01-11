import React, { useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import AuthInput from "../../components/authentication/AuthInput";
import Button from "../../ui/Button";
import { put } from "../../utils/fetch";
import Context from "../../context/Context";

export default function ResetPassword({ navigation }) {
  const [values, setValues] = useState({
    password: { value: "", error: "" },
    passwordConfirmation: { value: "", error: "" },
  });
  const { setLoading } = useContext(Context);

  const validateFields = () => {
    let isValid = true;
    let passwordError = "";
    let passwordConfirmationError = "";

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!values.password.value.trim()) {
      passwordError = "Password is required";
      isValid = false;
      setValues((prev) => ({
        ...prev,
        password: { value: "", error: passwordError },
        passwordConfirmation: { value: "", error: "" },
      }));
    } else if (!passwordRegex.test(values.password.value)) {
      passwordError =
        "Password must be at least 8 characters, include a number, a symbol, and an uppercase letter";
      isValid = false;
      setValues((prev) => ({
        ...prev,
        password: { value: "", error: passwordError },
        passwordConfirmation: { value: "", error: "" },
      }));
    }

    if (!values.passwordConfirmation.value.trim()) {
      passwordConfirmationError = "Password confirmation is required";
      isValid = false;
      setValues((prev) => ({
        ...prev,
        passwordConfirmation: { value: "", error: passwordConfirmationError },
      }));
    } else if (values.passwordConfirmation.value !== values.password.value) {
      passwordConfirmationError = "Password confirmation does not match password";
      isValid = false;
      setValues((prev) => ({
        ...prev,
        passwordConfirmation: { value: "", error: passwordConfirmationError },
      }));
    }

    if (!passwordError && !passwordConfirmationError) {
      setValues((prev) => ({
        ...prev,
        password: { ...prev.password, error: "" },
        passwordConfirmation: { ...prev.passwordConfirmation, error: "" },
      }));
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;
    setLoading(true);
    try {
        await put("users/update-profile", { password: values.password.value });
        Alert.alert("Success", "Your password has been updated successfully", [{ text: "OK" }]);
        navigation.pop();
    } catch (error) {
      console.log(error.response.data);
      Alert.alert("Error", "There was a problem updating your password", [{ text: "OK" }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your new password below</Text>
            <AuthInput
              placeholder="New Password"
              password
              value={values.password.value}
              setValue={(value) =>
                setValues({ ...values, password: { value, error: "" } })
              }
              error={values.password.error}
            />
            <AuthInput
              placeholder="Confirm Password"
              password
              value={values.passwordConfirmation.value}
              setValue={(value) =>
                setValues({
                  ...values,
                  passwordConfirmation: { value, error: "" },
                })
              }
              error={values.passwordConfirmation.error}
            />

            <Button text="Reset Password" onPress={handleSubmit} />
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
      fontSize: 22,
      fontWeight: "600",
      marginVertical: 5,
      textAlign: "center",
  },
  subtitle: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: "center",
  },
});
