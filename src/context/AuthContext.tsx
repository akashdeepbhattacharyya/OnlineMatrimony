import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PartnerPreferences, User } from '../models/User';
import { useAppDispatch } from '../services/store/hook';
import { setUser as setUserAction } from '../services/slices/userSlice';
import { Token } from '../models/Authentication';

type AuthContextType = {
  user: User | undefined;
  token: Token | undefined;
  saveUser: (userData: User) => Promise<void>;
  clearUser: () => Promise<void>;
  saveToken: (token: Token) => Promise<void>;
  clearToken: () => Promise<void>;
  clearSession: () => Promise<void>;
  partnerPreferences?: PartnerPreferences;
  savePartnerPreferences: (preferences: PartnerPreferences) => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<Token | undefined>(undefined);
  const [partnerPreferences, setPartnerPreferences] = useState<PartnerPreferences | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          dispatch(setUserAction({ userData: parsedUser }));
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        // Clear corrupted data
        await AsyncStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          const parsedToken = JSON.parse(storedToken);
          setToken(parsedToken);
        }
      } catch (error) {
        console.error('Error loading token from storage:', error);
        // Clear corrupted data
        await AsyncStorage.removeItem('token');
      }
    };

    const loadPartnerPreferences = async () => {
      try {
        const storedPreferences = await AsyncStorage.getItem('partnerPreferences');
        if (storedPreferences) {
          const parsedPreferences = JSON.parse(storedPreferences);
          setPartnerPreferences(parsedPreferences);
        }
      } catch (error) {
        console.error('Error loading partner preferences from storage:', error);
        // Clear corrupted data
        await AsyncStorage.removeItem('partnerPreferences');
      }
    };

    loadUser();
    loadToken();
    loadPartnerPreferences();
  }, []);

  const saveUser = async (userData: User) => {
    try {
      setUser(userData);
      dispatch(setUserAction({ userData: userData }));
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user to storage:', error);
      throw error;
    }
  };

  const clearUser = async () => {
    try {
      setUser(undefined);
      await AsyncStorage.removeItem('user');
      await clearToken();
    } catch (error) {
      console.error('Error removing user from storage:', error);
      throw error;
    }
  };

  const saveToken = async (token: Token) => {
    try {
      setToken(token);
      await AsyncStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
      console.error('Error saving token to storage:', error);
      throw error;
    }
  };

  const clearToken = async () => {
    try {
      setToken(undefined);
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error clearing token from storage:', error);
      throw error;
    }
  };

  const clearSession = async () => {
    try {
      await clearUser();
      await clearToken();
    } catch (error) {
      console.error('Error clearing session:', error);
      throw error;
    }
  };

  const savePartnerPreferences = async (preferences: PartnerPreferences) => {
    try {
      setPartnerPreferences(preferences);
      await AsyncStorage.setItem('partnerPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving partner preferences to storage:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        saveUser,
        clearUser,
        saveToken,
        clearToken,
        clearSession,
        partnerPreferences,
        savePartnerPreferences,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
