import * as Yup from 'yup';
import { genders } from '../gender';
import { cities, stateCityMapping, states } from '../city-state';
import { UpdateUserProfileFormType } from '../form';
import { maritalStatuses } from '../marital-status';
import { religions } from '../religion';
import { castes } from '../caste';
import { diets } from '../diet';
import { educations } from '../education';
import { motherTongues } from '../mother-tongue';
import { occupations } from '../occupation';

export const updateUserProfileSchema = Yup.object<UpdateUserProfileFormType>({
  fullName: Yup.string().required('Full Name is required'),
  dateOfBirth: Yup.string().required('DOB is required'),
  gender: Yup.string()
    .oneOf(Object.keys(genders))
    .required('Gender is required'),
  state: Yup.string().oneOf(Object.keys(states)),
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
  pincode: Yup.string()
    .matches(/^\d{6}$/, 'Pincode must be 6 digits')
    .when('city', {
      is: (city: string) => !!city && city.trim() !== '',
      then: schema =>
        schema.required('Pincode is required when city is selected'),
      otherwise: schema => schema,
    }),
  aboutMe: Yup.string(),
  height: Yup.number()
    .min(0, 'Height must be positive')
    .required('Height is required'),
  weight: Yup.number()
    .min(0, 'Weight must be positive')
    .required('Weight is required'),
  maritalStatus: Yup.string()
    .oneOf(Object.keys(maritalStatuses))
    .required('Marital Status is required'),
  religion: Yup.string()
    .oneOf(Object.keys(religions))
    .required('Religion is required'),
  caste: Yup.string().oneOf(Object.keys(castes)).required('Caste is required'),
  motherTongue: Yup.string()
    .oneOf(Object.keys(motherTongues))
    .required('Mother Tongue is required'),
  diet: Yup.string().oneOf(Object.keys(diets)).required('Diet is required'),
  education: Yup.string()
    .oneOf(Object.keys(educations))
    .required('Education is required'),
  occupation: Yup.string()
    .oneOf(Object.keys(occupations))
    .required('Occupation is required'),
  annualIncome: Yup.string()
    .matches(/^\d+$/, 'Annual Income must be a valid number')
    .required('Annual Income is required'),
});
