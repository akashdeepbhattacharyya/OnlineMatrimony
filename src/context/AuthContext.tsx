import React, { createContext, useContext, useEffect, useState } from 'react';
import { PartnerPreferences, User } from '../models/User';
import { useAppDispatch } from '../services/store/hook';
import { setUser as setUserAction } from '../services/slices/userSlice';
import { setPartnerPreferences as setPartnerPreferencesAction } from '../services/slices/partner-preferences';
import { Token } from '../models/Authentication';
import { getItem, removeItem, setItem } from '../services/local-storage';

type AuthContextType = {
  user: User | undefined;
  token: Token | undefined;
  partnerPreferences: PartnerPreferences | undefined;
  saveUser: (userData: User) => Promise<void>;
  saveToken: (token: Token) => Promise<void>;
  savePartnerPreferences: (preferences?: PartnerPreferences) => Promise<void>;
  clearUser: () => Promise<void>;
  clearToken: () => Promise<void>;
  clearPartnerPreferences: () => Promise<void>;
  clearSession: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<Token | undefined>(undefined);
  const [partnerPreferences, setPartnerPreferences] = useState<
    PartnerPreferences | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const storedUser = await getItem('USER');
        setUser(storedUser);
        dispatch(setUserAction({ userData: storedUser }));
      } catch (error) {
        console.error('Error loading user from storage:', error);
        // Clear corrupted data
        await removeItem('USER');
      } finally {
        setIsLoading(false);
      }
    };

    const loadToken = async () => {
      try {
        const storedToken = await getItem('TOKEN');
        setToken(storedToken);
      } catch (error) {
        console.error('Error loading token from storage:', error);
        // Clear corrupted data
        await removeItem('TOKEN');
      }
    };

    const loadPartnerPreferences = async () => {
      try {
        const storedPreferences = await getItem('PARTNER_PREFERENCES');
        setPartnerPreferences(storedPreferences);
        dispatch(
          setPartnerPreferencesAction({
            partnerPreferences: storedPreferences,
          }),
        );
      } catch (error) {
        console.error('Error loading partner preferences from storage:', error);
        // Clear corrupted data
        await removeItem('PARTNER_PREFERENCES');
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
      await setItem('USER', userData);
    } catch (error) {
      console.error('Error saving user to storage:', error);
      throw error;
    }
  };

  const saveToken = async (token: Token) => {
    try {
      setToken(token);
      await setItem('TOKEN', token);
    } catch (error) {
      console.error('Error saving token to storage:', error);
      throw error;
    }
  };

  const savePartnerPreferences = async (preferences?: PartnerPreferences) => {
    try {
      setPartnerPreferences(preferences);
      dispatch(
        setPartnerPreferencesAction({ partnerPreferences: preferences }),
      );
      await setItem('PARTNER_PREFERENCES', preferences);
    } catch (error) {
      console.error('Error saving partner preferences to storage:', error);
      throw error;
    }
  };

  const clearUser = async () => {
    try {
      setUser(undefined);
      await removeItem('USER');
      await clearToken();
    } catch (error) {
      console.error('Error removing user from storage:', error);
      throw error;
    }
  };

  const clearToken = async () => {
    try {
      setToken(undefined);
      await removeItem('TOKEN');
    } catch (error) {
      console.error('Error clearing token from storage:', error);
      throw error;
    }
  };

  const clearPartnerPreferences = async () => {
    try {
      setPartnerPreferences(undefined);
      await removeItem('PARTNER_PREFERENCES');
    } catch (error) {
      console.error('Error clearing partner preferences from storage:', error);
      throw error;
    }
  };

  const clearSession = async () => {
    try {
      await clearUser();
      await clearToken();
      await clearPartnerPreferences();
    } catch (error) {
      console.error('Error clearing session:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        partnerPreferences,
        saveUser,
        clearUser,
        saveToken,
        clearToken,
        clearSession,
        savePartnerPreferences,
        clearPartnerPreferences,
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
