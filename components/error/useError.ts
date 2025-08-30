import { showError as setError, hideError as clearError, ErrorData } from '@/services/slices/error-slice';
import { useAppDispatch } from '@/services/store/hook';
import { useCallback } from 'react';

export const useError = () => {
  const dispatch = useAppDispatch();

  const showError = useCallback((data: ErrorData) => {
    dispatch(setError(data));
  }, [dispatch]);

  const hideError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return { showError, hideError };
};
