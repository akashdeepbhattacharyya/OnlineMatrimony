import * as Yup from 'yup';
import { genders } from '../gender';
import { cities, stateCityMapping, states } from '../city-state';
import { UpdateUserProfileFormType } from '../form';

export const updateUserProfileSchema = Yup.object<UpdateUserProfileFormType>({
  fullName: Yup.string().required('Full Name is required'),
  dateOfBirth: Yup.string().required('DOB is required'),
  gender: Yup.string()
    .oneOf(Object.keys(genders))
    .required('Gender is required'),
  // height: Yup.number()
  //   .min(0, 'Height must be positive')
  //   .required('Height is required'),
  // weight: Yup.number()
  //   .min(0, 'Weight must be positive')
  //   .required('Weight is required'),
  // maritalStatus: Yup.string().oneOf(Object.keys(maritalStatus)),
  // religion: Yup.string().oneOf(Object.keys(religions)),
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
});
