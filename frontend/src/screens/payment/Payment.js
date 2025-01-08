import { StyleSheet, Text, View } from "react-native";
import PaymentMethodCard from "../../components/payment/PaymentMethodCard";
import { useState } from "react";
import { get, remove } from "../../utils/fetch";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PaymentModal from "../../components/payment/PaymentModal";
import AddCardModal from "../../components/payment/AddCardModal";

export default function Payment({ route }) {
  const { id, name, price, additionalInfo } = route.params;
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: "Arab Bank", displayNumber: "**** 021", type: "visa" },
    { id: 2, name: "Etihad Bank", displayNumber: "**** 035", type: "master" },
  ]);

  const pay = (paymentMethod) => setSelectedPaymentMethod(paymentMethod);

  const removePaymentMethod = (paymentMethod) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== paymentMethod.id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      {paymentMethods?.map((paymentMethod) => (
        <PaymentMethodCard key={paymentMethod.id} paymentMethod={paymentMethod} onPress={() => pay(paymentMethod)} remove={() => removePaymentMethod(paymentMethod)} />
      ))}
      <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={() => setOpenAddCardModal(true)}>
        <Ionicons name="add" size={25} color="white" />
      </TouchableOpacity>
      <PaymentModal name={name} price={price} additionalInfo={additionalInfo} onClose={() => setSelectedPaymentMethod(null)} paymentMethod={selectedPaymentMethod} />
      <AddCardModal visible={openAddCardModal}  onClose={() => setOpenAddCardModal(false)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    width: "100%",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#508D4E",
    padding: 10,
    borderRadius: 100,
    marginTop: 10,
  },
});
