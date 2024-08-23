import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, Modal, FlatList } from 'react-native';
import { useSpotContext } from '../Contexts/spotProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from './colors';
import SpotCarousel from './SpotCarousel';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');


export const SpotVisualizer = ({ visible }) => {

    const navigation = useNavigation();

    const { spots, spotViews, setSpotViews, spotVisualizerVisible, setSpotVisualizerVisible } = useSpotContext();
    const [showSpot, setShowSpot] = useState(true);

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setShowSpot(false);
    //     }, spots.duration * 1000); // Convertir la durée en millisecondes

    //     return () => clearTimeout(timeout);
    // }, [spots.duration]);

    const onCarouselClose = () => {

        setSpotVisualizerVisible(false);
    }

    // Composant d'affichage d'un spot
    return (
        <GestureHandlerRootView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={spotVisualizerVisible} >


                {/** spot Carousel */}
                <SpotCarousel spots={spots} spotViews={spotViews} onClose={onCarouselClose} visible={spotVisualizerVisible} />

            </Modal>
        </GestureHandlerRootView>
    );
};

// ... Styles
