import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.error("La récupération du jeton a échoué", e);
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async () => {
      setIsSubmitting(true);
      const token = 'dummy-token';
      await SecureStore.setItemAsync('userToken', token);
      setUserToken(token);
      setIsSubmitting(false);
    },
    signOut: async () => {
      setIsSubmitting(true);
      await SecureStore.deleteItemAsync('userToken');
      setUserToken(null);
      setIsSubmitting(false);
    },
    signUp: async () => {
      setIsSubmitting(true);
      const token = 'dummy-token';
      await SecureStore.setItemAsync('userToken', token);
      setUserToken(token);
      setIsSubmitting(false);
    },
    userToken,
    isLoading,
    isSubmitting,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
