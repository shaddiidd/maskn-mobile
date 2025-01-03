import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import Button from "../Components/Button"; // Assuming you have a Button component
import { post } from "../fetch";
import Context from "../Context";

export default function BecomeRenter() {
  const { setLoading } = useContext(Context);

  const handleBecomeRenter = async () => {
    setLoading(true);
    try {
      await post("/users/request-to-be-renter");
      Alert.alert("Success", "Your request to become a renter has been submitted successfully. You'll be notified once your request is reviewed.");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "There was a problem submitting your request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.paragraph}>
        By becoming a renter on Maskn, you can easily post your properties for rent in a safe and secure environment. 
        Renting through Maskn ensures that your identity remains anonymous until you accept a tenant's request to tour your property.
      </Text>
      <Text style={styles.paragraph}>
        As a renter, you can review the profiles, history, and reviews of tenants before deciding to accept their requests. 
        This helps you make informed decisions and ensures that your property is rented out to trustworthy individuals.
      </Text>
      <Text style={styles.paragraph}>
        Maskn also offers a streamlined contract management system for the renting process. Once you and the tenant agree, 
        the contract is verified with the government, so you don't have to handle the verification yourself.
      </Text>
      <Text style={styles.paragraph}>
        With Maskn, renting is not only safe but also efficient. Take the step today to become a renter and experience the 
        convenience of managing your properties with ease.
      </Text>
      <Button text="request to become a renter" onPress={handleBecomeRenter} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    rowGap: 10
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
    color: "#666",
  },
});
