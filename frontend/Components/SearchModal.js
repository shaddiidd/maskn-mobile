import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import TextField from './TextField';
import RangeSlider from './RangeSlider';
import { useNavigation } from '@react-navigation/native';
import RadioButtons from './RadioButtons';
import LabelTextField from './LabelTextField';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [priceRange, setPriceRange] = useState([]);
  const [firnished, setFirnished] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setSearchText('');
    setBathrooms('');
    setBedrooms('');
    setPriceRange([]);
    setFirnished(false);
  }, [isOpen]);

  const handleApplyFilters = () => {
    navigation.navigate("PropertySearch", { searchText, bedrooms, bathrooms, priceRange, firnished });
    setIsOpen(false);
  };

  const handleTouchOutside = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      setIsOpen(false);
    }
  }

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
        <TouchableWithoutFeedback onPress={handleTouchOutside}>
          <KeyboardAvoidingView style={styles.modalBackground} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Filter Properties</Text>
              <LabelTextField placeholder="Search" value={searchText} setValue={setSearchText} />
              <RangeSlider min={0} max={5000} initialMin={priceRange[0]} initialMax={priceRange[1]} onValuesChange={setPriceRange} />
              <View style={styles.textFieldRow}>
                <LabelTextField keyboardType="numeric" small placeholder="Bedrooms" value={bedrooms} setValue={setBedrooms} />
                <LabelTextField keyboardType="numeric" small placeholder="Bathrooms" value={bathrooms} setValue={setBathrooms} />
              </View>
              <RadioButtons selectedValue={firnished} setSelectedValue={setFirnished} />
              <Button text="Apply Filters" compressed onPress={handleApplyFilters} />
              <Button text="Close" compressed outline onPress={() => setIsOpen(false)} />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
    marginTop: 5,
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
  textFieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10
  }
});
