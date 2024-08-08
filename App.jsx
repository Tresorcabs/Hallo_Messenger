import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/Connexion/LoginScreen';
import MessengerScreen from './screens/Messagerie/MessengerScreen';
import SignUpScreen1 from './screens/Inscription/SignUpScreen1';
import SignUpScreen2 from './screens/Inscription/SignUpScreen2';
import OTPScreen from './screens/Inscription/OTPScreen';
import ProfileScreen from './screens/Inscription/ProfileScreen';
import SignUpScreen5 from './screens/Inscription/SignUpScreen5';
import SignUpEndScreen from './screens/Inscription/SignUpEndScreen';
import ChatScreen from './screens/Messagerie/AdvancedScreens/ChatScreen';
import UserProfileScreen from './screens/Messagerie/AdvancedScreens/UserProfileScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp1" component={SignUpScreen1} />
      <Stack.Screen name="SignUp2" component={SignUpScreen2} />
      <Stack.Screen name="SignUp5" component={SignUpScreen5} />
      <Stack.Screen name="SignUpFinal" component={SignUpEndScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

      <Stack.Screen name='Messenger' component={MessengerScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
      <Stack.Screen name='userProfile' component={UserProfileScreen} />
    </Stack.Navigator>
  );
}

export default App;