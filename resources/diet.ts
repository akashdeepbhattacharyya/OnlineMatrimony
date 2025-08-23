import { Option } from '@/resources/form';

export const diets = {
  VEGETARIAN: 'Vegetarian',
  NON_VEGETARIAN: 'Non-Vegetarian',
  VEGAN: 'Vegan',
  OTHER: 'Other',
};
export type Diet = keyof typeof diets;

export const dietOptions: Option<Diet>[] = Object.entries(diets).map(
  ([key, value]) => ({
    label: value,
    value: key as Diet,
  }),
);
