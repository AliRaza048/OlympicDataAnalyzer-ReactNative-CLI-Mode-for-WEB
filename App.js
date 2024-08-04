/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



// import { StatusBar } from 'react-native';
import AppNavigation from './src/navigation/appNavigation';
import { firebase } from '@react-native-firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  
  return (
    <AppNavigation />
  );
}







// import MyDrawer from './MyDrawer';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Image } from 'react-native';
// import OlympicImage from './images/OlympicImage.png';

// const App = () => {
  
//   return (
//     <SafeAreaProvider>
      
//       <MyDrawer olympicImage={OlympicImage} />
//     </SafeAreaProvider>
//   );
// };

// export default App;






// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Feed from './Feed';
// import Article from './Article';
// import { NavigationContainer } from '@react-navigation/native';

// const Drawer = createDrawerNavigator();
// const App = () => {
//   return (
//     <NavigationContainer>
//     <Drawer.Navigator initialRouteName='Feed'>
//       <Drawer.Screen name="Feed" component={Feed} />
//       <Drawer.Screen name="Article" component={Article} />
//     </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;