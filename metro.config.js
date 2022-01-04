module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    // Blocking web specific files prevents us from using them accidentally
    blockList: [/\.web.tsx$/, /\.web.ts$/],
  },
};
