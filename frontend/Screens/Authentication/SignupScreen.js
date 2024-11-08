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

export default function SignupScreen({ navigation }) {
  const { auth } = useContext(Context);
  const [page, setPage] = useState(1);
  const [values, setValues] = useState({
    first_name: { value: "", error: false },
    last_name: { value: "", error: false },
    email: { value: "", error: false },
    phoneNumber: { value: "", error: false },
    nationality: { value: "", error: false },
    nationalID: { value: "", error: false },
    DOB: { value: "", error: false },
    password: { value: "", error: false },
  });

  const handleSubmit = () => {
    let isValid = true;

    if (page === 1) {
      // Validate first page
      const fields = ["first_name", "last_name", "email", "phoneNumber"];
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
    } else {
      // Validate second page
      const fields = ["nationalID", "DOB", "password"];
      fields.forEach((field) => {
        if (!values[field].value) {
          setValues((prev) => ({
            ...prev,
            [field]: { ...prev[field], error: true },
          }));
          isValid = false;
        }
      });
      if (isValid) auth();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

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
          </View>
        </View>

        <View
          style={{ width: "90%" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Enter your information to sign up</Text>
          {page === 1 ? (
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
              <AuthInput
                placeholder="Phone Number"
                keyboardType="numeric"
                value={values.phoneNumber.value}
                setValue={(value) =>
                  setValues({ ...values, phoneNumber: { value, error: false } })
                }
                error={values.phoneNumber.error}
              />
            </>
          ) : (
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
                value={values.nationalID.value}
                setValue={(value) =>
                  setValues({ ...values, nationalID: { value, error: false } })
                }
                error={values.nationalID.error}
              />
              <AuthInput
                placeholder="Date of Birth"
                value={values.DOB.value}
                setValue={(value) =>
                  setValues({ ...values, DOB: { value, error: false } })
                }
                error={values.DOB.error}
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
            </>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>
              {page === 1 ? "NEXT" : "SIGN UP"}
            </Text>
          </TouchableOpacity>
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
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
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
