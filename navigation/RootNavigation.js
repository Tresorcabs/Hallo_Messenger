import { createNavigationContainerRef } from '@react-navigation/native';

/**
 * Crée une référence au conteneur de navigation.
 * Cela nous permet d'accéder à la navigation depuis l'extérieur des composants React.
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
export const navigationRef = createNavigationContainerRef();

/**
 * Navigue vers un écran spécifique.
 * @param {string} name - Le nom de la route vers laquelle naviguer.
 * @param {object} params - Les paramètres à passer à la route.
 */
export function navigate(name, params) {
  // S'assure que le conteneur de navigation est prêt avant de tenter de naviguer.
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    console.warn("Tentative de navigation avant que le conteneur de navigation ne soit prêt.");
  }
}

/**
 * Réinitialise la pile de navigation à une route de base (par défaut, l'écran de connexion).
 * C'est utile pour la déconnexion, car cela empêche l'utilisateur de revenir en arrière
 * vers les écrans précédents qui nécessitaient une authentification.
 * @param {string} routeName - Le nom de la route à définir comme nouvelle racine.
 */
export function resetRoot(routeName = 'Login') {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{ name: routeName }],
        });
    } else {
        console.warn("Tentative de réinitialisation de la navigation avant que le conteneur ne soit prêt.");
    }
}
