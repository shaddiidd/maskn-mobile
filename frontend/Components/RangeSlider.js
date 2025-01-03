import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import TextField from "./TextField";

export default function RangeSlider({ min = 0, max = 100, initialMin = 20, initialMax = 80, onValuesChange }) {
  const [values, setValues] = useState([initialMin, initialMax]);

  const handleValuesChange = (newValues) => {
    setValues(newValues);
    if (onValuesChange) {
      onValuesChange(newValues);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Selected Range: {values[0]} - {values[1]}
      </Text>
      <MultiSlider
        values={values}
        sliderLength={300}
        onValuesChange={handleValuesChange}
        min={min}
        max={max}
        step={1}
        allowOverlap={false}
        snapped
        selectedStyle={{ backgroundColor: "#508D4E" }}
        unselectedStyle={{ backgroundColor: "#ccc" }}
        markerStyle={{ width: 25, height: 25, shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 1, elevation: 2 }}
      />
      <View style={styles.textFieldCOntainer}>
        <TextField small placeholder="Min" value={values[0]} setValue={(value) => handleValuesChange([value, values[1]])} />
        <TextField small placeholder="Max" value={values[1]} setValue={(value) => handleValuesChange([values[0], value])} />
      </View>
    </View>
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
  textFieldCOntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 10,
  }
});
