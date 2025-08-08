import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { getToken } from '../api/authService';
import { API_URL } from '../api/endpoints';

// 1. Création du contexte
const SocketContext = createContext();

// Hook personnalisé pour utiliser le contexte plus facilement
export const useSocket = () => {
    return useContext(SocketContext);
};

// 2. Création du Provider
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const setupSocket = async () => {
            const token = await getToken();
            if (token && !socket) {
                // Si un token existe et que le socket n'est pas déjà connecté
                const newSocket = io(API_URL, {
                    auth: { token },
                    transports: ["websocket"],
                    reconnection: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 2000,
                });

                newSocket.on('connect', () => {
                    console.log('Socket.IO connecté avec ID:', newSocket.id);
                });

                newSocket.on('disconnect', (reason) => {
                    console.log('Socket.IO déconnecté, raison:', reason);
                });

                newSocket.on('connect_error', (error) => {
                    console.error('Erreur de connexion Socket.IO:', error.message);
                });

                setSocket(newSocket);
            }
        };

        setupSocket();

        // Fonction de nettoyage pour se déconnecter lorsque le composant est démonté ou que l'utilisateur se déconnecte
        return () => {
            if (socket) {
                console.log("Nettoyage : Déconnexion du socket.");
                socket.disconnect();
                setSocket(null);
            }
        };
    }, []); // Le tableau de dépendances vide assure que cela ne s'exécute qu'une fois au montage

    // Le provider expose le socket à tous les composants enfants
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
