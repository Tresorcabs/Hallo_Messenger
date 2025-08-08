import { Platform } from 'react-native';

// =================================================================================================
// !! IMPORTANT !!
// Remplacez cette URL par l'URL de votre API de production lorsque vous serez prêt à déployer.
// Assurez-vous qu'elle utilise HTTPS pour des communications sécurisées.
// =================================================================================================
const PROD_API_URL = "https://your-api-url.com/";

// URLs de développement pour les différentes plateformes
const DEV_API_URL_IOS = "http://localhost:5000/";
const DEV_API_URL_ANDROID = "http://10.0.2.2:5000/"; // Adresse standard pour l'émulateur Android pour accéder au localhost de la machine hôte

// La variable globale `__DEV__` est automatiquement définie sur `true` en mode développement par React Native.
const isDevelopment = __DEV__;

// Déterminer l'URL de base à utiliser en fonction de l'environnement (développement ou production) et de la plateforme (Android ou iOS).
let baseURL;

if (isDevelopment) {
  // En mode développement, nous choisissons l'URL en fonction de la plateforme.
  baseURL = Platform.OS === 'android' ? DEV_API_URL_ANDROID : DEV_API_URL_IOS;
} else {
  // En mode production, nous utilisons toujours l'URL de production.
  baseURL = PROD_API_URL;
}

// Exporter les URLs pour qu'elles soient utilisées dans le reste de l'application.
export const API_URL = baseURL;
export const SOCKET_URL = baseURL;
