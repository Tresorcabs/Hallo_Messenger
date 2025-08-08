import axios from 'axios';
import { getToken } from './authService';
import { API_URL } from './endpoints';

// Création d'une instance d'axios avec une configuration de base
const apiClient = axios.create({
  baseURL: API_URL, // Utilise l'URL de base dynamique (dev/prod)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Création d'un intercepteur de requête
// Cet intercepteur s'exécute avant chaque requête envoyée par cette instance d'axios
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Récupérer le token d'authentification
      const token = await getToken();

      // Si un token existe, l'ajouter à l'en-tête 'Authorization'
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Si getToken() échoue (par exemple, aucun token trouvé), nous ne faisons rien
      // et la requête est envoyée sans token. Les routes protégées échoueront comme prévu.
      console.log('Aucun token trouvé, envoi de la requête sans authentification.');
    }

    // Retourner la configuration de la requête (avec ou sans le token)
    return config;
  },
  (error) => {
    // Gérer les erreurs de configuration de la requête
    return Promise.reject(error);
  }
);

import { deleteToken } from './authService';
import { resetRoot } from '../navigation/RootNavigation';

// Ajout d'un intercepteur de réponse pour gérer les erreurs globales comme l'expiration du token.
apiClient.interceptors.response.use(
  // Si la réponse est réussie (status 2xx), on ne fait rien et on la laisse passer.
  (response) => response,

  // Si la réponse est une erreur...
  async (error) => {
    const originalRequest = error.config;

    // Vérifier si l'erreur est une erreur 401 (Non autorisé) et qu'on n'a pas déjà réessayé.
    // La condition `!originalRequest._retry` empêche une boucle infinie de tentatives.
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log('Réponse 401 détectée. Le token est probablement invalide ou a expiré.');

      // Marquer cette requête comme ayant déjà été tentée.
      originalRequest._retry = true;

      // Supprimer le token invalide du stockage sécurisé.
      await deleteToken();

      // Afficher un message à l'utilisateur (optionnel mais recommandé)
      // Alert.alert("Session expirée", "Veuillez vous reconnecter.");

      // Réinitialiser la navigation et renvoyer l'utilisateur à l'écran de connexion.
      resetRoot('Login');

      // On pourrait ici implémenter une logique de rafraîchissement de token si l'API le supportait.
      // Pour l'instant, la déconnexion est la stratégie la plus simple et la plus sûre.
    }

    // Pour toutes les autres erreurs, ou si la tentative a déjà échoué, on rejette la promesse.
    return Promise.reject(error);
  }
);

export default apiClient;
