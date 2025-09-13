import { SubscriptionFeatures } from "../models/SubscriptionPlan";

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
  color = 'F15B6A',
  size = 512,
): string => {
  if (primaryPhotoUrl) {
    return primaryPhotoUrl;
  }
  return `https://ui-avatars.com/api/?name=${fullName}&background=${background}&color=${color}&size=${size}`;
};

export function formatAnnualIncome(value: number) {
  if (value === 0) {
    return 'N/A';
  }
  if (value < 10000000) {
    const lakhs = Math.floor(value / 100000);
    return `${lakhs} ${lakhs === 1 ? 'Lakh' : 'Lakhs'}`;
  } else {
    const crores = Math.floor(value / 10000000);
    return `${crores} ${crores === 1 ? 'Crore' : 'Crores'}`;
  }
}

export function formatSubscriptionPlanFeature(key: keyof SubscriptionFeatures, value: number | boolean) {
  switch (key) {
    case 'chatLimit':
      return `Active Chat limit: ${value} accounts`;
    case 'manualSearch':
      return 'Manual Search';
    case 'matchesPerWeek':
      return `${value} matches per week`;
    case 'sendInterestOption':
      return 'Send Interest Option';
    default:
      return '';
  }
}

export function calculateExpiryDateInWeeks(endDate: string): string | undefined {
  if (!endDate) return undefined;

  const end = new Date(endDate);
  const today = new Date();
  const utcEnd = new Date(
    Date.UTC(
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
    ),
  );
  const utcToday = new Date(
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    ),
  );
  const weeks = Math.ceil((utcEnd.getTime() - utcToday.getTime()) / (1000 * 60 * 60 * 24 * 7));
  return `${weeks} Weeks`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString.endsWith('Z') ? dateString : dateString + 'Z');
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return 'Today';
  }

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isYesterday) {
    return 'Yesterday';
  }

  // For other dates, return in 'Month Day, Year' format
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString.endsWith('Z') ? dateString : dateString + 'Z');
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString.endsWith('Z') ? dateString : dateString + 'Z');
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return `${date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  }

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isYesterday) {
    return `Yesterday`;
  }

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}