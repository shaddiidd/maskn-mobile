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
import Context from "../../Context";
import AuthInput from "../../Components/AuthInput";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../Components/Button";

export default function SignupScreen({ navigation }) {
  const { signUp } = useContext(Context);
  const [page, setPage] = useState(1);
  const [values, setValues] = useState({
    first_name: { value: "Abdullah", error: "" },
    last_name: { value: "Shadid", error: "" },
    email: { value: "abdullah.yeuijvb@ryuidj.com", error: "" },

    username: { value: "euwdihubvjeoje", error: "" },
    phone_number: { value: "07961992343", error: "" },
    password: { value: "abdullah", error: "" },

    nationality: { value: "Jordianian", error: "" },
    national_number: { value: "45678765422", error: "" },
    date_of_birth: { value: "2001-12-02", error: "" },
  });

  const handleSubmit = () => {
    let isValid = true;

    if (page === 1) {
      const fields = ["first_name", "last_name", "email"];
      fields.forEach((field) => {
        if (!values[field].value) {
          setValues((prev) => ({
            ...prev,
            [field]: { ...prev[field], error: true },
          }));
          isValid = false;
        }
      });
      if (isValid) setPage(2);
    } else if (page === 2) {
      const fields = ["username", "phone_number", "password"];
      fields.forEach((field) => {
        if (!values[field].value) {
          setValues((prev) => ({
            ...prev,
            [field]: { ...prev[field], error: true },
          }));
          isValid = false;
        }
      });
      if (isValid) setPage(3);
    } else {
      const fields = ["nationality", "national_number", "date_of_birth"];
      fields.forEach((field) => {
        if (!values[field].value) {
          setValues((prev) => ({
            ...prev,
            [field]: { ...prev[field], error: true },
          }));
          isValid = false;
        }
      });

      if (isValid) {
        const body = {
          first_name: values.first_name.value,
          last_name: values.last_name.value,
          username: values.username.value,
          email: values.email.value,
          phone_number: values.phone_number.value,
          nationality: values.nationality.value,
          national_number: values.national_number.value,
          date_of_birth: values.date_of_birth.value,
          password: values.password.value,
        };
        signUp(body);
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Home")}
          style={styles.close}
        >
          <Ionicons name="close" size={25} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../../assets/maskn-green.png")}
          />
          <View style={styles.paginationContainer}>
            <View
              style={[
                styles.page,
                { backgroundColor: page === 1 ? "#508D4E" : "#D9D9D9" },
              ]}
            />
            <View
              style={[
                styles.page,
                { backgroundColor: page === 2 ? "#508D4E" : "#D9D9D9" },
              ]}
            />
            <View
              style={[
                styles.page,
                { backgroundColor: page === 3 ? "#508D4E" : "#D9D9D9" },
              ]}
            />
          </View>
        </View>

        <View
          style={{ width: "90%" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Enter your information to sign up</Text>
          {page === 1 && (
            <>
              <AuthInput
                placeholder="First Name"
                autoCapitalize="words"
                value={values.first_name.value}
                setValue={(value) =>
                  setValues({ ...values, first_name: { value, error: false } })
                }
                error={values.first_name.error}
              />
              <AuthInput
                placeholder="Last Name"
                autoCapitalize="words"
                value={values.last_name.value}
                setValue={(value) =>
                  setValues({ ...values, last_name: { value, error: false } })
                }
                error={values.last_name.error}
              />
              <AuthInput
                placeholder="Email"
                keyboardType="email-address"
                value={values.email.value}
                setValue={(value) =>
                  setValues({ ...values, email: { value, error: false } })
                }
                error={values.email.error}
              />
              <Button text="next" onPress={handleSubmit} />
            </>
          )}
          {page === 2 && (
            <>
              <AuthInput
                placeholder="Username"
                value={values.username.value}
                setValue={(value) =>
                  setValues({ ...values, username: { value, error: false } })
                }
                error={values.username.error}
              />
              <AuthInput
                placeholder="Phone Number"
                keyboardType="numeric"
                value={values.phone_number.value}
                setValue={(value) =>
                  setValues({ ...values, phone_number: { value, error: false } })
                }
                error={values.phone_number.error}
              />
              <AuthInput
                placeholder="Password"
                password
                value={values.password.value}
                setValue={(value) =>
                  setValues({ ...values, password: { value, error: false } })
                }
                error={values.password.error}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: "100",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  text="back"
                  onPress={() => setPage(page - 1)}
                  outline
                  small
                />
                <Button text="next" onPress={handleSubmit} small />
              </View>
            </>
          )}
          {page === 3 && (
            <>
              <AuthInput
                placeholder="Nationality"
                value={values.nationality.value}
                setValue={(value) =>
                  setValues({ ...values, nationality: { value, error: false } })
                }
                error={values.nationality.error}
              />
              <AuthInput
                placeholder="National ID"
                keyboardType="numeric"
                value={values.national_number.value}
                setValue={(value) =>
                  setValues({ ...values, national_number: { value, error: false } })
                }
                error={values.national_number.error}
              />
              <AuthInput
                placeholder="Date of Birth"
                value={values.date_of_birth.value}
                setValue={(value) =>
                  setValues({ ...values, date_of_birth: { value, error: false } })
                }
                error={values.date_of_birth.error}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: "100",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  text="back"
                  onPress={() => setPage(page - 1)}
                  outline
                  small
                />
                <Button text="sign up" onPress={handleSubmit} small />
              </View>
            </>
          )}
          {/* {page === 3 && ( */}
            <Text
              style={[
                styles.signupQuestion,
                { marginTop: 20, textAlign: "center" },
              ]}
            >
              By signing up, you agree to our{" "}
              <Text style={{ color: "#508D4E" }}>Terms of Service</Text> and{" "}
              <Text style={{ color: "#508D4E" }}>Privacy Policy</Text>
            </Text>
          {/* )} */}
        </View>

        <View style={styles.signupPrompt}>
          <Text style={styles.signupQuestion}>Already have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Signin")}
          >
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
});
