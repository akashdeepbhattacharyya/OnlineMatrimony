import * as Yup from 'yup';
import { genders } from '../gender';
import {
  cities,
  maritalStatus,
  stateCityMapping,
  states,
} from '../update-profile';
import { PartnerPreferenceFormType } from '../form';

export const partnerPreferenceSchema = Yup.object<PartnerPreferenceFormType>({
  ageRange: Yup.object({
    min: Yup.number()
      .min(25, 'Min age must be 25 or older')
      .required('Min age is required'),
    max: Yup.number()
      .min(46, 'Max age must be 46 or older')
      .required('Max age is required'),
  }),
  heightRange: Yup.object({
    min: Yup.number()
      .min(4.5, 'Min height must be 4.5 or older')
      .required('Min height is required'),
    max: Yup.number()
      .min(7, 'Max height must be 7 or older')
      .required('Max height is required'),
  }),
  maritalStatus: Yup.string()
    .oneOf(Object.keys(maritalStatus))
    .required('Marital status is required'),
  gender: Yup.string()
    .oneOf(Object.keys(genders))
    .required('Gender is required'),
  city: Yup.string().when('state', (state, schema) => {
    if (
      typeof state === 'string' &&
      String(state).trim() !== '' &&
      cities[state]
    ) {
      return schema
        .oneOf(
          Object.keys(stateCityMapping[state]),
          'Select a valid city for the chosen state',
        )
        .required('City is required when state is selected');
    }
    return schema;
  }),
  state: Yup.string().oneOf(Object.keys(states)).required('State is required'),
});
