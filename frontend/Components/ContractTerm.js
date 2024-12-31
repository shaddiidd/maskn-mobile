import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextField from "./TextField";
import Button from "./Button";
import { put } from "../fetch";

export default function ContractTerm({ term, contractId }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState(term?.term || "");

    const openModal = () => {
        setInputValue(term?.term || "");
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const saveTerm = async () => {
        let endpoint = `update-contract/${contractId}`;
        // if (term) endpoint += `termId=${term.id}`;
        console.log(term)
        console.log(endpoint);
        try {
            // await put(`update-contract/${contractId}?termId=${term.id}`, { term: inputValue })
        } catch {

        } finally {

        }
    }

    return (
        <>
            <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={openModal}>
                <Text style={styles.termTxt}>
                    {term?.term || "إضافة شرط"}
                </Text>
                {!term && <Ionicons name="add-circle" size={25} />}
            </TouchableOpacity>

            <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={closeModal}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{term ? "Edit" : "Add"} Term</Text>
                            <TextField style={styles.textInput} value={inputValue} setValue={setInputValue} placeholder="Enter term (in arabic)" textarea />
                            <View style={styles.modalActions}>
                                <Button small compressed outline text="cancel" onPress={closeModal} />
                                <Button small compressed text="save" onPress={saveTerm} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        columnGap: 7,
    },
    termTxt: {
        fontSize: 16,
        fontWeight: "500",
        flex: 1,
        textAlign: "right",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        width: "100%",
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: "#4CAF50",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});
