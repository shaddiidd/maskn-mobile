import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import Button from "../../ui/Button";
import TextField from "../../ui/TextField";
import { put, remove } from "../../utils/fetch";

export default function ContractTerm({ term, contractId, updateTerms, removeTerm, canEdit }) {
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
        const endpointBase = `contract/update-contract/${contractId}`;
        let endpoint = endpointBase;
        const oldTerm = term ? { ...term } : null;
        if (oldTerm) {
            endpoint += `?termId=${oldTerm.id}`;
            closeModal();
        }
        try {
            const response = await put(endpoint, { term: inputValue });
            if (oldTerm) updateTerms({ ...oldTerm, term: inputValue });
            else updateTerms(response.newTerm);
        } catch (error) {
            console.error("Error saving term:", error.response?.data || error.message);
            if (oldTerm) updateTerms(oldTerm);
        } finally {
            closeModal();
        }
    };
    
    const deleteTerm = async () => {
        try {
            await remove(`contract/delete-term/${contractId}/${term.id}`);
            removeTerm(term.id);
        } catch (error) {
            console.error("Error deleting term:", error.response?.data || error.message);
        } finally {
            closeModal();
        }
    };
    
    return (
        <>
            <TouchableOpacity style={styles.container} activeOpacity={canEdit ? 0.7 : 1} onPress={canEdit ? openModal : null}>
                <Text style={styles.termTxt}>
                    {term?.term || "إضافة شرط"}
                </Text>
                {!term && <Ionicons name="add-circle" size={25} />}
                {(canEdit && term) && (
                    <View style={styles.editIcon}>
                        <Icon name="edit" size={12} color="#fff" />
                    </View>
                )}
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
                            {term && <Button compressed outline text="delete term" onPress={deleteTerm} additionalStyles={{ borderColor: "red" }} additionalTextStyles={{ color: "red" }} />}
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
    editIcon: {
        position: "absolute",
        left: -7,
        top: -7,
        backgroundColor: "#508D4E",
        width: 20,
        height: 20,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
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
