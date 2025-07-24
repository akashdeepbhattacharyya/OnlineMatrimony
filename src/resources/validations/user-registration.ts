import * as Yup from 'yup';
import { genders } from '../gender';

export const userRegistrationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone must be 10 digits')
    .required('Phone is required'),
  dateOfBirth: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'DOB must be in DD/MM/YYYY')
    .required('DOB is required'),
  gender: Yup.string()
    .oneOf(Object.keys(genders))
    .required('Gender is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
});


const isValidPhone = (value: string) => {
  const phoneRegex = /^[0-9]{10}$/; // You can customize this
  return phoneRegex.test(value);
};

const isValidEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const validationSchema = Yup.object({
  emailOrPhone: Yup.string()
    .required('Email or phone number is required')
    .test(
      'is-email-or-phone',
      'Enter a valid email address or phone number',
      function (value) {
        if (!value) return false;
        return isValidEmail(value) || isValidPhone(value);
      }
    ),
    rememberMe: Yup.boolean()
      .required('Remember me is required')
      .oneOf([true], 'You must accept the terms'),
});
