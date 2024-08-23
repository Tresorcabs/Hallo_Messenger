import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../components/colors';
import CameraComponent from '../../../components/CameraComponent';
import MediaGridComponent from '../../../components/MediaGridComponent';
import SpotSetterComponent from '../../../components/SpotSetterComponent';

const SpotSelectorScreen = ({ navigation }) => {

    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSpotType, setSelectedSpotType] = useState(null);

    const handleCapture = (imageUri) => {
        setCapturedImage(imageUri);
        setShowCamera(false);
    };

    const openSpotModal = (type) => {
        setSelectedSpotType(type);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* Header du sélecteur */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={colors.pureWhite} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Créer un nouveau spot</Text>
            </View>

            {/** Zone de selection */}
            <View style={styles.selectionZone}>
                {/* Texte de question */}
                <Text style={styles.questionText}>Quel type de spot voudriez-vous publier ?</Text>



                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => { setShowCamera(!showCamera) }}>
                        <View style={styles.buttonOverlay}>
                            {capturedImage && <Image source={{ uri: capturedImage }} style={{ width: 200, height: 200, position: 'absolute' }} />}
                            <Ionicons name="camera" size={24} color="white" />
                            <Text style={styles.buttonText}>Caméra</Text>
                        </View>
                    </TouchableOpacity>

                    {/** Bouton pour mettre un spot textuel */}
                    <TouchableOpacity style={[styles.button, styles.textButton]} onPress={() => openSpotModal('text')}>
                        <Ionicons name="text" size={24} color="white" />
                        <Text style={styles.buttonText}>Texte</Text>
                    </TouchableOpacity>


                </View>




            </View>

            {/** Zone de médias */}
            <View style={styles.mediaZone}>
                {/* Texte de question */}
                <Text style={styles.questionText}>Une image récente en particulier pour votre spot ?</Text>
                {/* Grille de médias */}
                <View style={styles.mediaGridComponentStyle}>
                    <MediaGridComponent />
                </View>
            </View>


            {/** Composant pour paramétrer un spot textuel ou un spot image */}

            <SpotSetterComponent
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                spotType={selectedSpotType}
            />


            {/* Boutons de sélection de type */}
            <CameraComponent onCapture={handleCapture} enabled={showCamera} />

        </View>
    );
};

// Styles pour les différents éléments de l'interface

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.primary,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        color: colors.pureWhite,
    },
    selectionZone: {
        backgroundColor: colors.pureWhite,
        marginBottom: 16,
    },
    questionText: {
        fontSize: 16,
        textAlign: 'left',
        marginVertical: 16,
        marginHorizontal: 16,
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    button: {
        width: '45%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
    },
    cameraPreview: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonOverlay: {
        ...StyleSheet.absoluteFillObject, // Stylesheet.absoluteFillObject de React Native permet de centrer un composant dans un conteneur 
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        backgroundColor: colors.primary,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginTop: 8,
    },
    mediaGrid: {
        flex: 1,
    },
    mediaItem: {
        flex: 1 / 3,
        aspectRatio: 1,
        margin: 1,
    },
    mediaImage: {
        flex: 1,
    },

    mediaGridComponentStyle: {
        flex: 1,
        padding: 1,
        backgroundColor: colors.pureWhite,
    },

    mediaZone: {
        flex: 1,
        backgroundColor: colors.pureWhite,
        marginBottom: 5,
    },
});

export default SpotSelectorScreen;