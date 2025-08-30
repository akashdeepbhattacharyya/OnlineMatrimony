import React, { createContext, useContext, ReactNode } from 'react';
import { View } from 'tamagui';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppSelector } from "@/services/store/hook";
import { showError as setError, hideError as clearError, ErrorData, ErrorDialog } from "@/components/error";

interface ErrorContextProps {
  showError: (error: ErrorData) => void;
  hideError: () => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const { visible } = useAppSelector((state) => state.error);
  const safeAreaInsets = useSafeAreaInsets();

  const showError = (error: ErrorData) => setError(error);
  const hideError = () => clearError();

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {children}
      {visible && (
        <View
          position="absolute"
          width="90%"
          alignSelf="center"
          y={safeAreaInsets.top + 4}
          zIndex={1}
        >
          <ErrorDialog />
        </View>
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within ErrorProvider');
  }
  return context;
};
