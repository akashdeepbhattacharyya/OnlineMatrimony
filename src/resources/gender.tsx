import { Option, OptionWithIcon } from '@/src/resources/form';
import { TransgenderIcon } from '../components/icons/TransgenderIcon';
import { MaleIcon } from '../components/icons/MaleIcon';
import { FemaleIcon } from '../components/icons/FemaleIcon';

export const genders = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};
export type Gender = keyof typeof genders;

export const getGenderIcon = (
  gender: Gender,
  selected: boolean,
  enabled?: boolean,
) => {
  switch (gender) {
    case 'OTHER':
      return <TransgenderIcon selected={selected} enabled={enabled} />;
    case 'MALE':
      return <MaleIcon selected={selected} enabled={enabled} />;
    case 'FEMALE':
      return <FemaleIcon selected={selected} enabled={enabled} />;
  }
};

export const genderOptions: Option<Gender>[] = Object.keys(genders).map(
  key => ({
    label: genders[key as keyof typeof genders],
    value: key as Gender,
  }),
);

export const genderOptionsWithIcons = (
  selected?: Gender,
): OptionWithIcon<Gender>[] =>
  Object.keys(genders).map(key => ({
    label: genders[key as keyof typeof genders],
    value: key as Gender,
    icon: getGenderIcon(key as Gender, selected === key, selected == undefined),
  }));
