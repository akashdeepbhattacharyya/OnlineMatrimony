import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, CheckBox } from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';

type OptionType = {
  value: string;
  isSelected: boolean;
};

type Props = {
  label: string;
  selectedValue: string;
  setSelectedValue: (val: string) => void;
  expanded: boolean;
  setExpanded: (val: boolean) => void;
  options: OptionType[];
  setOptions: (data: OptionType[]) => void;
  styles: any;
};

const CheckboxGroupAccordion: React.FC<Props> = ({
  label,
  selectedValue,
  setSelectedValue,
  expanded,
  setExpanded,
  options,
  setOptions,
  styles,
}) => {
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    const updated = options.map((option) => ({
      ...option,
      isSelected: option.value === value,
    }));
    setOptions(updated);
  };

  return (
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
          <ListItem.Title>{label}</ListItem.Title>
          <ListItem.Subtitle>{selectedValue}</ListItem.Subtitle>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}
    >
      {options.map((option) => (
        <ListItem
          key={option.value}
          containerStyle={{
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => handleSelect(option.value)}
            style={styles.checkboxRow}
          >
            <CheckBox
              checked={option.isSelected}
              onPress={() => handleSelect(option.value)}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#F85F5F"
              uncheckedColor="#fff"
              title={option.value}
              textStyle={styles.checkboxLabel}
              containerStyle={{ padding: 0, margin: 0 }}
            />
          </TouchableOpacity>
        </ListItem>
      ))}
    </ListItem.Accordion>
  );
};

export default CheckboxGroupAccordion;
