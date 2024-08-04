import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../screens/WelcomeScreen';
import LoginScreen from '../../screens/LoginScreen'
import SignUpScreen from '../../screens/SignUpScreen';
import MyDrawer from '../components/MyDrawer';
import { BrowserRouter, Route, Routes, Link, NavLink } from 'react-router-dom';
import { Platform } from 'react-native';
// import HomeScreen from '../../screens/HomeScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {

  return Platform.OS === 'web' ? (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<HomeScreen />} />
          {/* <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/drawer" element={<WebDrawer />} /> */}
        </Routes>
      </BrowserRouter>
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="MyDrawer" options={{headerShown: false}} component={MyDrawer} />
              {/* <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} /> */}
     {/* <Stack.Screen name="Analyser" options={{headerShown: false}} component={OverallAnalysis} /> */}

              {/* <Stack.Screen name="Medal" options={{headerShown: false}} component={MedalTallyTable} /> */}


      </Stack.Navigator>
    </NavigationContainer>
    
  );
}



// import { View, Text } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// // import SignUpScreen from '../screens/SignUpScreen';/
// import MyDrawer from '../MyDrawer';
// import { BrowserRouter, Route, Routes, Link, NavLink } from 'react-router-dom';
// import { Platform } from 'react-native';

// const Stack = createNativeStackNavigator();


// export default function AppNavigation() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Welcome'>
//         <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
//         <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
//         <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
//         <Stack.Screen name="MyDrawer" options={{headerShown: false}} component={MyDrawer} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }