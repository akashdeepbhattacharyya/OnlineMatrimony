import React from 'react';
import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getToken, View, XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import DottedDivider from '@/assets/images/dotted-divider.svg';
import { Divider } from '../common/Divider';
import { TileHeader } from './TileHeader';

const faqs = [
  'Is This Site Safe To Use?',
  'How Do I Create An Account?',
  'Can I Register On Behalf Of Someone Else?',
  'How Do I Create A Good Profile?',
];

const FAQCard = ({ onSeeAll }: { onSeeAll: () => void }) => {
  return (
    <View theme={'home_tiles'} padding={'$4.5'} marginBottom={'$13'}>
      <YStack
        gap={'$3'}
        backgroundColor={'$background'}
        padding={'$4'}
        borderRadius={'$8'}
      >
        <TileHeader title={`Frequently Asked Questions`} onSeeAll={onSeeAll} />
        <DottedDivider width={'100%'} />
        <FlatList
          data={faqs}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true} // Add this line
          scrollEnabled={false}
          renderItem={({ item }) => <FAQRow title={item} />}
        />
      </YStack>
    </View>
  );
};

const FAQRow = ({ title }: { title: string }) => {
  return (
    <YStack>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={'$2'}
        paddingTop={'$3.5'}
      >
        <Text font="heading" size="small">
          {title}
        </Text>
        <Feather
          name="chevron-right"
          size={18}
          color={getToken('$color.gray')}
        />
      </XStack>
      <Divider width={'100%'} />
    </YStack>
  );
};

export default FAQCard;
