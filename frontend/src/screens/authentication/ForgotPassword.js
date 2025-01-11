import { useContext, useEffect, useState } from "react";
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
import OTPInput from "../../ui/OTPInput";
import { post } from "../../utils/fetch";

export default function ForgotPassword({ navigation }) {
    const [page, setPage] = useState(1);
    const [phone, setPhone] = useState({ value: "", error: "" });
    const [otp, setOtp] = useState({ value: "", error: false });
    const [passwordForm, setPasswordForm] = useState({
        password: { value: "", error: "" },
        confirmPassword: { value: "", error: "" },
    });

    const requestOTP = async () => {
        try {
            await post("auth/request-otp", { phoneNumber: phone.value });
            setPage(2);
        } catch (error) {
            console.log(error);
        }
    }

    const verifyOTP = async () => {
        try {
            await post("auth/verify-otp", { phoneNumber: phone.value, otp: otp.value });
            setPage(3);
        } catch (error) {
            console.log(error);
        }
    }

    const handleNext = () => {
        if (page === 1) {
            if (phone.value.trim().length === 10) requestOTP();
            else setPhone((prev) => ({ ...prev, error: "Invalid phone number" }));
        } else if (page === 2) {
            if (otp.value.length === 4) verifyOTP();
            else setOtp({ value: "", error: "true" });
        } else if (page === 3) {
            console.log(passwordForm);
            if (!passwordForm.password.value.length) {
                setPasswordForm((prev) => ({ ...prev, password: { value: "", error: true } }))
                return;
            }
            if (!passwordForm.confirmPassword.value.length || passwordForm.password.value !== passwordForm.confirmPassword.value) {
                setPasswordForm((prev) => ({ ...prev, confirmPassword: { value: "", error: "Passwords don't match" } }));
                return;
            }
            navigation.navigate("Signin");
        }
    };

    useEffect(() => {
        if (otp.value.length === 4 && page === 2) handleNext();
    }, [otp]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()} style={styles.close}>
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

                <View style={{ width: "90%" }}>
                    <Text style={styles.title}>Reset Password</Text>
                    {page === 1 && (
                        <>
                            <Text style={styles.subtitle}>Enter your phone number to receive an OTP</Text>
                            <AuthInput
                                placeholder="Phone Number"
                                innerPlaceholder="0777777777"
                                keyboardType="numeric"
                                value={phone?.value}
                                setValue={(value) => setPhone({ value, error: false })}
                                error={phone?.error}
                            />
                            <Button text="next" onPress={handleNext} />
                        </>
                    )}
                    {page === 2 && (
                        <>
                            <Text style={styles.subtitle}>Enter the OTP sent to your email</Text>
                            <OTPInput setValue={(value) => setOtp({ value, error: false })} />
                        </>
                    )}
                    {page === 3 && (
                        <>
                            <Text style={styles.subtitle}>Enter your new password</Text>
                            <AuthInput
                                placeholder="Password"
                                innerPlaceholder="********"
                                password
                                value={passwordForm?.password?.value}
                                setValue={(value) => setPasswordForm({ ...passwordForm, password: { value, error: false } })}
                                error={passwordForm?.password?.error}
                            />
                            <AuthInput
                                placeholder="Confirm Password"
                                innerPlaceholder="********"
                                password
                                value={passwordForm?.confirmPassword?.value}
                                setValue={(value) => setPasswordForm({ ...passwordForm, confirmPassword: { value, error: false } })}
                                error={passwordForm?.confirmPassword?.error}
                            />
                            <Button text="submit" onPress={handleNext} />
                        </>
                    )}
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
        justifyContent: "center",
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
        position: "absolute",
        top: 80,
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
    btnContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
});
