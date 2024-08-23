import React, { createContext, useState, useContext } from 'react';

const SpotContext = createContext();

// Création du provider qui va envelopper notre application
export const SpotProvider = ({ children }) => {

    const [spots, setSpots] = useState([]);
    const [spotViews, setSpotViews] = useState(0);

    const [spotVisualizerVisible, setSpotVisualizerVisible] = useState(false);

    // Fonction pour ajouter un nouveau spots
    const addSpot = (newSpot) => {
        setSpots([...spots, newSpot]);
    };


    return (
        <SpotContext.Provider value={{ spots, addSpot, spotViews, setSpotViews, spotVisualizerVisible, setSpotVisualizerVisible }}>
            {children}
        </SpotContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte facilement
export const useSpotContext = () => useContext(SpotContext);