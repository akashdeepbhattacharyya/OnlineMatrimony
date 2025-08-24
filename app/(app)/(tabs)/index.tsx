import { ImageBackground } from 'react-native';
import { TabHeader } from '@/components/common/TabHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TipsAndTestimonial from '@/components/home/TipsAndTestimonial';
import { FAQCard } from '@/components/home/FAQCard';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { TitleAndSubtitle } from '@/components/common/TitleAndSubtitle';
import { YStack } from 'tamagui';
import { useAppSelector } from '@/services/store/hook';

export default function App() {
  const { userProfile } = useAppSelector(state => state.user);

  return (
    <Screen>
      <TabHeader headerText={`Hi, ${userProfile.fullName}`} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1}>
          <ImageBackground
            source={require('@/assets/images/banner.png')}
            style={{
              width: '100%',
              height: 234,
            }}
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
              logoSize={{ width: 100, height: 70 }}
            />
          </ImageBackground>
          <TipsAndTestimonial onRightButton={() => { }} />
          <TestimonialCarousel />
          <FAQCard onRightButton={() => { }} />
        </YStack>
      </ScrollView>
    </Screen>
  );
}
