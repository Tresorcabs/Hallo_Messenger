import {
    API_URL,
    SOCKET_URL,
    SIGNUP,
    LOGIN,
    USER_PROFILE,
    USER_CONTACTS,
    USER_MESSAGES,
    USER_DISCUSSIONS,
    CREATE_DISCUSSION, 
    ADD_CONTACT,
    GET_LAST_MESSAGE,
    CERTIFY_ACCOUNT
} from "./endpoints";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from "socket.io-client";
import { getToken } from "./authService";
import { Alert} from 'react-native';

    export const inscription = async (signUpData, navigation) => {
        // Envoi des données vers l'api backend pour stockage

        try {
            const response = await axios.post(API_URL + SIGNUP, signUpData, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            navigation.replace("SignUpFinal");

        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
        }

    }


    export const login = async (username, password, phoneNumber, navigation) => {
    try {
        // Appel API pour la connexion
        const response = await axios.post(API_URL + LOGIN, {

            nom_utilisateur: username,
            mot_de_passe: password,
            numero_de_telephone: phoneNumber,

        });
        console.log('Response API:', response.data);
        const { access_token } = response.data;
        // Vérification de l'existence token dans la Requête (et enregistrement dans AsyncStorage par exemple)
        if (access_token) {

            // Stocker le token dans AsyncStorage
            storeToken(access_token);
            checkToken(navigation);
        }
    } catch (error) {
        // Gestion des erreurs API
        if (error.response) {
            const apiError = (error.response.data.message || "Une erreur est survenue !");
            return apiError;
        } else {
            const apiError = ('Impossible de se connecter au serveur');
            console.error("Erreur lors de la connexion:", error);
            return apiError;
        }

        // setIsHelperTextVisible(true);

        // setTimeout(() => {
        //     setIsHelperTextVisible(false);
        // }, 3000);
    }
}


// certifier son compte
export const certifyAccount = async () => {
    try {
        const token = await getToken();
        if (token) {
            const response = await axios.patch(
                API_URL + CERTIFY_ACCOUNT, 
                {},  // Pas de charge utile, donc objet vide
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            console.log('Réponse de certification ... ', response.data);
            return response.data;
        } else {
            console.log("Le token n'est pas existant");
        }
    } catch (error) {
        console.log('Erreur lors de la certification du compte : ', error);
    }
};

const checkToken = async (navigation) => {
        
        const token = await AsyncStorage.getItem('authToken');
    if (token) {
        navigation.navigate('Messenger');
        }
        else {
        navigation.navigate('Login');
        }
    };



    export const storeToken = async (token) => {
        await AsyncStorage.setItem('authToken', token);
        console.log("Connexion , token stocké :", token);
    }

    export const getProfileInfos = async (navigation) => {
    try {
        // Requête pour obtenir les informations du profil
        const token = await getToken();
        console.log("Token récupéré:", token);
        if (token) {
            const response = await axios.get(API_URL + USER_PROFILE, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Inclure le JWT dans l'en-tête Authorization
                },
            });
            const userProfileData = await response.data;
            console.log("Données du profil:", userProfileData);
            return userProfileData;
        }
    }
    catch (error) {
        console.error("Erreur lors de la recuperation des informations du profil:", error);
        return null;
    }
    }


    export const getUserContacts = async () => {
    try {
        const token = await getToken();

        if (token) {
            const response = await axios.get(API_URL + USER_CONTACTS, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("Liste de contacte ---> ",response.data);
            return response.data;
            
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des informations des contacts:", error);
        if (error.response) {
        console.error("Réponse du serveur:", error.response.data);
        console.error("Statut de la réponse:", error.response.status);
        }
    }
    };


export const addContact = async (phoneNumber) => {
    const token = await getToken();
    if (token) {
                try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await axios.post(API_URL + ADD_CONTACT, {
                phoneNumber: phoneNumber
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

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
    }
    } 

    export const getDiscussions = async () => {
    const token = await getToken();

    if (token) {
        const response = await axios.get(API_URL + USER_DISCUSSIONS, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        });
        //console.log("Discussions:", response.data);
        return response.data;
    }
    };

    // Initialisation d'un socket.io-client
    export const initSocket = async () => {
        const token = await getToken();
        if (token) {
            const socket = io(API_URL, {
                auth: {
                    token
                }
            });
            return socket;
        }
    }

// Route pour la création d'un canal de communication de type normal entre 2 utilisateurs de la base de données
    export const createDiscussion = async (correspondantId, nom, statut, photo_de_profil, prenom, navigation) => {
        const token = await getToken();

        if (token) {
            const requestData = {
                autre_utilisateur_id: correspondantId,
            }
            console.log
            try {
            const response = await axios.post(API_URL + CREATE_DISCUSSION, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            navigation.navigate("ChatScreen", {
            discussionId: response.data.canal_id,
            nom: nom,
            //phoneNumber: item.contactPhone,
            profile: photo_de_profil,
            statut: statut,
            })
            return response.data;

            } catch (error) {
                console.error("Erreur lors de la création d'une discussion:", error);
            }
        }
    }

// Route de récupération des messages d'une discussion
    export const getMessages = async (discussionId) => {
        const token = await getToken();
        if (token) {
            const response = await axios.get(API_URL + USER_MESSAGES + "/" + discussionId, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            return response.data;
        }
    }


// Route pour l'envoi d'un message en temps réel avec socket
export const sendMessage = async (canalId, contenu, typeMessage = 'texte') => {
    console.log('Envoi du message:', canalId, contenu, typeMessage);
    try {
        const token = await getToken(); // Récupération du token utilisateur
        if (token) {
            const socket = io(API_URL, {
                extraHeaders: {
                    Authorization: `Bearer ${token}`,  // Envoi du token dans l'en-tête
                },
                auth: {
                    token,
                },
                transports: ["websocket"], // Force WebSocket
                reconnectionAttempts: 3, // Limiter les tentatives de reconnexion
                reconnectionDelay: 2000, // Intervalle de reconnexion en millisecondes
            });

            // Envoi du message avec les données requises
            socket.emit('envoyer_message', {
                canal_id: canalId,
                contenu,
                type_message: typeMessage,
            }, (err) => {
                if (err) {
                    console.error('Erreur lors de l\'envoi du message:', err);
                }

            });

            // Gérer la réception de la confirmation du serveur
            socket.on('nouveau_message', (data) => {
                console.log('Message envoyé avec succès:', data);
                // Vous pouvez mettre à jour votre interface utilisateur ici si nécessaire
            });

            socket.on('connect_error', (err) => {
                console.error('Erreur de connexion au Socket.IO:', err);
            });
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
    }
};

// ! Route pour la récupération du dernier message d'un canal 
export const getLastMessage = async (discussionId) => {
    const token = await getToken();
    if (token) {
        const response = await axios.get(API_URL + GET_LAST_MESSAGE + "/" + discussionId, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        return response.data;
    }
}
