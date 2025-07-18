const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add SVG support
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// Fix for TurboModuleRegistry issues
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Fix transformer issues
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

// Fix for Hermes engine issues
config.transformer.hermesParser = false;

// Reset cache aggressively
config.resetCache = true;

module.exports = config;