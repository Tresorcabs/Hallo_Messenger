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
import FilePreview from "./screens/Messagerie/AdvancedScreens/FilePreview";
import { EntrepriseDataProvider } from './Contexts/EntrepriseDataContext';
import { AuthProvider, AuthContext } from './Contexts/AuthContext';
import React, { useContext } from 'react';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <EntrepriseDataProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </EntrepriseDataProvider>
    </AuthProvider>
  );
}

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp1" component={SignUpScreen1} />
      <Stack.Screen name="SignUp2" component={SignUpScreen2} />
      <Stack.Screen name="SignUp5" component={SignUpScreen5} />
      <Stack.Screen name="SignUpFinal" component={SignUpEndScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Messenger" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name='Messenger' component={MessengerScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
      <Stack.Screen name='userProfile' component={UserProfileScreen} />
      <Stack.Screen name="FilePreview" component={FilePreview} />
    </Stack.Navigator>
  );
};

import { ActivityIndicator, View } from 'react-native';

const SplashScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

const RootNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return userToken ? <MainNavigator /> : <AuthNavigator />;
}

export default App;