import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PaymentMethodCard from "./PaymentMethodCard";
import Button from "./Button";

const PaymentModal = ({
  id,
  name,
  price,
  additionalInfo,
  onClose,
  paymentMethod,
}) => {
  return (
    <Modal
      visible={paymentMethod !== null}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.title}>{name}</Text>

          {Object.entries(additionalInfo).map(([key, value]) => (
            <Text key={key} style={styles.additionalInfo}>
              {key}: {value}
            </Text>
          ))}

          <Text style={styles.price}>{price} JOD</Text>

          <PaymentMethodCard paymentMethod={paymentMethod} />

          <Button
            compressed
            text="pay"
            onPress={onClose}
            additionalStyles={{ marginTop: 0 }}
          />
        </View>
      </View>
    </Modal>
  );
};

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
    marginBottom: 5,
    width: "100%",
  },
  additionalInfo: {
    fontSize: 16,
    color: "#7F7F7F",
    width: "100%",
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "right",
    color: "#000",
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  cardLogo: {
    width: 60,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  cardDetails: {
    fontSize: 14,
    color: "#7F7F7F",
  },
});

export default PaymentModal;
