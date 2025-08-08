import * as SecureStore from 'expo-secure-store';

// Utiliser une clé constante pour éviter les fautes de frappe.
const TOKEN_KEY = 'authToken';

/**
 * Stocke le token d'authentification de manière sécurisée.
 * @param {string} token - Le token JWT à stocker.
 */
export const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    console.log("Token stocké de manière sécurisée.");
  } catch (error) {
    console.error("Erreur lors du stockage sécurisé du token:", error);
  }
};

/**
 * Récupère le token d'authentification depuis le stockage sécurisé.
 * @returns {Promise<string|null>} Le token ou null s'il n'est pas trouvé.
 */
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("Erreur lors de la récupération sécurisée du token:", error);
    return null;
  }
};

/**
 * Supprime le token d'authentification du stockage sécurisé.
 */
export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log("Token supprimé de manière sécurisée.");
  } catch (error) {
    console.error("Erreur lors de la suppression sécurisée du token:", error);
  }
};