import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';


// import AppNavigation from './navigation/AppNavigation';
// export default function App() {
//   return (
//     <AppNavigation />
//   );
// }


import MyDrawer from './src/components/MyDrawer.js';
const App = () => {
  return (
      <MyDrawer />
  );
};
export default App;