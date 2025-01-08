import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../ui/Button";
import LabelTextField from "../../ui/LabelTextField";
import SignaturePad from "../../components/contract/SignaturePad";
import { post } from "../../utils/fetch";
import { formatDate } from "../../helpers/dateFunctions";

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
        const now = new Date();
        const start_date = formatDate(now.getTime(), true);
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(now.getMonth() + 1);
        const end_date = formatDate(oneMonthLater.getTime(), true);
        try {
            const requestBody = {
                start_date,
                end_date,
                witness_name: witnessName,
                user_signature: ownerSignature,
                witness_signature: witnessSignature,
            };
            await post(`contract/sign-contract/${contractId}`, requestBody);
            Alert.alert("Success", "Contract submitted successfully!");
            navigation.pop(2);
        } catch (error) {
            Alert.alert("Error", error.response.data.message)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your signature</Text>
            <SignaturePad ref={ownerSignatureRef} canvasStyle={styles.canvas} />
            <Text style={styles.title}>Witness's signature</Text>
            <SignaturePad ref={witnessSignatureRef} canvasStyle={styles.canvas} />
            <LabelTextField
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
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
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
