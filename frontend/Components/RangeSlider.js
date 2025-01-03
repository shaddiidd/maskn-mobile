import React, { useState } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import TextField from "./TextField";

export default function RangeSlider({ label = "Selected range", min = 0, max = 5000, initialMin = 0, initialMax = 5000, onValuesChange }) {
  const [values, setValues] = useState([initialMin, initialMax]);

  const handleValuesChange = (newValues) => {
    setValues(newValues);
    if (onValuesChange) {
      onValuesChange(newValues);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
      <Text style={styles.label}>
        {label}: {values[0]} - {values[1]}
      </Text>
      <MultiSlider
        values={values}
        sliderLength={300}
        onValuesChange={handleValuesChange}
        min={min}
        max={max}
        step={5}
        allowOverlap={false}
        snapped
        selectedStyle={{ backgroundColor: "#508D4E" }}
        unselectedStyle={{ backgroundColor: "#ccc" }}
        markerStyle={styles.sliderMarker}
      />
      {/* <View style={styles.textFieldCOntainer}>
        <TextField small placeholder="Min" value={values[0]} setValue={(value) => handleValuesChange([value, values[1]])} />
        <TextField small placeholder="Max" value={values[1]} setValue={(value) => handleValuesChange([values[0], value])} />
      </View> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
  },
  label: {
    color: "#666",
  },
  sliderMarker: {
    width: 25,
    height: 25,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2
  },
  textFieldCOntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 10,
  }
});
