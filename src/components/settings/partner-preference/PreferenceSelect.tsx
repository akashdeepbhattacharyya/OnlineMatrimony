import { getToken } from 'tamagui';
import { Select } from '../../common/Select';
import { Option } from '@/src/resources/form';

type Props = {
  options: Option[];
  title: string;
  onChange: (value: string) => void;
  initialValue?: Option;
  placeholder?: string;
};

export const PreferenceSelect = ({
  options,
  title,
  onChange,
  initialValue,
  placeholder = 'Select an option',
}: Props) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      initialValue={initialValue}
      title={title}
      triggerProps={{
        padding: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        marginTop: -5,
      }}
      selectValueProps={{
        fontSize: '$nm',
        backgroundColor: 'transparent',
        placeholderTextColor: getToken('$color.white'),
        textColor: getToken('$color.white'),
      }}
      chevronIconColor={getToken('$color.white')}
    />
  );
};
