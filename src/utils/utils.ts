export const isValidPhone = (value: string) => {
  const phoneRegex = /^[0-9]{10}$/; // You can customize this
  return phoneRegex.test(value);
};

export const isValidEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isEmailOrPhone = (
  value: string,
): 'email' | 'phone' | 'invalid' => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/; // Adjust for country codes if needed

  if (emailRegex.test(value)) {
    return 'email';
  } else if (phoneRegex.test(value)) {
    return 'phone';
  } else {
    return 'invalid';
  }
};
