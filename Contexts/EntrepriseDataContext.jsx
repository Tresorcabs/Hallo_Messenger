import React, { createContext, useState } from "react";

// Création d'un context pour les données de l'entreprise
export const EnterpriseDataContext = createContext();

export const EntrepriseDataProvider = ({ children }) => {
    // État pour les données globales
    const [generalData, setGeneralData] = useState({
        countMembers: 0,
        countProjects: 0,
        // Ajouter d'autres données générales ici si nécessaire
    });

    // Fonction pour mettre à jour les données globales
    const updateGeneralData = (newData) => {
        setGeneralData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    return (
        <EnterpriseDataContext.Provider value={{ generalData, updateGeneralData }}>
            {children}
        </EnterpriseDataContext.Provider>
    );
};