import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from './colors';
import profil1 from '../assets/profil1.jpg';
import { useNavigation } from '@react-navigation/native';
import { useSpotContext } from '../Contexts/spotProvider';

const { width } = Dimensions.get('window');

const SpotSetterComponent = ({ visible, onClose, spotType, spotMedia, senderName, SenderProfile }) => {

    const navigation = useNavigation();

    const [text, setText] = useState('');
    const [textColor, setTextColor] = useState('#FFFFFF');
    const TextInputBgColors = ["#95D2B3", "#B5CFB7", "#987D9A", "#B1AFFF", '#86AB89', "#9CAFAA", "#B784B7", "#9BB0C1", "#EFBC9B"];

    const [bgColor, setBgColor] = React.useState("#B784B7");

    const [spotImageDescription, setSpotImageDescription] = useState('');

    // Changement du backgroundColor par un random dans la liste des textInputBgColors
    const changeBackgroundColor = () => {

        setBgColor(TextInputBgColors[Math.floor(Math.random() * TextInputBgColors.length)]);
    }

    // fonction pour enregistrer la description
    const onDescriptionInputChangeText = (text) => {
        setSpotImageDescription(text);
    }

    // On récupère la fonction addSpot du contexte
    const { addSpot } = useSpotContext();

    // calc ID 
    let id = 0;

    // Fonction pour la sauvegarde pour le spot de type text
    const handleSaveSpotText = () => {
        addSpot({
            id: id + 1,
            type: 'text',
            text: text,
            bgColor: bgColor,
            textColor: textColor,
            createdAt: new Date().toISOString(),
            duration: 2000, // en ms
            senderName: senderName,
            SenderProfile: SenderProfile
        });
        navigation.goBack();
    };

    // Fonction pour la sauvegarde pour le spot de type photo
    const handleSaveSpotPhoto = () => {
        addSpot({
            type: 'photo',
            photo: spotMedia,
            spotImageDescription: spotImageDescription,
            createdAt: new Date().toISOString(),
            duration: 5000, // en ms
            senderName: senderName,
            SenderProfile: SenderProfile
        });
        navigation.goBack();
    };

    return (

        spotType === "text" ?

            (<Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <StatusBar style="light" backgroundColor={bgColor} />
                <View style={styles.centeredView}>
                    <TextInput placeholder="Veuillez saisir le texte..."
                        onChangeText={(text) => setText(text)}
                        placeholderTextColor={textColor}
                        style={[styles.modalView,
                        { backgroundColor: bgColor }]}
                        multiline={true} />

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Icon name="close-outline" size={25} color={colors.pureWhite} />
                    </TouchableOpacity>

                    {/** Actions View */}
                    <View style={styles.actionView} >
                        {/** Send view */}
                        <View style={styles.sendView}>

                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={handleSaveSpotText}
                            >
                                <Icon name="send" size={25} color={colors.pureWhite} />
                            </TouchableOpacity>
                        </View>


                        {/** Bouton de modification de background du TextInput  */}
                        <View style={styles.changeBgView}>

                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={changeBackgroundColor}
                            >
                                <Icon name="color-palette" size={25} color={colors.pureWhite} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>)

            :
            spotType === "photo" ?

                /** Pour le spot de type image */
                (<Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={onClose}
                >
                    <StatusBar style="light" backgroundColor={colors.smokeBlack} />
                    <View style={styles.centeredView}>
                        <Image source={{ uri: spotMedia }} style={styles.spotPhoto} resizeMode='contain' />


                        {/** Bouton de fermeture */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Icon name="close-outline" size={25} color={colors.pureWhite} />
                        </TouchableOpacity>

                        {/** Actions View */}
                        <View style={styles.addCommentActionView} >
                            {/** Send view */}
                            <View style={styles.sendView}>

                                <TouchableOpacity
                                    style={styles.sendCommentButton}
                                    onPress={handleSaveSpotPhoto}
                                >
                                    <Icon name="send" size={25} color={colors.pureWhite} />
                                </TouchableOpacity>
                            </View>



                        </View>

                        {/** TextInput d'ajout d'un commentaire au spot de type image  */}
                        <View style={styles.addCommentView}>

                            <TextInput
                                style={styles.addCommentTextInput}
                                placeholder='Ajoutez un commentaire...'
                                placeholderTextColor={colors.pureWhite}
                                onChangeText={onDescriptionInputChangeText}
                                multiline={true}
                            />
                        </View>

                    </View>
                </Modal>)

                :

                /** Pour le spot de type video */
                (<Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={onClose}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Configurer le spot {spotType}</Text>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={onClose}
                            >
                                <Text style={styles.textStyle}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>)
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.smokeBlack,
    },
    modalView: {
        width: width,
        flex: 1,
        placeholderColor: colors.pureWhite,
        color: colors.pureWhite,
        fontWeight: "500",
        textAlign: "center",
        fontSize: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: colors.glassBlackBtn,
        borderRadius: 20,
        padding: 10,
        elevation: 2

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    actionView: {
        backgroundColor: colors.glassBlackBtn,
        height: 100,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    sendView: {
        position: "absolute",
        bottom: 15,
        right: 20,
    },
    sendButton: {
        backgroundColor: colors.glassBlackBtn,
        borderRadius: 100,
        padding: 15,
        elevation: 2
    },
    changeBgView: {
        position: "absolute",
        bottom: 15,
        left: 20,
    },


    spotPhoto: {
        position: 'static',
        width: width,
        flex: 1,
    },
    addCommentView: {
        position: "absolute",
        bottom: 15,
        left: 20,
    },
    addCommentTextInput: {
        backgroundColor: colors.glassBlackBtn,
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 25,
        color: colors.pureWhite,
        width: 350,
        maxHeight: 70,
        elevation: 2
    },
    sendCommentButton: {
        backgroundColor: colors.primary,
        borderRadius: 100,
        padding: 15,
        elevation: 2
    },
    addCommentActionView: {
        backgroundColor: colors.smokeBlack,
        height: 80,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
});

export default SpotSetterComponent;