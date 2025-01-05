import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Context from "../Context";
import ContractTerm from "../Components/ContractTerm";
import Button from "../Components/Button";
import { post, getPdf } from "../fetch";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { capitalizeFirstLetter } from "../helpers/textFunctions";

export default function ContractScreen({ route }) {
    const navigation = useNavigation();
    const { request_id } = route.params;
    const { user, setLoading } = useContext(Context);
    const [contract, setContract] = useState(null);

    const fetchContract = async () => {
        try {
            const response = await post(`contract/intiate-contract/${request_id}`);
            const contractFromResponse = response.data.data;
            const terms = contractFromResponse.terms.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            if (user.role === 1 && contractFromResponse.contractInfo.status === "not signed") {
                navigation.pop();
                Alert.alert("Contract is not ready yet", "Please wait for the owner to sign the contract.");
            }
            setContract({ ...contractFromResponse, terms });
        } catch {
            Alert.alert("Error", "Failed to get contract");
        } finally {
            setLoading(false);
        }
    }

    const downloadContract = async () => {
        try {
            setLoading(true);
            const response = await getPdf(`contract/preview-contract/${contract?.contractInfo?.contract_id}`);
            const fileUri = `${FileSystem.cacheDirectory}contract_${contract?.contractInfo?.contract_id}.pdf`;
            await FileSystem.writeAsStringAsync(fileUri, response, { encoding: FileSystem.EncodingType.Base64 });
            if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(fileUri);
            else console.error("Sharing is not available on this device.");
        } catch (error) {
            console.error("Error downloading contract:", error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const updateTerms = (term) => {
        if (!contract?.terms || !Array.isArray(contract.terms)) {
            console.error("Contract terms are not properly initialized.");
            return;
        }
        const termExists = contract.terms.some(t => String(t.id) === String(term.id));
        const updatedTerms = termExists
            ? contract.terms.map(t => (String(t.id) === String(term.id) ? term : t))
            : [...contract.terms, term];
        setContract(prevContract => ({ ...prevContract, terms: updatedTerms }));
    };
    
    const removeTerm = (termId) => {
        if (!contract?.terms || !Array.isArray(contract.terms)) {
            console.error("Contract terms are not properly initialized.");
            return;
        }
        const updatedTerms = contract.terms.filter(t => String(t.id) !== String(termId));
        setContract(prevContract => ({ ...prevContract, terms: updatedTerms }));
    };

    useEffect(() => {
        setLoading(true);
        fetchContract();
    }, [request_id]);

    if (contract === null) return <></>;
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {console.log(contract?.contractInfo?.status)}
            <View style={styles.cardContainer}>
                <Text style={styles.userRole}>Contract status</Text>
                <Text style={styles.userName}>{capitalizeFirstLetter(contract?.contractInfo?.status)}</Text>
            </View>
            <Text style={styles.title}>Contract Entities</Text>
            <View style={styles.cardContainer}>
                <Text style={styles.userRole}>Owner</Text>
                <Text style={styles.userName}>{contract?.property?.user?.first_name} {contract?.property?.user?.last_name}</Text>
                <Text style={styles.userRole}>{"\n"}Tenant</Text>
                <Text style={styles.userName}>{contract?.tenant?.first_name} {contract?.tenant?.last_name}</Text>
            </View>
            <Text style={styles.title}>Property Details</Text>
            <View style={styles.cardContainer}>
                <View style={styles.infoRowBlock}>
                    <Text style={styles.infoRowTitle}>Title</Text>
                    <Text style={styles.infoRowValue}>{contract?.property?.title} </Text>
                </View>
                <View style={styles.infoRowBlock}>
                    <Text style={styles.infoRowTitle}>Village</Text>
                    <Text style={styles.infoRowValue}>{contract?.property?.village?.village_name}</Text>
                </View>
                <View style={styles.infoRowBlock}>
                    <Text style={styles.infoRowTitle}>Block</Text>
                    <Text style={styles.infoRowValue}>{contract?.property?.block?.block_name}</Text>
                </View>
                <View style={styles.infoRowBlock}>
                    <Text style={styles.infoRowTitle}>Neighborhood</Text>
                    <Text style={styles.infoRowValue}>{contract?.property?.neighborhood?.name}</Text>
                </View>
                <View style={styles.infoRowBlock}>
                    <Text style={styles.infoRowTitle}>Building number</Text>
                    <Text style={styles.infoRowValue}>{contract?.property?.building_number}</Text>
                </View>
                <View style={styles.infoRowBlock}>
                    <Text style={styles.infoRowTitle}>Appartment number</Text>
                    <Text style={styles.infoRowValue}>{contract?.property?.apartment_number}</Text>
                </View>
            </View>
            <Text style={styles.title}>Contract Terms</Text>
            <View style={{ rowGap: 15 }}>
                {contract?.terms?.map((term) => <ContractTerm canEdit={contract?.property?.owner_id === user?.userId} updateTerms={updateTerms} removeTerm={removeTerm} key={term.id} term={term} contractId={contract?.contractInfo?.contract_id} />)}
                {user?.role === 2 && <ContractTerm updateTerms={updateTerms} contractId={contract?.contractInfo?.contract_id} canEdit />}
            </View>
            <View style={styles.infoRowBlock}>
                <Button small={!((user.role === 1 && contract.contractInfo.status === "partially signed") || contract.contractInfo.status === "not signed")} outline text="download pdf" additionalStyles={{ marginTop: 20 }} onPress={downloadContract} />
                {!((user.role === 1 && contract.contractInfo.status === "partially signed") || contract.contractInfo.status === "not signed") && (
                    <Button small text="sign contract" additionalStyles={{ marginTop: 20 }} onPress={() => navigation.navigate("SignContract", { contractId: contract?.contractInfo?.contract_id })} />
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        minWidth: "100%",
        alignItems: "center",
        padding: 20,
        paddingBottom: 30
    },
    title: {
        width: "100%",
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
        marginBottom: 8
    },
    cardContainer: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20
    },
    userName: {
        fontSize: 18,
        fontWeight: "600",
        width: "100%",
    },
    userRole: {
        fontSize: 14,
        color: "#828282",
        width: "100%",
    },
    infoRowBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginVertical: 5
    },
    infoRowTitle: {
        color: "#666",
        fontWeight: "500"
    },
    infoRowValue: {
        fontWeight: "500",
        fontSize: 15,
        textAlign: "right",
        maxWidth: "80%",
    },
});