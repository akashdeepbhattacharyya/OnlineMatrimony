import { View, Text, TouchableOpacity, Dimensions, ViewStyle } from 'react-native';
// import { CheckBox } from '@rneui/themed';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { AntDesign } from '@expo/vector-icons';

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

  // Custom Accordion Component
  const CustomAccordion: React.FC<{
    title: string;
    subtitle: string;
    isExpanded: boolean;
    onPress: () => void;
    children: React.ReactNode;
  }> = ({ title, subtitle, isExpanded, onPress, children }) => (
    <View style={accordionStyles.container}>
      <TouchableOpacity style={accordionStyles.header} onPress={onPress}>
        <View style={accordionStyles.headerContent}>
          <Text style={accordionStyles.title}>{title}</Text>
          <Text style={accordionStyles.subtitle}>{subtitle}</Text>
        </View>
        <AntDesign name={isExpanded ? 'up' : 'down'} size={20} color="#fff" />
      </TouchableOpacity>
      {isExpanded && (
        <View style={accordionStyles.content}>
          {children}
        </View>
      )}
    </View>
  );

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
      <CustomAccordion
        title="Marital Status"
        subtitle={values.maritalStatus}
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        {statusOptionsList.map((status, index) => (
          <TouchableOpacity
            key={`marital-status-${index}-${status}`}
            onPress={() => setFieldValue('maritalStatus', status)}
            style={accordionStyles.optionItem}
          >
            {/* <CheckBox
              checked={values.maritalStatus === status}
              onPress={() => setFieldValue('maritalStatus', status)}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#F85F5F"
              uncheckedColor="#fff"
              title={status}
              textStyle={accordionStyles.optionText}
              containerStyle={accordionStyles.checkboxContainer}
            /> */}
          </TouchableOpacity>
        ))}
      </CustomAccordion>

      {/* Profile Managed By */}
      <CustomAccordion
        title="Profile Managed By"
        subtitle={values.profileManagedBy}
        isExpanded={expandedProfile}
        onPress={() => setExpandedProfile(!expandedProfile)}
      >
        {profileManagedByList.map((option, index) => (
          <TouchableOpacity
            key={`profile-managed-by-${index}-${option}`}
            onPress={() => setFieldValue('profileManagedBy', option)}
            style={accordionStyles.optionItem}
          >
            {/* <CheckBox
              checked={values.profileManagedBy === option}
              onPress={() => setFieldValue('profileManagedBy', option)}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#F85F5F"
              uncheckedColor="#fff"
              title={option}
              textStyle={accordionStyles.optionText}
              containerStyle={accordionStyles.checkboxContainer}
            /> */}
          </TouchableOpacity>
        ))}
      </CustomAccordion>
    </View>
  );
};

// Styles for the custom accordion
const accordionStyles = {
  container: {
    backgroundColor: '#000',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: 10,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    paddingTop: 10,
  },
  optionItem: {
    paddingVertical: 5,
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
  },
};

export default PartnerPreferenceForm;