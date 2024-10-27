import { useContext, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, StatusBar, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import AuthInput from "../../Components/AuthInput";
import Context from "../../Context";

export default function SigninScreen({ navigation }) {
  const { auth } = useContext(Context);
  const [values, setValues] = useState({
    email: {
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
    
    if (!values.email.value) {
      setValues(prev => ({ ...prev, email: { ...prev.email, error: true } }));
      isValid = false;
    }
    
    if (!values.password.value) {
      setValues(prev => ({ ...prev, password: { ...prev.password, error: true } }));
      isValid = false;
    }

    if (isValid) {
      auth();
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        <Image style={styles.logo} source={require("../../assets/maskn-green.png")} />

        <KeyboardAvoidingView style={{ width: "90%" }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Enter your email and password</Text>
          <AuthInput
            placeholder="Email"
            keyboardType="email-address"
            value={values.email.value}
            setValue={(value) => setValues({...values, email: { value, error: false }})}
            error={values.email.error}
          />
          <AuthInput
            placeholder="Password"
            password
            value={values.password.value}
            setValue={(value) => setValues({...values, password: { value, error: false }})}
            error={values.password.error}
          />
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "100%", alignItems: "center", marginTop: 20 }} activeOpacity={0.7}>
              <Text style={styles.signupText}>Forgot Password?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={styles.signupPrompt}>
          <Text style={styles.signupQuestion}>Don't have an account? </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupText}>Sign up</Text>
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
  logo: {
    marginTop: 50
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
