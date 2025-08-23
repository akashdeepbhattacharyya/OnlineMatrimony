import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  USER: 'user',
  TOKEN: 'token',
  PARTNER_PREFERENCES: 'partnerPreferences',
};

export const setItem = async (key: keyof typeof KEYS, value: any) => {
  await AsyncStorage.setItem(KEYS[key], JSON.stringify(value));
};

export const getItem = async (key: keyof typeof KEYS) => {
  const value = await AsyncStorage.getItem(KEYS[key]);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error parsing value for key ${key}:`, error);
      throw error;
    }
  }
  throw new Error(`No value found for key ${key}`);
};

export const removeItem = async (key: keyof typeof KEYS) => {
  await AsyncStorage.removeItem(KEYS[key]);
};

export const clear = async () => {
  return await AsyncStorage.clear();
};
