import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function HelpScreen() {
  const faqs = [
    {
      question: "What is this app used for?",
      answer:
        "This app helps landlords and tenants manage rental properties, agreements, and payments efficiently. It also provides features like contract signing and notifications.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by going to the login page and clicking on \"Forgot Password.\" Follow the steps to receive an OTP and create a new password.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact customer support by navigating to the \"Contact Us\" section in the app and filling out the support form. Alternatively, you can email us at support@example.com.",
    },
    {
      question: "How do I upload a property?",
      answer:
        "To upload a property, go to the \"Add Property\" section in the app, fill in the required details, and upload images. Once submitted, the property will be reviewed before listing.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "You can update your profile information by navigating to the \"Profile\" section in the app and clicking \"Edit Profile.\" Make sure to save changes after editing.",
    },
    {
      question: "What should I do if I encounter a bug?",
      answer:
        "If you encounter a bug, please report it to our support team using the \"Report an Issue\" feature in the app. Providing screenshots or detailed descriptions helps us resolve the issue faster.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqBlock}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  faqBlock: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: "#508D4E",
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});
