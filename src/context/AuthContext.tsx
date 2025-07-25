import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/Authentication';
import { useAppDispatch } from '../store/hook';
import { setUser as setUserAction } from '../slices/userSlice'
import { UserProfile } from '../models/User';

type AuthContextType = {
  user: User | null;
  login: (userData: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
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
          dispatch(setUserAction({ UserProfile: parsedUser, token: '' }));
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        // Clear corrupted data
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (userData: User, token: string) => {
    try {
      setUser(userData);
      dispatch(setUserAction({ UserProfile: userData, token }));

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving user to storage:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing user from storage:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
