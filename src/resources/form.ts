export type Option<T = string> = {
  label: string;
  value: T;
};

export type CheckBoxOption<T = string> = {
  icon?: React.ReactNode;
} & Option<T>;

export type UserRegistrationFormType = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
};

export type LoginFormType = {
  emailOrPhone: string;
  password: string;
  terms: boolean;
};
