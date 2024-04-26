module.exports = {
  typescript: {
    enableTypeChecking: true /* (default value) */,
  },
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */,
    },
    configure: (jestConfig, env, paths, resolve, rootDir) => {
      return jestConfig;
    },
  },
};
