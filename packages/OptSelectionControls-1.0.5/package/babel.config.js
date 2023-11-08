module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      "@babel/react",
      "@babel/typescript"
    ],
    plugins: [
        "transform-class-properties",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-transform-regenerator", // https://github.com/facebook/jest/pull/7595
        "@babel/plugin-transform-runtime"
    ]    
  };