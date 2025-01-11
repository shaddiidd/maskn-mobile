import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../ui/Button";

export default function SettingsScreen({ navigation }) {
    const handleResetPassword = () => {
        navigation.navigate("ResetPassword");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <TouchableOpacity style={styles.item} onPress={handleResetPassword}>
                        <View style={{  flexDirection: "row", alignItems: "center", columnGap: 5 }}>
                            <Ionicons name="lock-closed-outline" size={20} color="#508D4E" />
                            <Text style={styles.itemText}>Reset Password</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontWeight: "500",
        color: "#666",
        marginBottom: 10,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    itemText: {
        fontSize: 16,
        color: "#333",
    },
});
