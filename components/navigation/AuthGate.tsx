import { useFetchUserByUserId } from "@/hooks/useFetchUserByUserId";
import { useUser } from "@/hooks/useUser";
import { SplashScreen, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

interface AuthGateProps {
  children: React.ReactNode;
}

const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isUserDataFetching, setIsUserDataFetching] = useState<boolean>(false);
  const { fetchUser, error: dataLoadingError, loading: dataLoading, user: userData } = useFetchUserByUserId();

  const onLoaded = useCallback(() => {
    setIsAuthenticating(false);
    router.replace("/(app)/(onboarding)");
  }, [router]);

  useEffect(() => {
    if (!isSignedIn) {
      return;
    } else {
      (async () => {
        if (!isUserDataFetching) {
          setIsUserDataFetching(true);
          await fetchUser();
        }
      })();
    }
  }, [fetchUser, isSignedIn, isUserDataFetching]);

  useEffect(() => {
    if (!isSignedIn && !isAuthenticating) {
      router.replace("/(auth)/signin");
      setIsAuthenticating(true);
      return;
    }

    if (isBooting) {
      if (isSignedIn && userData) {
        setIsBooting(false);
        setIsAuthenticating(false);
        onLoaded();
        SplashScreen.hideAsync();
      } else if (isSignedIn) {
        setIsAuthenticating(false);
        // do nothing, we're waiting on the user data to load
      } else {
        SplashScreen.hideAsync();
        setIsBooting(false);
        router.replace("/get-started");
      }
      return;
    }

    if (isAuthenticating) {
      if (dataLoading) {
        return;
      }

      if (dataLoadingError) {
        if (__DEV__) {
          console.error("Error fetching user data:", dataLoadingError);
        }
        return;
      }

      if (userData) {
        onLoaded();
        setIsAuthenticating(false);
        return;
      }
    }
  }, [dataLoading, dataLoadingError, isAuthenticating, isBooting, isSignedIn, onLoaded, router, userData]);

  return <>{children}</>;
};

export default AuthGate;
