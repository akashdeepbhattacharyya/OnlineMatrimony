const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: [], // we'll fix it below
    sourceExts: [], // we'll fix it below
  },
};

// Now get the default config first
const defaultConfig = getDefaultConfig(__dirname);

// Update assetExts and sourceExts properly
config.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, 'svg'];

module.exports = mergeConfig(defaultConfig, config);
