import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { styles } from './style'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/common/header.component'
// import Matches from '../components/home/matches'
import { ScrollView } from 'react-native-gesture-handler'
import Testimonial from '../../components/home/testimonial'
import FAQCard from '../../components/home/faqCard'
import TestimonialCard from '../../components/home/testimonialCard'
import FooterNavigator from '../../components/common/footer'


export default function HomeScreen() {

  return (
    <SafeAreaProvider>
      <SafeAreaView shouldRasterizeIOS={true} style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#2B2B2B"
          barStyle='default'
          showHideTransition='fade'
        />
        <Header />
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={require('../../../assets/images/banner.png')}
            style={styles.banner}
            resizeMode='cover'
          >
            <View style={styles.textContainer}>
              <Text style={styles.logo}>LOGO</Text>
              <Text style={styles.tagline}>Bringing Hearts Together</Text>
              <Text style={styles.subtext}>Introducing Select Shaadi</Text>
            </View>
          </ImageBackground>
          {/* <Matches matchType='Premium Matches (97)' />
          <Matches matchType='New Matches (45)' />
          <Matches matchType='Recent Visitors (37)' /> */}
          <Testimonial />
          <TestimonialCard />
          <FAQCard />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

