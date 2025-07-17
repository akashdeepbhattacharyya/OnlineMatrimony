import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ViewStyle } from 'react-native';
import { ListItem, CheckBox } from '@rneui/themed';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

interface PartnerPreferenceFormProps {
  values: {
    ageRange: number[];
    heightRange: number[];
    maritalStatus: string;
    profileManagedBy: string;
  };
  setFieldValue: (field: string, value: any) => void;
  expanded: boolean;
  setExpanded: (val: boolean) => void;
  expandedProfile: boolean;
  setExpandedProfile: (val: boolean) => void;
  statusOptionsList: string[];
  profileManagedByList: string[];
  styles: { [key: string]: ViewStyle | undefined };
}

const PartnerPreferenceForm: React.FC<PartnerPreferenceFormProps> = ({
  values,
  setFieldValue,
  expanded,
  setExpanded,
  expandedProfile,
  setExpandedProfile,
  statusOptionsList,
  profileManagedByList,
  styles,
}) => {
  const heightRangeConvert = (value: number): string => {
    const feet = Math.floor(value);
    const inches = Math.round((value - feet) * 12);
    return `${feet}'${inches}"`;
  };

  return (
    <View style={styles.container}>
      {/* Age Slider */}
      <View style={styles.sliderRow}>
        <Text style={styles.sectionTitle}>Age</Text>
        <Text style={styles.sectionTitle}>Max</Text>
      </View>
      <View style={styles.sliderRow}>
        <Text style={styles.sliderText}>Min {values.ageRange[0]} Yrs</Text>
        <Text style={styles.sliderText}>Max {values.ageRange[1]} Yrs</Text>
      </View>
      <MultiSlider
        values={values.ageRange}
        sliderLength={width - 100}
        onValuesChange={(val: number[]) => setFieldValue('ageRange', val)}
        min={25}
        max={50}
        step={1}
        selectedStyle={{ backgroundColor: '#F85F5F' }}
        unselectedStyle={{ backgroundColor: 'lightgrey' }}
        markerStyle={styles.slider}
        pressedMarkerStyle={{ backgroundColor: '#F85F5F' }}
      />

      {/* Height Slider */}
      <View style={styles.sliderRow}>
        <Text style={styles.sectionTitle}>Height</Text>
        <Text style={styles.sectionTitle}>Max</Text>
      </View>
      <View style={styles.sliderRow}>
        <Text style={styles.sliderText}>
          Min {heightRangeConvert(values.heightRange[0])}
        </Text>
        <Text style={styles.sliderText}>
          Max {heightRangeConvert(values.heightRange[1])}
        </Text>
      </View>
      <MultiSlider
        values={values.heightRange}
        sliderLength={width - 100}
        onValuesChange={(val: number[]) => setFieldValue('heightRange', val)}
        min={4.5}
        max={7.0}
        step={0.5}
        selectedStyle={{ backgroundColor: '#F85F5F' }}
        unselectedStyle={{ backgroundColor: 'lightgrey' }}
        markerStyle={styles.slider}
        pressedMarkerStyle={{ backgroundColor: '#F85F5F' }}
      />

      {/* Marital Status */}
      <ListItem.Accordion
        containerStyle={{
          backgroundColor: '#000',
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}
        icon={<AntDesign name={expanded ? 'up' : 'down'} size={20} color="#fff" />}
        content={
          <ListItem.Content>
            <ListItem.Title>Marital Status</ListItem.Title>
            <ListItem.Subtitle>{values.maritalStatus}</ListItem.Subtitle>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        {statusOptionsList.map((status) => (
          <ListItem
            key={status}
            containerStyle={{ backgroundColor: 'transparent', padding: 0, margin: 0 }}
          >
            <TouchableOpacity
              onPress={() => setFieldValue('maritalStatus', status)}
              style={styles.checkboxRow}
            >
              <CheckBox
                checked={values.maritalStatus === status}
                onPress={() => setFieldValue('maritalStatus', status)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#F85F5F"
                uncheckedColor="#fff"
                title={status}
                textStyle={styles.checkboxLabel}
                containerStyle={{ padding: 0, margin: 0 }}
              />
            </TouchableOpacity>
          </ListItem>
        ))}
      </ListItem.Accordion>

      {/* Profile Managed By */}
      <ListItem.Accordion
        containerStyle={{
          backgroundColor: '#000',
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}
        icon={<AntDesign name={expandedProfile ? 'up' : 'down'} size={20} color="#fff" />}
        content={
          <ListItem.Content>
            <ListItem.Title>Profile Managed By</ListItem.Title>
            <ListItem.Subtitle>{values.profileManagedBy}</ListItem.Subtitle>
          </ListItem.Content>
        }
        isExpanded={expandedProfile}
        onPress={() => setExpandedProfile(!expandedProfile)}
      >
        {profileManagedByList.map((option) => (
          <ListItem
            key={option}
            containerStyle={{ backgroundColor: 'transparent', padding: 0, margin: 0 }}
          >
            <TouchableOpacity
              onPress={() => setFieldValue('profileManagedBy', option)}
              style={styles.checkboxRow}
            >
              <CheckBox
                checked={values.profileManagedBy === option}
                onPress={() => setFieldValue('profileManagedBy', option)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#F85F5F"
                uncheckedColor="#fff"
                title={option}
                textStyle={styles.checkboxLabel}
                containerStyle={{ padding: 0, margin: 0 }}
              />
            </TouchableOpacity>
          </ListItem>
        ))}
      </ListItem.Accordion>

      {/* Submit Button */}
      
    </View>
  );
};

export default PartnerPreferenceForm;
