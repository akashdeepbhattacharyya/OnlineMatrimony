export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserRegistrationRequest = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
};
