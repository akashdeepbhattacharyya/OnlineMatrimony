import { useCallback } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTokenCallBack = async () => {
  return await AsyncStorage.getItem('authToken') ?? '';
};

export const useTokenCallbackPromise = () => {
  const makeTokenCall = useTokenCallBack();
  return useCallback(
    () =>
      new Promise<string>((resolve) => {
        resolve(makeTokenCall);
      }),
    []
  );
};
