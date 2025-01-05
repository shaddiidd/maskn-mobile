import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "../helpers/dateFunctions";

export default function DatePicker({ placeholder, value, setValue, error }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (date) => {
    setValue(formatDate(date));
    setDatePickerVisibility(false);
  };

  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.label}>{placeholder}</Text>
      <TouchableOpacity
        style={[styles.input, error && styles.errorInput]}
        activeOpacity={0.7}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text style={{ color: value ? "#000" : "#999", fontSize: 16, width: "100%" }}>
          {value || "Select Date"}
        </Text>
        <Ionicons name="calendar-outline" size={25} color="#666" style={styles.icon} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>This field is required</Text>}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        // display='default'
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={new Date(1900, 0, 1)}
        maximumDate={new Date(2100, 11, 31)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    height: 55,
    width: "100%",
    fontSize: 16,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: "#333",
    marginLeft: 5,
    marginBottom: -3,
  },
  errorInput: {
    borderColor: "#C6131B",
  },
  errorText: {
    color: "#C6131B",
    marginBottom: 10,
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 15,
  },
});
