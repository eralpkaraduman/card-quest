module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@controllers': './src/controllers',
          '@': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
