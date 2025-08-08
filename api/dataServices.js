import {
    SIGNUP,
    LOGIN,
    USER_PROFILE,
    USER_CONTACTS,
    USER_MESSAGES,
    USER_DISCUSSIONS,
    CREATE_DISCUSSION,
    ADD_CONTACT,
    GET_LAST_MESSAGE,
    CERTIFY_ACCOUNT,
    API_URL, // Gardé pour socket.io pour l'instant
} from "./endpoints";
import apiClient from "./axiosConfig"; // Importation du client axios configuré
import { storeToken, getToken, deleteToken } from "./authService"; // Importations mises à jour
import { Alert } from 'react-native';

// L'inscription n'a pas besoin de token, mais utilise apiClient pour la cohérence.
export const inscription = async (signUpData, navigation) => {
    try {
        await apiClient.post(SIGNUP, signUpData);
        navigation.replace("SignUpFinal");
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription.");
    }
};

// La connexion n'envoie pas de token, mais reçoit un token.
export const login = async (username, password, phoneNumber, navigation) => {
    try {
        const response = await apiClient.post(LOGIN, {
            nom_utilisateur: username,
            mot_de_passe: password,
            numero_de_telephone: phoneNumber,
        });

        const { access_token } = response.data;
        if (access_token) {
            await storeToken(access_token); // Utilise storeToken sécurisé
            checkToken(navigation);
        }
    } catch (error) {
        if (error.response) {
            return error.response.data.message || "Une erreur est survenue !";
        } else {
            console.error("Erreur lors de la connexion:", error);
            return 'Impossible de se connecter au serveur';
        }
    }
};

// Fonction de déconnexion
export const logout = async (navigation) => {
    await deleteToken(); // Supprime le token de manière sécurisée
    navigation.reset({ // Réinitialise la pile de navigation
        index: 0,
        routes: [{ name: 'Login' }],
    });
};

// L'intercepteur s'occupe du token
export const certifyAccount = async () => {
    try {
        const response = await apiClient.patch(CERTIFY_ACCOUNT, {});
        console.log('Réponse de certification ... ', response.data);
        return response.data;
    } catch (error) {
        console.log('Erreur lors de la certification du compte : ', error);
    }
};

// Vérifie si un token existe et navigue en conséquence
const checkToken = async (navigation) => {
    const token = await getToken(); // Utilise getToken sécurisé
    if (token) {
        navigation.navigate('Messenger');
    } else {
        navigation.navigate('Login');
    }
};

// L'intercepteur s'occupe du token
export const getProfileInfos = async () => {
    try {
        const response = await apiClient.get(USER_PROFILE);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la recuperation des informations du profil:", error);
        return null;
    }
};

// L'intercepteur s'occupe du token
export const getUserContacts = async () => {
    try {
        const response = await apiClient.get(USER_CONTACTS);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des informations des contacts:", error);
    }
};

// L'intercepteur s'occupe du token
export const addContact = async (phoneNumber) => {
    try {
        const response = await apiClient.post(ADD_CONTACT, { phoneNumber });
        console.log(response.data);
        Alert.alert('Succès', 'Contact ajouté avec succès.');
    } catch (error) {
        if (error.response) {
            Alert.alert('Erreur', error.response.data.message);
        } else {
            Alert.alert('Erreur', 'Impossible d\'ajouter le contact.');
        }
        console.error(error);
    }
};

// L'intercepteur s'occupe du token
export const getDiscussions = async () => {
    try {
        const response = await apiClient.get(USER_DISCUSSIONS);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des discussions:", error);
    }
};

// L'intercepteur s'occupe du token
export const createDiscussion = async (correspondantId, nom, statut, photo_de_profil, prenom, navigation) => {
    try {
        const requestData = { autre_utilisateur_id: correspondantId };
        const response = await apiClient.post(CREATE_DISCUSSION, requestData);

        navigation.navigate("ChatScreen", {
            discussionId: response.data.canal_id,
            nom: nom,
            profile: photo_de_profil,
            statut: statut,
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création d'une discussion:", error);
    }
};

// L'intercepteur s'occupe du token
export const getMessages = async (discussionId) => {
    try {
        const response = await apiClient.get(`${USER_MESSAGES}/${discussionId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des messages:", error);
    }
};

// L'intercepteur s'occupe du token
export const getLastMessage = async (discussionId) => {
    try {
        const response = await apiClient.get(`${GET_LAST_MESSAGE}/${discussionId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du dernier message:", error);
    }
};


// La logique de Socket.IO est maintenant gérée via le SocketContext.
