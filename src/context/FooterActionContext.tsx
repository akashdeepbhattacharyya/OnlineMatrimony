import React, { createContext, useContext, useRef, useState } from 'react';

type FooterActionContextType = {
  setAcceptMatchCallback: (callback: () => void) => void;
  setRejectMatchCallback: (callback: () => void) => void;
  runAcceptMatchCallback: () => void;
  runRejectMatchCallback: () => void;
};

const FooterActionContext = createContext<FooterActionContextType | undefined>(
  undefined,
);

export const FooterActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [acceptCallback, setAcceptCallback] = useState<(() => void) | null>(
  //   null,
  // );
  // const [rejectCallback, setRejectCallback] = useState<(() => void) | null>(
  //   null,
  // );
  const acceptMatchCallBackRef = useRef<(() => void)>(null);
  const rejectMatchCallBackRef = useRef<(() => void)>(null);

  const setAcceptMatchCallback = (callback: () => void) => {
    console.log('Accept match callback set');
    acceptMatchCallBackRef.current = callback;
  };
  const setRejectMatchCallback = (callback: () => void) => {
    console.log('Reject match callback set');
    rejectMatchCallBackRef.current = callback;
  };

  const runAcceptMatchCallback = () => {
    console.log('Running accept match callback');
    if (acceptMatchCallBackRef.current) {
      console.log('Accept match callback is defined, executing');
      acceptMatchCallBackRef.current();
    }
  };

  const runRejectMatchCallback = () => {
    console.log('Running reject match callback');
    if (rejectMatchCallBackRef.current) {
      console.log('Reject match callback is defined, executing');
      rejectMatchCallBackRef.current();
    }
  };

  return (
    <FooterActionContext.Provider
      value={{
        setAcceptMatchCallback,
        setRejectMatchCallback,
        runAcceptMatchCallback,
        runRejectMatchCallback,
      }}
    >
      {children}
    </FooterActionContext.Provider>
  );
};

export const useFooterAction = () => {
  const context = useContext(FooterActionContext);
  if (!context) {
    throw new Error('useFooterAction must be used within FooterActionProvider');
  }
  return context;
};
