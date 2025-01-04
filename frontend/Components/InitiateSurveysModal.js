import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Modal, ScrollView, SafeAreaView, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SurveyModal from "./SurveyModal";
import { get } from "../fetch";
import Context from "../Context";

export default function InitiateSurveysModal({ surveyData, reoloadSurvey }) {
    const [questions, setQuestions] = useState([]);
    const { setLoading, user } = useContext(Context);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await get("feedback/get-survey");
            setQuestions(response.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!surveyData?.length) return;
        fetchQuestions();
    }, [surveyData]);

    return (
        <Modal visible={Boolean(surveyData?.length)} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <SafeAreaView style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Survey</Text>
                </SafeAreaView>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.introText}>
                        Thank you for using Maskn. To help us ensure a safe and seamless rental experience for everyone, please take a moment to share your thoughts about your recent rental experience.
                    </Text>
                    {surveyData.map((item, index) => (
                        <View style={styles.card} key={index}>
                            {item?.tenant?.profile_photo?.length ? (
                                <Image style={styles.profilePicture} source={{ uri: item.tenant.profile_photo[0] }} />
                            ) : (
                                <View style={styles.profilePicture}>
                                    <Ionicons name="person" color="#666" size={25} />
                                </View>
                            )}
                            <View style={styles.tenantInfo}>
                                <Text style={styles.name}>
                                    {item.tenant.first_name} {item.tenant.last_name}
                                </Text>
                                <Text style={styles.username}>@{item.tenant.username}</Text>
                            </View>
                            <SurveyModal contractId={item.contract_id} entityId={item.tenant.tenant_id} reoloadSurvey={reoloadSurvey} questions={questions} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "white",
        flex: 1,
        borderRadius: 10,
        padding: 0,
        elevation: 5,
    },
    headerContainer: {
        width: "100%",
        backgroundColor: "#508D4E",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 10,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingTop: 10,
        paddingBottom: 30,
        rowGap: 15,
    },
    introText: {
        fontSize: 15,
        color: "#666",
        lineHeight: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 40,
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
        borderColor: "#508D4E",
        borderWidth: 1,
    },
    tenantInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    username: {
        fontSize: 14,
        color: "#888",
        marginTop: 2,
    },
});
