import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, Separator, Checkbox, Label, Button, SizableText, ListItem, Theme } from 'tamagui';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Entypo } from '@expo/vector-icons';
import { CheckBox } from '../common/CheckBox';

export default function PersonalInfoScreen() {
    const [ageRange, setAgeRange] = useState([25, 50]);
    const [heightRange, setHeightRange] = useState([4.5, 7.0]);
    const [maritalStatuses, setMaritalStatuses] = useState<string[]>(['Never Married']);
    const [selectedGender, setSelectedGender] = useState('Male');

    const toggleStatus = (status: string) => {
        setMaritalStatuses(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const maritalOptions = ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce', 'Annulled'];

    return (
        <Theme name="dark">
            <ScrollView>
                <YStack backgroundColor="$background" padding="$4" borderRadius="$6">
                    <Text fontWeight="bold" fontSize="$6" marginBottom="$2">Personal Information</Text>
                    <Separator marginVertical="$2" />

                    {/* Age Range */}
                    <YStack marginBottom="$4">
                        <Text fontSize="$5" marginBottom="$1">Age</Text>
                        <XStack justifyContent="space-between" marginBottom="$1">
                            <Text>Min {ageRange[0]} Yrs</Text>
                            <Text>Max {ageRange[1]} Yrs</Text>
                        </XStack>
                        <MultiSlider
                            values={ageRange}
                            min={18}
                            max={70}
                            step={1}
                            sliderLength={300}
                            onValuesChange={setAgeRange}
                            selectedStyle={{ backgroundColor: 'red' }}
                            markerStyle={{ backgroundColor: 'red' }}
                        />
                    </YStack>

                    {/* Height Range */}
                    <YStack marginBottom="$4">
                        <Text fontSize="$5" marginBottom="$1">Height</Text>
                        <XStack justifyContent="space-between" marginBottom="$1">
                            <Text>Min {heightRange[0]}'</Text>
                            <Text>Max {heightRange[1]}'</Text>
                        </XStack>
                        <MultiSlider
                            values={heightRange}
                            min={4}
                            max={7}
                            step={0.1}
                            sliderLength={300}
                            onValuesChange={setHeightRange}
                            selectedStyle={{ backgroundColor: 'red' }}
                            markerStyle={{ backgroundColor: 'red' }}
                        />
                    </YStack>

                    {/* Marital Status */}
                    <YStack marginBottom="$4">
                        <Text fontSize="$5" marginBottom="$2">Marital Status</Text>
                        {maritalOptions.map((status) => (
                            <XStack alignItems="center" key={status} marginBottom="$2">
                                <CheckBox size={24} selected={selectedGender} enabled={true} />

                                <Label marginLeft="$2">{status}</Label>
                            </XStack>
                        ))}
                    </YStack>

                    {/* Navigable Items */}
                    <ListItem
                        title="Profile Managed By"
                        subTitle="Self"
                        iconAfter={<Entypo />}
                        pressTheme
                        onPress={() => { }}
                    />
                    <ListItem
                        title="Profile With Children"
                        subTitle="No"
                        iconAfter={<Entypo />}
                        pressTheme
                        onPress={() => { }}
                    />
                </YStack>
            </ScrollView>
        </Theme>
    );
}
