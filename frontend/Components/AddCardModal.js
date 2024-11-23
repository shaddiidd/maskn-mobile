import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import TextField from "./TextField";

export default function AddCardModal({ onAdd, onClose, visible }) {
  const [data, setData] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.title}>Add card</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ width: "100%" }}
          >
            <TextField placeholder="Card Number" icon="card-outline" />
            <TextField placeholder="Name on Card" />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <TextField small placeholder="MM/YY" />
              <TextField small placeholder="CCV" />
            </View>
          </KeyboardAvoidingView>

          <Button disabled onPress={onAdd} compressed text="add card" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    paddingBottom: 40,
  },
  closeButton: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    width: "100%",
  },
});
