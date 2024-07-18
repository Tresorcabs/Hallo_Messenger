import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen1 from './screens/SignUpScreen1';
import SignUpScreen2 from './screens/SignUpScreen2';
import OTPScreen from './screens/OTPScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen5 from './screens/SignUpScreen5';
import SignUpEndScreen from './screens/SignUpEndScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp1" component={SignUpScreen1} />
        <Stack.Screen name="SignUp2" component={SignUpScreen2} />
        <Stack.Screen name="SignUp5" component={SignUpScreen5} />
        <Stack.Screen name="SignUpFinal" component={SignUpEndScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>  
  );
}

export default App;