import { ConfigContext, ExpoConfig } from "expo/config";

export const IS_STAGING = process.env.APP_VARIANT === 'staging';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Dhol',
  slug: 'onlinematrimony',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  scheme: 'dhol',
  newArchEnabled: true,
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.joshful.dhol',
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'Allow to access your location for address autofill',
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: 'com.joshful.dhol',
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: './assets/images/icon.png',
  },
  plugins: [
    "expo-router",
    'expo-font',
    [
      'expo-image-picker',
      {
        photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
        cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.',
      },
    ],
    [
      'expo-splash-screen',
      {
        resizeMode: 'cover',
        ios: {
          image: './assets/images/splash.png',
          enableFullScreenImage_legacy: true,
        },
        android: {
          image: './assets/images/splash_android.png',
          imageWidth: 200,
        },
        backgroundColor: '#2B2B2B',
      },
    ],
  ],
  extra: {
    env: {
      APP_VARIANT: process.env.APP_VARIANT,
    },
    eas: {
      projectId: '0cfad855-470b-4db1-8914-69e70917f01f',
    },
    keys: {
      dev: {
        razorpayKey: process.env.DEV_RAZORPAY_KEY,
      },
      prod: {
        razorpayKey: process.env.PROD_RAZORPAY_KEY,
      },
    },
  },
  owner: 'onlinematrimony',
});
