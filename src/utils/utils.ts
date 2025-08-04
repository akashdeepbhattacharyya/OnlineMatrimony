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

export const toAge = (dateOfBirth?: string): number | undefined => {
  if (!dateOfBirth) return undefined;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const toFeetAndInches = (heightInCm?: number): string | undefined => {
  if (!heightInCm) return undefined;

  const totalInches = heightInCm / 2.54; // Convert cm to inches
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
};

export const toUri = (
  fullName: string,
  primaryPhotoUrl?: string,
  background = '4F4F4F',
  color = 'F85F5F',
  size = 512,
): string => {
  if (primaryPhotoUrl) {
    return primaryPhotoUrl;
  }
  return `https://ui-avatars.com/api/?name=${fullName}&background=${background}&color=${color}&size=${size}`;
};

export function formatAnnualIncome(value: number) {
  if (value < 10000000) {
    const lakhs = Math.floor(value / 100000);
    return `${lakhs} ${lakhs === 1 ? 'Lakh' : 'Lakhs'}`;
  } else {
    const crores = Math.floor(value / 10000000);
    return `${crores} ${crores === 1 ? 'Crore' : 'Crores'}`;
  }
}
