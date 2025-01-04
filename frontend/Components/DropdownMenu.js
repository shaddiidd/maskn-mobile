import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

export default function DropdownMenu({ items, selectedValue, onValueChange, placeholder = "Select an option", additionalStyles = {}, label }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (item) => {
    onValueChange(item.id);
    setIsVisible(false);
  };

  return (
    <View style={[styles.container, additionalStyles]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity activeOpacity={0.7} style={styles.dropdown} onPress={() => setIsVisible(true)}>
        <Text style={[styles.text, selectedValue ? styles.selectedText : styles.placeholderText]}>
          {selectedValue ? items.find((item) => item.id === selectedValue)?.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal visible={isVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Select an Option</Text>
            <FlatList
              data={items}
              style={{ width: "100%" }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.7} style={styles.item} onPress={() => handleSelect(item)}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <Button compressed text="Close" onPress={() => setIsVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    color: "#333",
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  text: {
    fontSize: 15,
  },
  selectedText: {
    color: "#333",
  },
  placeholderText: {
    color: "#777",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    width: "100%",
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    width: "100%"
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#508D4E",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
