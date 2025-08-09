import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import Header from '../../components/common/Header';
const ContactFiltersScreen = () => {
  const [ageRange, setAgeRange] = useState([25, 50]);
  const [heightRange, setHeightRange] = useState([4.5, 7.0]);

  const heightRangeConvert = (val: number) => {
    const ft = Math.floor(val);
    const inch = Math.round((val - ft) * 12);
    return `${ft}'${inch}"`;
  };

  const handleSave = () => {
    console.log('Saved preferences:', { ageRange, heightRange });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" />

      {/* Header */}
      <Header headerText="Contact Filters" isBack />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Age */}
        <View style={styles.sliderLabelRow}>
          <Text style={styles.sliderLabel}>Min {ageRange[0]} Yrs</Text>
          <Text style={styles.sliderLabel}>Max {ageRange[1]} Yrs</Text>
        </View>
        <MultiSlider
          values={ageRange}
          onValuesChange={setAgeRange}
          min={25}
          max={50}
          step={1}
          selectedStyle={{ backgroundColor: '#F85F5F' }}
          unselectedStyle={{ backgroundColor: '#aaa' }}
          markerStyle={styles.markerStyle}
          containerStyle={{ marginBottom: 30 }}
        />

        {/* Height */}
        <View style={styles.sliderLabelRow}>
          <Text style={styles.sliderLabel}>
            Min {heightRangeConvert(heightRange[0])}
          </Text>
          <Text style={styles.sliderLabel}>
            Max {heightRangeConvert(heightRange[1])}
          </Text>
        </View>
        <MultiSlider
          values={heightRange}
          onValuesChange={setHeightRange}
          min={4.5}
          max={7.0}
          step={0.5}
          selectedStyle={{ backgroundColor: '#F85F5F' }}
          unselectedStyle={{ backgroundColor: '#aaa' }}
          markerStyle={styles.markerStyle}
          containerStyle={{ marginBottom: 30 }}
        />

        {/* Selection Items */}
        {['Religion', 'Education', 'Location'].map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.selectRow}>
            <Text style={styles.selectLabel}>
              {item}
            </Text>
            <View style={styles.selectRight}>
              <Text style={styles.selectValue}>
                {item === 'Religion' ? 'Hindu' : item === 'Education' ? 'MCA' : 'New York'}
              </Text>
              <Feather name="chevron-right" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ContactFiltersScreen;
