import Constants from "expo-constants";

export type ExportConfig = {
  apiUrl: string;
  razorpayKey: string;
};

const IS_STAGING = Constants.expoConfig?.extra?.env?.APP_VARIANT === "staging";
export const environment = __DEV__ ? "dev" : IS_STAGING ? "staging" : "prod";

const configs = {
  dev: {
    // apiUrl: "http://localhost:9999",
    apiUrl: "https://api.dhol.ai",
    razorpayKey: Constants.expoConfig?.extra?.keys?.dev?.razorpayKey,
  },
  staging: {
    apiUrl: "https://api.dhol.ai",
    razorpayKey: Constants.expoConfig?.extra?.keys?.dev?.razorpayKey,
  },
  prod: {
    apiUrl: "https://api.dhol.ai",
    razorpayKey: Constants.expoConfig?.extra?.keys?.prod?.razorpayKey,
  },
};

export const config: ExportConfig = configs[environment];
