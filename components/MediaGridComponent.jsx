import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import colors from './colors';
import SpotSetterComponent from './SpotSetterComponent';

const { width } = Dimensions.get('window');
const itemSize = 140;                 // Taille d'un élément de la grille de médias (pour avoir 3 colonnes)

const MediaGridComponent = () => {

    // State pour stocker les éléments de la grille de médias
    const [mediaItems, setMediaItems] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // État pour la fonctionnalité pull-to-refresh

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSpotType, setSelectedSpotType] = useState(null);

    const [selectedMedia, setSelectedMedia] = useState(null);

    const openSpotModal = (type, uri) => {
        setSelectedSpotType(type);
        setSelectedMedia(uri);
        setModalVisible(true);
    };


    // Fonction pour charger les éléments de la grille de médias: useEffect pour lancer la fonction une seule fois
    useEffect(() => {
        loadMediaItems();
    }, []);

    // Fonction pour charger les éléments de la grille de médias depuis la galerie
    const loadMediaItems = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();  // Demande la permission pour accéder à la galerie
        if (status !== 'granted') { // Si la permission n'est pas accéder à la galerie
            alert('Désolé, nous avons besoin des permissions pour accéder à votre galerie!');  // Affiche un message d'alerte
            return;                                                                      // Arrête l'exécution de la fonction
        }

        const media = await MediaLibrary.getAssetsAsync({ first: 200, mediaType: ['photo', 'video'], sortBy: ['creationTime'] });  // Obtient les éléments de la galerie
        setMediaItems(media.assets);                                                                            // Stocke les éléments dans le state;  "assets" pour utiliser les images et les vidéos
    };

    // Fonction pour gérer le refresh
    const onRefresh = async () => {
        setRefreshing(true);
        await loadMediaItems();
        setRefreshing(false);
    };
    // Rendu d'un élément de la grille de médias
    const renderMediaItem = ({ item }) => ( // item est un objet qui contient les informations de l'élément
        <TouchableOpacity style={styles.mediaItem} onPress={() => openSpotModal(item.mediaType, item.uri)}>
            <Image
                source={{ uri: item.uri }}
                style={styles.mediaImage}
                resizeMode="cover"
            />
            {item.mediaType === 'video' && (
                <View style={styles.videoIconContainer}>
                    <Ionicons name="play" size={20} color={colors.pureWhite} />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <>
            <FlatList
                data={mediaItems}
                renderItem={renderMediaItem}
                keyExtractor={(item) => item.id}
                refreshing={refreshing}
                onRefresh={onRefresh}
                numColumns={3}
                contentContainerStyle={styles.container}
            />
            <SpotSetterComponent
                onClose={() => setModalVisible(false)}
                spotType={selectedSpotType}
                spotMedia={selectedMedia}
                visible={modalVisible}
            />
        </>

    );
};

const styles = StyleSheet.create({
    container: {

        padding: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaItem: {
        width: itemSize,
        height: itemSize,
        padding: 1,
        margin: 4,
    },
    mediaImage: {
        flex: 1,
        zIndex: -10,
        borderRadius: 10,
    },
    videoIconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MediaGridComponent;