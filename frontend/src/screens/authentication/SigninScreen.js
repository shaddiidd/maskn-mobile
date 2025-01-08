import { useContext, useState } from "react";
import { StyleSheet, ScrollView, Text, View, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import AuthInput from "../../components/authentication/AuthInput";
import Context from "../../context/Context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../ui/Button";

export default function SigninScreen({ navigation }) {
  const { auth } = useContext(Context);
  const [values, setValues] = useState({
    email: { value: "abdullah.shadid49@gmail.com", error: false },
    password: { value: "abdullah", error: false },
  });

  const handleSubmit = () => {
    let isValid = true;
    if (!values.email.value) {
      setValues((prev) => ({ ...prev, email: { ...prev.email, error: true } }));
      isValid = false;
    }
    if (!values.password.value) {
      setValues((prev) => ({
        ...prev,
        password: { ...prev.password, error: true },
      }));
      isValid = false;
    }
    if (isValid) {
      auth({
        email: values.email.value,
        password: values.password.value,
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="dark-content" />
      <ScrollView keyboardShouldPersistTaps="handled" style={{ width: "100%", paddingBottom: 20 }} contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()} style={styles.close}>
          <Ionicons name="close" size={25} />
        </TouchableOpacity>
        <Image style={styles.logo} source={require("../../assets/maskn-green.png")} />
        <View style={{ width: "90%", alignItems: "center", marginVertical: 120 }}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Enter your email and password</Text>
          <AuthInput
            placeholder="Email"
            innerPlaceholder="ahmad@example.com"
            keyboardType="email-address"
            value={values.email.value}
            setValue={(value) =>
              setValues({ ...values, email: { value, error: false } })
            }
            error={values.email.error}
          />
          <AuthInput
            placeholder="Password"
            innerPlaceholder="********"
            password
            value={values.password.value}
            setValue={(value) =>
              setValues({ ...values, password: { value, error: false } })
            }
            error={values.password.error}
          />
          <Button text="Sign In" onPress={handleSubmit} />
          <TouchableOpacity style={{ width: "100%", alignItems: "center", marginTop: 10 }} activeOpacity={0.7}>
            <Text style={styles.signupText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupPrompt}>
          <Text style={styles.signupQuestion}>Don't have an account? </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  logo: {
    marginTop: 50,
    width: 140,
    height: 35,
    resizeMode: "contain",
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
    width: "100%",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  signupPrompt: {
    flexDirection: "row",
  },
  signupQuestion: {
    color: "grey",
  },
  signupText: {
    color: "#508D4E",
    fontWeight: "bold",
  },
});
