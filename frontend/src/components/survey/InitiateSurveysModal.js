import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Modal, ScrollView, SafeAreaView, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SurveyModal from "./SurveyModal";
import { get } from "../../utils/fetch";
import Context from "../../context/Context";

export default function InitiateSurveysModal({ surveyData, setSurveyData, reloadSurvey }) {
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
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSurveyData([])}>
                        <Ionicons name="close" size={22} color="#666" />
                    </TouchableOpacity>
                </SafeAreaView>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <Ionicons name="checkmark-circle-outline" size={150} color="#508D4E" />
                    <Text style={styles.introText}>
                        Thank you for using Maskn. To help us ensure a safe and seamless rental experience for everyone, please take a moment to share your thoughts about your recent rental experience.
                    </Text>
                    {surveyData.map((item, index) => (
                        <View style={styles.card} key={index}>
                            {(user.role === 1) ? (
                                <>
                                    {item?.property?.photos?.length ? (
                                        <Image style={styles.propertyPhoto} source={{ uri: item?.property?.photos[0] }} />
                                    ) : (
                                        <View style={styles.propertyPhoto}>
                                            <Ionicons name="person" color="#666" size={25} />
                                        </View>
                                    )}
                                </>
                            ) : (
                                <>
                                    {item?.tenant?.profile_photo?.length ? (
                                        <Image style={styles.profilePicture} source={{ uri: item?.tenant?.profile_photo[0] }} />
                                    ) : (
                                        <View style={styles.profilePicture}>
                                            <Ionicons name="person" color="#666" size={25} />
                                        </View>
                                    )}
                                </>
                            )}
                            <View style={styles.tenantInfo}>
                                {user.role === 1 ? (
                                    <Text style={styles.name}>{item?.property?.title}</Text>
                                ) : (
                                    <Text style={styles.name}>{item?.tenant?.first_name} {item?.tenant?.last_name}</Text>
                                )}
                                {user.role === 2 ? <Text style={styles.username}>@{item.tenant.username}</Text> : null}
                            </View>
                            <SurveyModal contractId={item.contract_id} entityId={user.role === 1 ? item.property.property_id : item?.tenant?.tenant_id} reloadSurvey={reloadSurvey} questions={questions} />
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
        elevation: 5,
    },
    headerContainer: {
        width: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    closeButton: {
        position: "absolute",
        right: 20,
        bottom: 8,
    },
    headerTitle: {
        color: "#000",
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 10,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 30,
        rowGap: 15,
        alignItems: "center",
    },
    introText: {
        fontSize: 15,
        color: "#666",
        lineHeight: 20,
        marginBottom: 10,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
        borderColor: "#508D4E",
        borderWidth: 1,
    },
    propertyPhoto: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
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
