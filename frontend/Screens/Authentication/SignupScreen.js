import { useContext, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, StatusBar, Image, TouchableOpacity, Alert } from "react-native";
import Context from "../../Context";
import AuthInput from "../../Components/AuthInput";

export default function SignupScreen({ navigation }) {
  const { auth } = useContext(Context)
  const [page, setPage] = useState(1);
  const [values, setValues] = useState({
    fullName: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    phoneNumber: {
      value: "",
      error: false,
    },
    nationalID: {
      value: "",
      error: false,
    },
    DOB: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
  });

  const handleSubmit = () => {
    let isValid = true;

    if (page === 1) {
      // PAGE 1
      if (!values.fullName.value) {
        setValues(prev => ({ ...prev, fullName: { ...prev.fullName, error: true } }));
        isValid = false;
      }
      if (!values.email.value) {
        setValues(prev => ({ ...prev, email: { ...prev.email, error: true } }));
        isValid = false;
      }
      if (!values.phoneNumber.value) {
        setValues(prev => ({ ...prev, phoneNumber: { ...prev.phoneNumber, error: true } }));
        isValid = false;
      }
      if (isValid) setPage(2);
    } else {
      // PAGE 2
      if (!values.nationalID.value) {
        setValues(prev => ({ ...prev, nationalID: { ...prev.nationalID, error: true } }));
        isValid = false;
      }
      if (!values.DOB.value) {
        setValues(prev => ({ ...prev, DOB: { ...prev.DOB, error: true } }));
        isValid = false;
      }
      if (!values.password.value) {
        setValues(prev => ({ ...prev, password: { ...prev.password, error: true } }));
        isValid = false;
      }
      if (isValid) auth();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../../assets/maskn-green.png")} />
        <View style={styles.paginationContainer}>
          <View style={[styles.page, { backgroundColor: page === 1 ? "#508D4E": "#D9D9D9" }]} />
          <View style={[styles.page, { backgroundColor: page === 2 ? "#508D4E": "#D9D9D9" }]} />
        </View>
      </View>

      <View style={{ width: "90%" }}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Enter your information to sign up</Text>
        {page === 1 ? (
          <>
          <AuthInput
            placeholder="Full Name"
            autoCapitalize
            value={values.fullName.value}
            setValue={(value) => setValues({...values, fullName: { value, error: false }})}
            error={values.fullName.error}
          />
          <AuthInput
            placeholder="Email"
            keyboardType="email-address"
            value={values.email.value}
            setValue={(value) => setValues({...values, email: { value, error: false }})}
            error={values.email.error}
          />
          <AuthInput
            placeholder="Phone Number"
            keyboardType="numeric"
            value={values.phoneNumber.value}
            setValue={(value) => setValues({...values, phoneNumber: { value, error: false }})}
            error={values.phoneNumber.error}
          />
        </>
        ) : (
          <>
          <AuthInput
            placeholder="National ID"
            keyboardType="numeric"
            value={values.nationalID.value}
            setValue={(value) => setValues({...values, nationalID: { value, error: false }})}
            error={values.nationalID.error}
          />
          <AuthInput
            placeholder="Date of Birth"
            value={values.DOB.value}
            setValue={(value) => setValues({...values, DOB: { value, error: false }})}
            error={values.DOB.error}
          />
          <AuthInput
            placeholder="Password"
            password
            value={values.password.value}
            setValue={(value) => setValues({...values, password: { value, error: false }})}
            error={values.password.error}
          />
          </>
        )}
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{page === 1 ? "NEXT" : "SIGN UP"}</Text>
        </TouchableOpacity>
        <Text style={[styles.signupQuestion, { marginTop: 20, textAlign: "center" }]}>
          By signing up, you agree to our <Text style={{ color: "#508D4E" }}>Terms of Service</Text> and <Text style={{ color: "#508D4E" }}>Privacy Policy</Text>
          </Text>
      </View>

      <View style={styles.signupPrompt}>
        <Text style={styles.signupQuestion}>Already have an account? </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Signin")}>
            <Text style={styles.signupText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    marginTop: 50,
    marginBottom: 20
  },
  paginationContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  page: {
    height: 6,
    borderRadius: 3,
    width: 30,
    marginHorizontal: 5
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 5,
    textAlign: "center"
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
    color: "white"
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
    fontWeight: 'bold',
  },
});
