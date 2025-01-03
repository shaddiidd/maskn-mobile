import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from "@react-native-community/slider";
import Button from './Button';
import TextField from './TextField';
import RangeSlider from './RangeSlider';

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

      <Modal visible={isOpen} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Properties</Text>

            <TextField placeholder="Search" value={searchText} onChangeText={setSearchText} />
            <RangeSlider />
            <TextField placeholder="Property Type" value={propertyType} onChangeText={setPropertyType} />
            <TextField placeholder="Location" value={location} onChangeText={setLocation} />

            <Button text="Apply Filters" compressed onPress={handleApplyFilters} />
            <Button text="Close" compressed outline onPress={() => setIsOpen(false)} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    rowGap: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    width: "100%",
  },
  filterLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
