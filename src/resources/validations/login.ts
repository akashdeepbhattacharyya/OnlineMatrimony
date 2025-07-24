import * as Yup from 'yup';
import { isValidEmail, isValidPhone } from '@/src/utils/utils';

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
  rememberMe: Yup.boolean()
    .required('Remember me is required')
    .oneOf([true], 'You must accept the terms'),
});
