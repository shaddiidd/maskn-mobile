import { useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Context from "../../context/Context";
import AuthInput from "../../components/authentication/AuthInput";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../ui/Button";

export default function SignupScreen({ navigation }) {
  const { signUp } = useContext(Context);
  const [page, setPage] = useState(1);
  const [values, setValues] = useState({
    first_name: { value: "", error: "" },
    last_name: { value: "", error: "" },
    email: { value: "", error: "" },

    username: { value: "", error: "" },
    phone_number: { value: "", error: "" },
    national_number: { value: "", error: "" },

    password: { value: "", error: "" },
    passwordConfirmation: { value: "", error: "" },
  });

  const validateFields = (fields) => {
    let isValid = true;
    fields.forEach((field) => {
      const value = values[field].value;
      let error = "";

      if (!value) {
        error = "This field is required";
      } else {
        switch (field) {
          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) error = "Invalid email format";
            break;
          case "phone_number":
            const phoneRegex = /^07\d{8}$/;
            if (!phoneRegex.test(value)) error = "Phone number must be 10 digits and start with 07";
            break;
          case "password":
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(value))
              error = "Password must be at least 8 characters, include a number, a symbol, and an uppercase letter";
            break;
          case "passwordConfirmation":
            if (value !== values.password.value)
              error = "Password confirmation does not match password";
            break;
          case "national_number":
            const nationalIdRegex = /^\d{10}$/;
            if (!nationalIdRegex.test(value)) error = "National ID must be 10 digits";
            break;
          default:
            break;
        }
      }

      if (!error) {
        setValues((prev) => ({
          ...prev,
          [field]: { ...prev[field], error: "" },
        }));
      } else if (field === "password") {
        setValues((prev) => ({
          ...prev,
          password: { value: "", error },
          passwordConfirmation: { value: "", error },
        }));
        isValid = false;
      } else if (field === "passwordConfirmation") {
        setValues((prev) => ({
          ...prev,
          passwordConfirmation: { value: "", error },
        }));
        isValid = false;
      } else {
        setValues((prev) => ({
          ...prev,
          [field]: { value: values[field].value, error },
        }));
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = () => {
    if (page === 1) {
      const fields = ["first_name", "last_name", "email"];
      if (validateFields(fields)) setPage(2);
    } else if (page === 2) {
      const fields = ["username", "phone_number", "national_number"];
      if (validateFields(fields)) setPage(3);
    } else {
      const fields = ["password", "passwordConfirmation"];
      if (validateFields(fields)) {
        const formData = new FormData();

        formData.append("first_name", values?.first_name?.value);
        formData.append("last_name", values?.last_name?.value);
        formData.append("username", values?.username?.value.toLowerCase());
        formData.append("email", values?.email?.value.toLowerCase());
        formData.append("phone_number", values?.phone_number?.value);
        formData.append("national_number", values?.national_number?.value);
        formData.append("password", values?.password?.value);

        formData.append("date_of_birth", "01-01-1990");
        formData.append("nationality", "Jordanian");

        signUp(formData);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop(2)} style={styles.close}>
          <Ionicons name="close" size={25} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Image style={styles.logo} source={require("../../assets/maskn-green.png")} />
          <View style={styles.paginationContainer}>
            <View style={[styles.page, { backgroundColor: page === 1 ? "#508D4E" : "#D9D9D9" }]} />
            <View style={[styles.page, { backgroundColor: page === 2 ? "#508D4E" : "#D9D9D9" }]} />
            <View style={[styles.page, { backgroundColor: page === 3 ? "#508D4E" : "#D9D9D9" }]} />
          </View>
        </View>

        <View style={{ width: "90%" }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Enter your information to sign up</Text>
          {page === 1 && (
            <>
              <AuthInput placeholder="First Name" innerPlaceholder="Abdullah" autoCapitalize="words" value={values?.first_name?.value} setValue={(value) => setValues({ ...values, first_name: { value, error: "" } })} error={values?.first_name?.error} />
              <AuthInput placeholder="Last Name" innerPlaceholder="Shadid" autoCapitalize="words" value={values?.last_name?.value} setValue={(value) => setValues({ ...values, last_name: { value, error: "" } })} error={values?.last_name?.error} />
              <AuthInput placeholder="Email" innerPlaceholder="abdullah@example.com" keyboardType="email-address" value={values?.email?.value} setValue={(value) => setValues({ ...values, email: { value, error: "" } })} error={values?.email?.error} />
              <Button text="next" onPress={handleSubmit} />
            </>
          )}
          {page === 2 && (
            <>
              <AuthInput placeholder="Username" innerPlaceholder="abdullah_shadid" value={values?.username?.value} setValue={(value) => setValues({ ...values, username: { value, error: "" } })} error={values?.username?.error} />
              <AuthInput placeholder="Phone Number" innerPlaceholder="0791234567" keyboardType="numeric" value={values?.phone_number?.value} setValue={(value) => setValues({ ...values, phone_number: { value, error: "" } })} error={values?.phone_number?.error} />
              <AuthInput placeholder="National ID" innerPlaceholder="1234567890" keyboardType="numeric" value={values?.national_number?.value} setValue={(value) => setValues({ ...values, national_number: { value, error: "" } })} error={values?.national_number?.error} />
              <View style={styles.btnContainer}>
                <Button text="back" onPress={() => setPage(page - 1)} outline small />
                <Button text="next" onPress={handleSubmit} small />
              </View>
            </>
          )}
          {page === 3 && (
            <>
              <AuthInput placeholder="Password" innerPlaceholder="********" password value={values?.password?.value} setValue={(value) => setValues({ ...values, password: { value, error: "" } })} error={values?.password?.error} />
              <AuthInput placeholder="Confirm Password" innerPlaceholder="********" password value={values?.passwordConfirmation?.value} setValue={(value) => setValues({ ...values, passwordConfirmation: { value, error: "" } })} error={values?.passwordConfirmation?.error} />
              <View style={styles.btnContainer}>
                <Button text="back" onPress={() => setPage(page - 1)} outline small />
                <Button text="sign up" onPress={handleSubmit} small />
              </View>
            </>
          )}
          <Text style={[styles.signupQuestion, { marginTop: 20, textAlign: "center" }]}>By signing up, you agree to our <Text style={{ color: "#508D4E" }}> Terms of Service </Text>and<Text style={{ color: "#508D4E" }}> Privacy Policy</Text></Text>
        </View>

        <View style={styles.signupPrompt}>
          <Text style={styles.signupQuestion}>Already have an account? </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()}>
            <Text style={styles.signupText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  close: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 50,
    marginBottom: 20,
    width: 140,
    height: 35,
    resizeMode: "contain",
  },
  paginationContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    height: 6,
    borderRadius: 3,
    width: 30,
    marginHorizontal: 5,
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
  signupPrompt: {
    flexDirection: "row",
    marginBottom: 20,
  },
  signupQuestion: {
    color: "grey",
  },
  signupText: {
    color: "#508D4E",
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
    width: "100",
    justifyContent: "space-between",
  }
});
