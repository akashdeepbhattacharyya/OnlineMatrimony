import React, { useState } from 'react';
import { Text, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/common/Header';
import { styles } from './style';
import { ScrollView } from 'react-native-gesture-handler';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CheckboxGroupAccordion from '../../../components/ui/CheckboxGroupAccordion';
import PartnerPreferenceForm from '../../../components/PartnerPreference/PartnerPreferenceForm';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { Slider } from '@/src/components/common/Slider';
import { View, YStack } from 'tamagui';
import { PersonalPreference } from '@/src/components/settings/partner-preference/PersonalPreference';

export default function PartnerPreferenceScreen() {
  const { width } = Dimensions.get('window');

  const [ageRange, setAgeRange] = useState([25, 50]);
  const [heightRange, setHeightRange] = useState([4.5, 7]);

  const [maritalStatus, setMaritalStatus] = useState('Never Married');
  const [profileManagedBy, setProfileManagedBy] = useState('Self');

  const [expanded, setExpanded] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState(false);

  const [statusOptions, setStatusOptions] = useState([
    { value: 'Never Married', isSelected: true },
    { value: 'Divorced', isSelected: false },
    { value: 'Widowed', isSelected: false },
    { value: 'Awaiting Divorce', isSelected: false },
    { value: 'Annulled', isSelected: false },
  ]);

  const [statusOptionsProfile, setStatusOptionsProfile] = useState([
    { value: 'Self', isSelected: true },
    { value: 'Partner', isSelected: false },
    { value: 'Both', isSelected: false },
  ]);

  const heightRangeConvert = (value: number) => {
    const feet = Math.floor(value);
    const inches = Math.round((value - feet) * 12);
    return `${feet}'${inches}"`;
  };

  const initialValues = {
    ageRange: [25, 50],
    heightRange: [4.5, 7],
    maritalStatus: 'Never Married',
    profileManagedBy: 'Self',
  };

  const statusOptionsList = [
    'Never Married',
    'Divorced',
    'Widowed',
    'Awaiting Divorce',
    'Annulled',
  ];

  const profileManagedByList = ['Self', 'Partner', 'Both'];

  const [sliderState, setSliderState] = useState<number>(10);

  const onSlideMove = (value: number) => {
    value = Math.round(value);
    if (value < 0 || value > 100) {
      return;
    }
    setSliderState(value);
  };

  return (
    <Screen>
      <ScreenHeader headerText="Partner Preference" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <YStack
          marginTop={'$2'}
          paddingHorizontal={'$4'}
          paddingVertical={'$2'}
          justifyContent="space-between"
        >
          <PersonalPreference />
        </YStack>
        {/* <View padding={'$8'}>
          <Slider
            onSlideMove={onSlideMove}
            sliderValue={sliderState}
            minValue={0}
            maxValue={100}
          />
        </View> */}
      </ScrollView>
    </Screen>
    // <SafeAreaProvider>
    //   <SafeAreaView shouldRasterizeIOS={true} style={styles.wrapper}>
    //     <StatusBar
    //       animated={true}
    //       backgroundColor="#2B2B2B"
    //       barStyle="default"
    //       showHideTransition="fade"
    //     />
    //     <ScreenHeader headerText="Partner Preference" />
    //     <ScrollView
    //       showsVerticalScrollIndicator={false}
    //       contentContainerStyle={{
    //         flexGrow: 1,
    //       }}
    //     >
    //       <Formik
    //         initialValues={initialValues}
    //         onSubmit={values => {
    //           console.log('Submitted:', values);
    //         }}
    //       >
    //         {({ values, handleSubmit, setFieldValue }) => (
    //           <View style={[styles.wrapper, { marginTop: 20 }]}>
    //             <PartnerPreferenceForm
    //               values={values}
    //               setFieldValue={setFieldValue}
    //               expanded={expanded}
    //               setExpanded={setExpanded}
    //               expandedProfile={expandedProfile}
    //               setExpandedProfile={setExpandedProfile}
    //               statusOptionsList={statusOptionsList}
    //               profileManagedByList={profileManagedByList}
    //               styles={styles}
    //             />
    //             <TouchableOpacity
    //               onPress={() => handleSubmit()}
    //               style={{
    //                 backgroundColor: '#F85F5F',
    //                 marginTop: 20,
    //                 padding: 15,
    //                 width: width - 50,
    //                 alignSelf: 'center',
    //                 borderRadius: 10,
    //                 alignItems: 'center',
    //               }}
    //             >
    //               <Text style={{ color: '#fff', fontWeight: 'bold' }}>
    //                 Submit
    //               </Text>
    //             </TouchableOpacity>
    //           </View>
    //         )}
    //       </Formik>
    //     </ScrollView>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}
