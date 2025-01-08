import React, { useContext, useState } from "react";
import { View, StyleSheet, Modal, SafeAreaView, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import Button from "../../ui/Button";
import SurveyQuestion from "./SurveyQuestion";
import TextField from "../../ui/TextField";
import Context from "../../context/Context";
import { post } from "../../utils/fetch";

export default function SurveyModal({ questions, contractId, entityId, reloadSurvey }) {
    const [visible, setVisible] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [review, setReview] = useState("");
    const { setLoading } = useContext(Context);

    const totalQuestions = questions.length;
    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelected = (option) => {
        const multiplier = option.id * 0.2;
        const questionAnsValue = currentQuestion.weight * multiplier;

        setAnswers((prevAnswers) => {
            const updatedAnswers = prevAnswers.filter((ans) => ans.questionId !== currentQuestion.question_id);
            updatedAnswers.push({
                questionId: currentQuestion.question_id,
                questionAnsValue: Math.round(questionAnsValue),
                selectedOption: option.id,
            });
            return updatedAnswers;
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const updatedAnswers = answers.map((ans) => ({ questionId: ans.questionId, questionAnsValue: ans.questionAnsValue }));
            const updatedReview = review.trim();
            const body = { answers: updatedAnswers, review: updatedReview };
            await post(`feedback/survey-submission/${entityId}/${contractId}`, body);
            setAnswers([]);
            setReview("");
            setVisible(false);
            Alert.alert("Thank You!", "Your feedback is appreciated and helps us improve our services!", [{ text: "OK", onPress: () => reloadSurvey()}]);
        } catch {
            Alert.alert("Error", "Failed to submit the survey.");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        } else {
            setAnswers([]);
            setReview("");
            setVisible(false);
        }
    };

    const getSelectedOptionForCurrentQuestion = () => {
        const answer = answers.find((ans) => ans.questionId === currentQuestion?.question_id);
        return answer ? answer.selectedOption : null;
    };

    const isCurrentQuestionAnswered = () => {
        if (currentQuestionIndex === totalQuestions) {
            return review.length >= 150;
        }
        return getSelectedOptionForCurrentQuestion() !== null;
    };

    return (
        <>
            <TouchableOpacity activeOpacity={0.7} style={styles.openButton} onPress={() => setVisible(true)}>
                <Text style={styles.buttonText}>Fill Survey</Text>
            </TouchableOpacity>
            <Modal visible={visible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <SafeAreaView style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Survey</Text>
                    </SafeAreaView>
                    <View style={styles.contentContainer}>
                        {currentQuestionIndex < totalQuestions ? (
                            <SurveyQuestion question={currentQuestion} onAnswerSelected={handleAnswerSelected} selectedOption={getSelectedOptionForCurrentQuestion()} />
                        ) : (
                            <View style={styles.reviewContainer}>
                                <Text style={styles.reviewTitle}>Write a review about your experience:</Text>
                                <TextField placeholder="Write a minimum of 150 characters" textarea value={review} setValue={setReview} />
                                {review.length ? <Text style={[styles.reviewLength, { color: review.trim().length < 150 ? "red" : "green" }]}>{review.trim().length}</Text> : null}
                            </View>
                        )}
                        <View>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBar, { width: `${((currentQuestionIndex) / (totalQuestions)) * 100}%` }]} />
                            </View>
                            <View style={styles.navigationButtons}>
                                <Button small compressed outline text={currentQuestionIndex === 0 ? "Cancel" : "Previous"} onPress={handlePrevious} />
                                <Button small compressed text={currentQuestionIndex === totalQuestions ? "Finish" : "Next"} onPress={handleNext} disabled={!isCurrentQuestionAnswered()} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    openButton: {
        backgroundColor: "#508D4E",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "500",
    },
    modalContainer: {
        backgroundColor: "white",
        flex: 1,
        borderRadius: 10,
        padding: 0,
        elevation: 5,
    },
    headerContainer: {
        width: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    headerTitle: {
        color: "#000",
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 10,
    },
    contentContainer: {
        padding: 20,
        paddingTop: 5,
        justifyContent: "space-between",
        flex: 1,
        paddingBottom: 50,
    },
    progressBarContainer: {
        width: "100%",
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 2.5,
        overflow: "hidden",
        marginTop: 20,
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#508D4E",
    },
    navigationButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    reviewTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 15,
        color: "#333",
    },
    reviewLength: {
        textAlign: "right",
        fontWeight: "600"
    }
});
