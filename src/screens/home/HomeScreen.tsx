import { ImageBackground } from 'react-native';
import { styles } from './style';
import Header from '../../components/common/ScreenHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TipsAndTestimonial from '../../components/home/TipsAndTestimonial';
import FAQCard from '@/src/components/home/faqCard';
import TestimonialCarousel from '@/src/components/home/TestimonialCarousel';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { TitleAndSubtitle } from '@/src/components/common/TitleAndSubtitle';
import { YStack } from 'tamagui';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/RootNavigator';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();



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
              bottom={'$3'}
            />
          </ImageBackground>
          <TipsAndTestimonial onSeeAll={() => {}} />
          <TestimonialCarousel />
          <FAQCard onSeeAll={() => {}} />
        </YStack>
      </ScrollView>
    </Screen>
  );
}
