import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from "@react-native-community/slider";
import Button from './Button';
import TextField from './TextField';

export default function SearchModal({ handleSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [price, setPrice] = useState(100000);
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');

  const handleApplyFilters = () => {
    console.log('Filters Applied:', { price, propertyType, location });
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => setIsOpen(true)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 8 }}>
          <Ionicons name="search" size={24} color="#508D4E" />
          <View>
            <Text style={{ fontSize: 14, color: '#666' }}>Search properties...</Text>
            <Text style={{ fontSize: 12, color: '#888' }}>Filter to find what you need</Text>
          </View>
        </View>
        <View style={styles.filterIconContainer}>
          <Ionicons name="filter" size={20} color="#508D4E" />
        </View>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeButton}>
              <Ionicons name="close" size={22} color="#666" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Filter Properties</Text>

            <TextField placeholder="Search" value={searchText} onChangeText={setSearchText} />
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Price: ${price}</Text>
              <Slider style={styles.slider} minimumValue={50000} maximumValue={1000000} step={10000} value={price} onValueChange={setPrice} minimumTrackTintColor="#508D4E" maximumTrackTintColor="#000000" thumbTintColor="#508D4E" />
            </View>
            <TextField placeholder="Property Type" value={propertyType} onChangeText={setPropertyType} />
            <TextField placeholder="Location" value={location} onChangeText={setLocation} />

            <Button text="Apply Filters" compressed onPress={handleApplyFilters} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.37,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: '#fff',
    margin: 15,
    paddingLeft: 20,
    paddingRight: 8,
  },
  filterIconContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#508D4E',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    paddingBottom: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    rowGap: 2,

  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 15,
    width: "100%",
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  applyButton: {
    backgroundColor: '#508D4E',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
