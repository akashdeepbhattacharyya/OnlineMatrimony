import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/ScreenHeader';
// import Matches from '../components/home/matches'
import { ScrollView } from 'react-native-gesture-handler';
import TipsAndTestimonial from '../../components/home/TipsAndTestimonial';
import FAQCard from '../../components/home/faqCard';
import TestimonialCard from '../../components/home/testimonialCard';
import FooterNavigator from '../../components/common/footer';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { TitleAndSubtitle } from '@/src/components/common/TitleAndSubtitle';
import { View, YStack } from 'tamagui';

export default function HomeScreen() {
  return (
    <Screen>
      <Header />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1}>
          <ImageBackground
            source={require('@/assets/images/banner.png')}
            style={styles.banner}
            resizeMode="cover"
          >
            <TitleAndSubtitle
              subtitle="Bringing Hearts Together"
              secondarySubtitle="Introducing Select Shaadi"
              subtitleProps={{
                marginTop: -10,
              }}
              subtitleFontSize="small"
              alignItems="flex-start"
              paddingHorizontal={'$5'}
              height={'100%'}
              justifyContent="center"
            />
          </ImageBackground>
          <TipsAndTestimonial />
          <TestimonialCard />
          <FAQCard />
        </YStack>
      </ScrollView>
    </Screen>
    // <SafeAreaProvider>
    //   <SafeAreaView shouldRasterizeIOS={true} style={styles.container}>
    //     <StatusBar
    //       animated={true}
    //       backgroundColor="#2B2B2B"
    //       barStyle='default'
    //       showHideTransition='fade'
    //     />
    //     <Header />
    //     <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
    //       <ImageBackground
    //         source={require('../../../assets/images/banner.png')}
    //         style={styles.banner}
    //         resizeMode='cover'
    //       >
    //         <View style={styles.textContainer}>
    //           <Text style={styles.logo}>LOGO</Text>
    //           <Text style={styles.tagline}>Bringing Hearts Together</Text>
    //           <Text style={styles.subtext}>Introducing Select Shaadi</Text>
    //         </View>
    //       </ImageBackground>
    //       {/* <Matches matchType='Premium Matches (97)' />
    //       <Matches matchType='New Matches (45)' />
    //       <Matches matchType='Recent Visitors (37)' /> */}
    //
    //     </ScrollView>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}
