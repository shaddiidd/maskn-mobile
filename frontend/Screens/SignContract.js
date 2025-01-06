import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button";
import TextField from "../Components/TextField";
import SignaturePad from "../Components/SignaturePad";
import { post } from "../fetch";

export default function SignContract({ route }) {
    const { contractId } = route.params || "";
    const ownerSignatureRef = useRef(null);
    const witnessSignatureRef = useRef(null);
    const [witnessName, setWitnessName] = useState("");
    const navigation = useNavigation();

    const handleSubmit = async () => {
        const ownerSignature = await ownerSignatureRef.current.exportSignature();
        const witnessSignature = await witnessSignatureRef.current.exportSignature();
        if (!ownerSignature || !witnessSignature || !witnessName.trim()) {
            Alert.alert("Error", "Please complete all fields before submitting.");
            return;
        }
        try {
            const requestBody = {
                start_date: "2025-01-05",
                end_date: "2025-12-31",
                witness_name: witnessName,
                user_signature: ownerSignature,
                witness_signature: witnessSignature,
            };
            console.log(`contract/sign-contract/${contractId}`);
            // console.log(requestBody);
            const response = await post(`contract/sign-contract/${contractId}`, requestBody);
            Alert.alert("Success", "Contract submitted successfully!");
            navigation.pop(2);
        } catch (error) {
            console.error("Failed to submit data:", error.response.data);
            Alert.alert("Error", "An unexpected error occurred.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Signature</Text>
            <SignaturePad ref={ownerSignatureRef} canvasStyle={styles.canvas} />
            <Text style={styles.title}>Witness's Signature</Text>
            <SignaturePad ref={witnessSignatureRef} canvasStyle={styles.canvas} />
            <TextField
                style={styles.input}
                placeholder="Witness's full name"
                value={witnessName}
                setValue={setWitnessName}
            />
            <Button text="Submit" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        width: "100%",
        color: "#333",
    },
    canvas: {
        width: "100%",
        height: 100,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
});
