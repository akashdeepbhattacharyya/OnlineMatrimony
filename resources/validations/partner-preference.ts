import * as Yup from 'yup';
import { genders } from '../gender';
import { cities, states } from '../city-state';
import { maritalStatuses } from '../marital-status';
import { castes, subCastes } from '../caste';
import { diets } from '../diet';
import { educations } from '../education';
import { motherTongues } from '../mother-tongue';
import { occupations } from '../occupation';
import { religions } from '../religion';

export const partnerPreferenceSchema = Yup.object().shape({
  // maxAge: Yup.number()
  //   .min(46, 'Max age must be 46 or older')
  //   .required('Max age is required'),
  // minAge: Yup.number()
  //   .min(25, 'Min age must be 25 or older')
  //   .required('Min age is required'),
  // maxHeight: Yup.number()
  //   .min(213, 'Max height must be 7 feet or taller')
  //   .required('Max height is required'),
  // minHeight: Yup.number()
  //   .min(137, 'Min height must be 4.5 feet or taller')
  //   .required('Min height is required'),
  // maxIncome: Yup.number()
  //   .min(1000000, 'Max annual income must be 1000000 or more')
  //   .required('Max annual income is required'),
  // minIncome: Yup.number()
  //   .min(500000, 'Min annual income must be 500000 or more')
  //   .required('Min annual income is required'),
  gender: Yup.string()
    .oneOf(Object.keys(genders))
    .required('Gender is required'),
  maritalStatuses: Yup.array()
    .of(Yup.string().oneOf(Object.keys(maritalStatuses)))
    .required('At least one marital status is required'),
  states: Yup.array()
    .of(Yup.string().oneOf(Object.keys(states)))
    .required('At least one state is required'),
  cities: Yup.array()
    .of(Yup.string().oneOf(Object.keys(cities)))
    .required('At least one city is required when states are selected'),
  diet: Yup.string()
    .oneOf(Object.keys(diets))
    .required('Diet preference is required'),
  religions: Yup.array()
    .of(Yup.string().oneOf(Object.keys(religions)))
    .required('Religion preference is required'),
  castes: Yup.array()
    .of(Yup.string().oneOf(Object.keys(castes)))
    .required('Caste preference is required'),
  subCastes: Yup.array()
    .of(Yup.string().oneOf(Object.keys(subCastes))),
  motherTongue: Yup.string()
    .oneOf(Object.keys(motherTongues))
    .required('Mother tongue preference is required'),
  educations: Yup.array()
    .of(Yup.string().oneOf(Object.keys(educations)))
    .required('Education preference is required'),
  occupations: Yup.array()
    .of(Yup.string().oneOf(Object.keys(occupations)))
    .required('Occupation preference is required'),
});
