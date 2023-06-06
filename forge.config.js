module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./src/icon"
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "Serialion",
        setupIcon: "./src/icon.ico",
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin',
        "linux"
      ],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        name: "Serialion"
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        devContentSecurityPolicy: `*;`,
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/preload.js',
              },
            },
          ],
        },
      },
    },
  ],
};
