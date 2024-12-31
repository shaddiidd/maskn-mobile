import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Context from "../Context";
import ContractTerm from "../Components/ContractTerm";
import Button from "../Components/Button";
import { post } from "../fetch";

export default function ContractScreen({ route }) {
    const navigation = useNavigation();
    const { request_id } = route.params;
    const { token, setLoading } = useContext(Context);
    const [contract, setContract] = useState(null);

    const fetchContract = async () => {
        try {
            const response = await post(`contract/intiate-contract/${request_id}`);
            setContract(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    const handleSign = () => {
        navigation.navigate("SignContract");
    }

    const handleView = () => {
        console.log("Viewing contract");
    }

    useEffect(() => {
        setLoading(true);
        fetchContract();
    }, [request_id]);

    if (contract === null) return <></>;
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Contract Entities</Text>
            <View style={styles.cardContainer}>
                <Text style={styles.userName}>{contract?.property?.user?.first_name} {contract?.property?.user?.last_name}</Text>
                <Text style={styles.userRole}>Owner{"\n"}</Text>
                <Text style={styles.userName}>{contract?.tenant?.first_name} {contract?.tenant?.last_name}</Text>
                <Text style={styles.userRole}>Tenant</Text>
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
                {contract?.terms?.map((term) => <ContractTerm key={term} term={term} contractId={contract?.contractInfo?.contract_id} />)}
                <ContractTerm contractId={contract?.contract_id} />
            </View>
            <View style={styles.infoRowBlock}>
                <Button small outline text="view contract" additionalStyles={{ marginTop: 20 }} onPress={handleView} />
                <Button small text="sign contract" additionalStyles={{ marginTop: 20 }} onPress={handleSign} />
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