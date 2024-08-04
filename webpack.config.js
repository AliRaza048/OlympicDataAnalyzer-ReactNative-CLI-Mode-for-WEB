const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, 'App.web.js'), // Change this to your main App file
    
    //exclude manually
    path.resolve(__dirname, 'MyDrawer.js'),
    path.resolve(__dirname, 'MedalTallyTable.js'),
    path.resolve(__dirname, 'utils.js'),
    path.resolve(__dirname, 'OverallAnalysis.js'),
    path.resolve(__dirname, 'Heatmap.js'),
    path.resolve(__dirname, 'StatisticsComponent.js'),
    path.resolve(__dirname, './navigation/appNavigation.js'),
    path.resolve(__dirname, './navigation/AppNavigation.js'),
    path.resolve(__dirname, './screens/LoginScreen.js'),
    path.resolve(__dirname, './screens/SignUpScreen.js'),
    path.resolve(__dirname, './screens/WelcomeScreen.js'),
    path.resolve(__dirname, '../screens/HomeScreen.js'),
    path.resolve(__dirname, './theme/index.js'),
    // path.resolve(__dirname, 'Feed.js'),
    //exclude manually
    
    path.resolve(__dirname, 'src'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins: ['react-native-web'],
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};
module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'rnw_blogpost.bundle.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',

      //exclude manually
      'react-native-reanimated$': false,
      //exclude manually
      
      //exclude manually
      'react-native-vector-icons$': false,
      'react-native-vector-icons/FontAwesome5$': false,
      'react-native-vector-icons/MaterialCommunityIcons$': false,
      //exclude manually

      //exclude manually
      '@react-native-firebase/auth$': false,
      //exclude manually

      //exclude manually
      'react-native-chart-kit$': false,
      //exclude manually

    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
};