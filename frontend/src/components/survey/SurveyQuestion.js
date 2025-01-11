import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SurveyQuestion({ question, onAnswerSelected, selectedOption }) {
    const options = [
        { id: 1, label: "Strongly Disagree" },
        { id: 2, label: "Disagree" },
        { id: 3, label: "Neutral" },
        { id: 4, label: "Agree" },
        { id: 5, label: "Strongly Agree" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question?.question_text}</Text>
            <View style={styles.optionsContainer}>
                {options.map((option) => (
                    <TouchableOpacity key={option.id} style={[styles.option, selectedOption === option.id && styles.selectedOption]} activeOpacity={0.7} onPress={() => onAnswerSelected(option)}>
                        <Ionicons name={selectedOption === option.id ? "radio-button-on" : "radio-button-off"} size={20} color={selectedOption === option.id ? "#508D4E" : "#ccc"} />
                        <Text style={[styles.optionText, selectedOption === option.id && styles.selectedOptionText]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    question: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 15,
        color: "#333",
    },
    optionsContainer: {
        flexDirection: "column-reverse",
        rowGap: 10,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
    },
    selectedOption: {
        borderColor: "#508D4E",
        backgroundColor: "#eaf4ea",
    },
    optionText: {
        marginLeft: 10,
        fontSize: 14,
        color: "#666",
    },
    selectedOptionText: {
        color: "#508D4E",
    },
});
