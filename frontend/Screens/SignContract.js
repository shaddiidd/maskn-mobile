import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Button from "../Components/Button";
import TextField from "../Components/TextField";
import SignaturePad from "../Components/SignaturePad";

export default function SignContract() {
    const ownerSignatureRef = useRef(null);
    const witnessSignatureRef = useRef(null);
    const [witnessName, setWitnessName] = useState("");

    const handleSubmit = async () => {
        try {
            const ownerSignature = await ownerSignatureRef.current.exportSignature();
            const witnessSignature = await witnessSignatureRef.current.exportSignature();

            if (!ownerSignature || !witnessSignature || !witnessName.trim()) {
                Alert.alert("Error", "Please complete all fields before submitting.");
                return;
            }

            const data = {
                ownerSignature,
                witnessSignature,
                witnessName,
            };

            console.log("Data to send:", data);
            Alert.alert("Success", "Data ready to send to the backend!");
        } catch (error) {
            console.error("Failed to submit data:", error);
            Alert.alert("Error", "An unexpected error occurred.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Owner's Signature</Text>
            <SignaturePad ref={ownerSignatureRef} canvasStyle={styles.canvas} />
            <Text style={styles.title}>Witness's Signature</Text>
            <SignaturePad ref={witnessSignatureRef} canvasStyle={styles.canvas} />
            <TextField
                style={styles.input}
                placeholder="Witness's full name"
                value={witnessName}
                setValue={setWitnessName}
            />
            <View style={styles.buttons}>
                <Button text="Submit" onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
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
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttons: {
        width: "100%",
        marginTop: 20,
    },
});
