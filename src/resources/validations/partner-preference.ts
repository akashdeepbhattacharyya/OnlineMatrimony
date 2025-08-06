import * as Yup from 'yup';
import { genders } from '../gender';
import { citiesByStates, State, states } from '../city-state';
import { PartnerPreferenceFormType } from '../form';
import { maritalStatuses } from '../marital-status';
import { castes } from '../caste';
import { diets } from '../diet';
import { educations } from '../education';
import { motherTongues } from '../mother-tongue';
import { occupations } from '../occupation';
import { religions } from '../religion';

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
  gender: Yup.string()
    .oneOf(Object.keys(genders))
    .required('Gender is required'),
  maritalStatuses: Yup.array()
    .of(Yup.string().oneOf(Object.keys(maritalStatuses)))
    .required('At least one marital status is required'),
  states: Yup.array()
    .of(Yup.string().oneOf(Object.keys(states)))
    .required('At least one state is required'),
  cities: Yup.array().when('states', (states: State[], schema) => {
    if (states && states.length > 0) {
      return schema
        .of(Yup.string().oneOf(citiesByStates(states)))
        .required('At least one city is required when states are selected');
    }
    return schema;
  }),
  diet: Yup.string()
    .oneOf(Object.keys(diets))
    .required('Diet preference is required'),
  religions: Yup.array()
    .of(Yup.string().oneOf(Object.keys(religions)))
    .required('Religion preference is required'),
  castes: Yup.array()
    .of(Yup.string().oneOf(Object.keys(castes)))
    .required('Caste preference is required'),
  motherTongue: Yup.string()
    .oneOf(Object.keys(motherTongues))
    .required('Mother tongue preference is required'),
  educations: Yup.array()
    .of(Yup.string().oneOf(Object.keys(educations)))
    .required('Education preference is required'),
  occupations: Yup.array()
    .of(Yup.string().oneOf(Object.keys(occupations)))
    .required('Occupation preference is required'),
  annualIncomeRange: Yup.object({
    min: Yup.number()
      .min(5, 'Min annual income must be 5 or more')
      .required('Min annual income is required'),
    max: Yup.number()
      .min(100, 'Max annual income must be 100 or more')
      .required('Max annual income is required'),
  }),
});
