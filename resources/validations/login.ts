import * as Yup from 'yup';
import { isValidEmail, isValidPhone } from '@/utils/utils';

export const loginSchema = Yup.object({
  emailOrPhone: Yup.string()
    .required('Email or phone number is required')
    .test(
      'is-email-or-phone',
      'Enter a valid email address or phone number',
      function (value) {
        if (!value) return false;
        return isValidEmail(value) || isValidPhone(value);
      },
    ),
  password: Yup.string()
    .required('Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
});
