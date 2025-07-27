export const IS_STAGING = process.env.APP_VARIANT === 'development';
export const IS_LOCAL = process.env.APP_VARIANT === 'local';

module.exports = {
  expo: {
    name: 'OnlineMatrimony',
    slug: 'onlinematrimony',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/img3.png',
    userInterfaceStyle: 'light',
    scheme: 'onlinematrimony',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymous.onlinematrimony',
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'Allow to access your location for address autofill',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/img3.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.anonymous.onlinematrimony',
    },
    web: {
      favicon: './assets/images/img3.png',
    },
    plugins: [
      'expo-font',
      [
        'expo-image-picker',
        {
          photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '0cfad855-470b-4db1-8914-69e70917f01f',
      },
      keys: {
        local: {
          apiBaseUrl: process.env.LOCAL_BASE_URL,
        },
        dev: {
          apiBaseUrl: process.env.DEV_BASE_URL,
        },
        prod: {
          apiBaseUrl: process.env.PROD_BASE_URL,
        },
      },
    },
    owner: 'onlinematrimony',
  },
};
