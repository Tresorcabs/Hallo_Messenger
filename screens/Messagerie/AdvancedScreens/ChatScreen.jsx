import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Image,
    Dimensions,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../../components/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import placeholderImage from "../../../assets/placeholder_avatar.png";
import MenuActionBar from "../../../components/MenuActionBar";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import postedImage from "../../../assets/post.png";

// Données factices pour les messages
const messagesData = {
    1: [
        { id: "m1", text: "hi !", isSent: false, timestamp: "10:30" },
        { id: "m2", text: "yeah ! massa", isSent: true, timestamp: "10:31" },
        {
            id: "m3",
            text: "Lorem ipsum, dolour sit amet consectetur adipisicing elit. Nulla corporis nemo in sint excepturi aut  !",
            isSent: false,
            timestamp: "10:30",
        },
        {
            id: "m4",
            text: "fugs quia et volupté total, a, commodi quo quae tenetur mollitia sunt suscipit quidem nostrum! ?",
            isSent: true,
            timestamp: "10:31",
        },
        { id: "m5", text: "je m'amuse bien  !", isSent: false, timestamp: "10:30" },
        { id: "m6", text: "moi aussi", isSent: true, timestamp: "10:31" },
        { id: "m7", text: "Salut !", isSent: false, timestamp: "10:30" },
        { id: "m8", text: "Comment ça va ?", isSent: true, timestamp: "10:31" },
        {
            id: "m9",
            text: "Le programme avance bien !",
            image: postedImage,
            isSent: true,
            timestamp: "10:31",
        },
        { id: "m10", text: "Salut !", isSent: false, timestamp: "10:30" },
        { id: "m11", text: "Salut !", isSent: false, timestamp: "10:30" },
        { id: "m12", text: "Comment ça va ?", isSent: true, timestamp: "10:31" },
        {
            id: "m13",
            text: "Le programme avance bien !",
            isSent: true,
            timestamp: "10:31",
        },
    ],
    2: [
        { id: "m1", text: "hi !", isSent: false, timestamp: "10:30" },
        { id: "m2", text: "yeah ! massa", isSent: true, timestamp: "10:31" },
    ],
    3: [
        { id: "m1", text: "hi !", isSent: false, timestamp: "10:30" },
        { id: "m2", text: "yeah ! massa", isSent: true, timestamp: "10:31" },
    ],
    4: [
        { id: "m1", text: "hi !", isSent: false, timestamp: "10:30" },
        { id: "m2", text: "yeah ! massa", isSent: true, timestamp: "10:31" },
    ],

    // Ajouter d'autres conversations ici
};

const communitiesPublications = {
    // images with description, videos and description, text and more
    1: [
        {
            idPub: "pub1",
            isSent: false,
            image: postedImage,
            description: "Our new Design is here",
            text: "",
            likes: 10,
            comments: 5,
            timestamp: "8:00",
        },
        {
            idPub: "pub2",
            isSent: false,
            image: "",
            description: "",
            postedText: "Tomorrow we will launch our new design",
            likes: 10,
            comments: 5,
            timestamp: "8:00",
        },
    ],
    2: [
        {
            idPub: "pub3",
            isSent: false,
            image: postedImage,
            description: "Our new Design is here",
            text: "",
            likes: 10,
            comments: 5,
            timestamp: "8:00",
        },
        {
            idPub: "pub4",
            isSent: false,
            image: "",
            description: "",
            text: "Tomorrow we will launch our new design",
            likes: 10,
            comments: 5,
            timestamp: "8:00",
        },
    ],
};

// Option pour le menu
const menuOptions = [
    {
        text: "Répondre",
        icon: "arrow-undo",
        onPress: () => console.log("Répondre"),
    },
    {
        text: "Transférer",
        icon: "arrow-redo",
        onPress: () => console.log("Transférer"),
    },
    { text: "Supprimer", icon: "trash", onPress: () => console.log("Supprimer") },
    { text: "Modifier", icon: "create", onPress: () => console.log("Modifier") },
];



// --------------------- Modal de selection du type de fichier ----------------------------------- \\

const FileTypeModal = ({ isVisible, onClose, onSelectFileType }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay} >
                    <View style={styles.modalContent}>
                        {/** Close btn */}
                        <TouchableOpacity style={{ position: 'absolute', right: 5, padding: 10, borderRadius: 5, zIndex: 10 }}>
                            <Icon
                                name="close"
                                size={24}
                                color={colors.pureWhite}
                                onPress={onClose}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.fileTypeOption}
                            onPress={() => onSelectFileType('image')}
                        >
                            <Icon name="image" size={24} color={colors.pureWhite} />
                            <Text style={styles.fileTypeText}>Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.fileTypeOption}
                            onPress={() => onSelectFileType('document')}
                        >
                            <Icon name="document" size={24} color={colors.pureWhite} />
                            <Text style={styles.fileTypeText}>Document</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.fileTypeOption}
                            onPress={() => onSelectFileType('video')}
                        >
                            <Icon name="videocam" size={24} color={colors.pureWhite} />
                            <Text style={styles.fileTypeText}>Vidéo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const { width } = Dimensions.get("window");

// --------------------- Début de la fonction ----------------------------------- \\

/**
 * @brief Fonction qui affiche l'écran de chat
 * 
 * Ce composant gère l'affichage et la logique de l'écran de chat,
 * y compris la liste des messages, la saisie de nouveaux messages,
 * et l'adaptation à l'ouverture du clavier.
 * 
 * @returns Le composant ChatScreen
/**
 *
 *
 * @return {*} 
 */
const ChatScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        discussionId,
        nom,
        profile,
        statut,
        phoneNumber,
        members,
        isCommunity,
        communityId,
        fileUri,
        fileType,
        comment
    } = route.params;

    // ----------------- Gestion du menu ----------------------- \\
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleLongPress = (event, message) => {
        const { pageY } = event.nativeEvent;
        // position du menu
        if (!message.isSent) {
            setMenuPosition({ top: pageY - 80, left: 10 });
        } else {
            setMenuPosition({ top: pageY - 80, right: 10 });
        }
        setSelectedMessage(message);
        // mettre un backgroundColor sur le message sélectionné à travers le paramètre messageContainer
        // à venir
        setIsMenuVisible(true);
    };

    const handleCloseMenu = () => {
        setIsMenuVisible(false);
    };

    // const handleMenuOptionPress = (option) => {
    //     handleCloseMenu();
    //     option.onPress();
    // }

    // ----------------- Gestion des messages ----------------------- \\
    const renderMessage = ({ item }) =>
        item.image ? (
            <TouchableOpacity
                ref={messageRef}
                style={[
                    styles.messageContainer,
                    { width: 400, flexDirection: "column", gap: 10, padding: 3, borderRadius: 10, },
                    item.isSent ? styles.sentMessage : styles.receivedMessage,
                ]}
                onLongPress={(event) => handleLongPress(event, item)}
                delayLongPress={500}
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("FullScreenImage", { image: item.image })
                    }
                >
                    <Image
                        source={item.image}
                        style={styles.postedImage}
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                <Text
                    style={
                        item.isSent ? [styles.messageSendText, { paddingLeft: 5 }] : styles.messageReceivedText
                    }
                >
                    {item.text}
                </Text>
                <Text
                    style={
                        [item.isSent
                            ? styles.timestampSendText
                            : styles.timestampReceivedText,
                        { paddingRight: 5 }]
                    }
                >
                    {item.timestamp}
                </Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
                ref={messageRef}
                style={[
                    styles.messageContainer,
                    { padding: 10, borderRadius: 20, },
                    item.isSent ? styles.sentMessage : styles.receivedMessage,
                ]}
                onLongPress={(event) => handleLongPress(event, item)}
                delayLongPress={500}
            >
                <Text
                    style={
                        item.isSent ? styles.messageSendText : styles.messageReceivedText
                    }
                >
                    {item.text}
                </Text>
                <Text
                    style={
                        item.isSent
                            ? styles.timestampSendText
                            : styles.timestampReceivedText
                    }
                >
                    {item.timestamp}
                </Text>
            </TouchableOpacity>
        );


    // ----------------- Gestion de la taille du clavier ----------------------- \\

    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [inputText, setInputText] = useState("");
    const flatListRef = useRef(null);
    const [messages, setMessages] = useState(messagesData[discussionId] || communitiesPublications[communityId] || []); // Initialiser avec les messages de la conversation ou un tableau vide si aucuns messages n'existent
    const messageRef = useRef(null);
    /**
     * @brief Effet pour gérer l'apparition et la disparition du clavier
     *
     * Ajoute des écouteurs pour détecter l'ouverture et la fermeture du clavier,
     * et ajuste la hauteur du contenu en conséquence.
     */

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardHeight(0);
            }
        );
        return () => {
            /**
             * @brief Supprime les écouteurs pour éviter des fuites de mémoire
             *
             * Lorsqu'on quitte l'écran, on supprime les écouteurs pour éviter des fuites de mémoire.
             * Sans cette étape, les écouteurs restent actifs même lorsque l'écran n'est plus visible,
             * ce qui peut entraîner des problèmes de performance.
             */
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    /**
     * Gère la logique d'envoi d'un message.
     *
     * Aucune valeur de retour, met à jour l'état inputText.
     */
    const handleSendMessage = () => {
        // Logique d'envoi de message à implémenter 
        if (inputText.trim()) {
            // la fonction trim() Vérifie que le TextInput de caractères n'est pas vide
            const newMessage = {
                // Créer un nouveau message
                id: `m${messages.length + 1}`, // id du nouveau message le 'm' permet d'avoir un identifiant unique à chaque nouveau message
                text: inputText,
                isSent: true,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }), // Obtenir l'heure et la minute actuelle ; le paramètre '2-digit' permet d'avoir 2 chiffres au maximum
            };
            setMessages([...messages, newMessage]); // Ajouter le nouveau message à la liste des messages; ...messages permet d'ajouter le nouveau message à la liste existante via le spread (...) pour travailler sur une copie de la liste
            setInputText("");
            flatListRef.current?.scrollToEnd({ animated: true }); // Scroll vers le bas de l'écran ; le '?' permet de s'assurer que flatListRef.current existe avant de l'utiliser
        }
    };



    // --------------------- Fonction pour la selection de fichier ----------------------------------- \\

    const [isFileTypeModalVisible, setFileTypeModalVisible] = useState(false);

    const handleSendFiles = () => {
        setFileTypeModalVisible(true);
    };

    const handleSelectFileType = async (fileType) => {
        setFileTypeModalVisible(false);

        let result;

        try {
            switch (fileType) {
                case "image":
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        quality: 1,
                    });
                    break;
                case "document":
                    result = await DocumentPicker.getDocumentAsync({
                        type: 'application/pdf'
                    });
                    break;
                case "video":
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                        allowsEditing: true,
                        aspect: [16, 9],
                        quality: 1,
                    });
                    break;
                default:
                    console.log('Type de fichier non pris en charge');
                    return;
            };

            if (!result.canceled) {
                navigation.navigate('FilePreview', {
                    fileUri: result.uri,
                    fileType: fileType
                });
            }
        } catch (error) {
            console.error('Erreur lors de la sélection du fichier:', error);
        }
    };

    // ----------------- Affiche les messages de la discussion ----------------------- \\
    return (
        <GestureHandlerRootView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <StatusBar style="light" />
                <View
                    style={styles.container}
                    onPress={() => {
                        Keyboard.dismiss();
                        handleCloseMenu();
                    }}
                >
                    {/** Header du chat */}
                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            {/** Bouton de retour */}
                            <TouchableOpacity style={styles.backButton}>
                                <Icon
                                    name="arrow-back"
                                    size={30}
                                    color={colors.pureWhite}
                                    onPress={() => navigation.goBack()}
                                />
                            </TouchableOpacity>

                            {/** Profil image */}
                            <TouchableOpacity style={styles.profileImageContainer}>
                                {profile ? (
                                    <Image source={profile} style={styles.profileImage} />
                                ) : (
                                    <Image source={placeholderImage} style={styles.profileImage} />
                                )}
                                {/** Indicateur de  Statut du contact ou de la Communauté*/}
                                {isCommunity ? (
                                    // Icône de certification de communauté
                                    <View
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            width: 15,
                                            height: 15,
                                            borderRadius: 50,
                                            backgroundColor: colors.primary,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <MaterialIcons
                                            name="verified"
                                            size={15}
                                            color={colors.statutIndicator}
                                            style={styles.verifiedIndicator}
                                        />
                                    </View>
                                ) : (
                                    <View
                                        style={[
                                            styles.statusIndicator,
                                            {
                                                backgroundColor:
                                                    statut === "En ligne" ? colors.statutIndicator : "grey",
                                            },
                                        ]}
                                    />
                                )}
                            </TouchableOpacity>

                            <View style={styles.headerTextContainer}>
                                {/** Nom du contact */}
                                <Text style={styles.ContactName}>
                                    {nom === "" ? phoneNumber : nom}
                                </Text>

                                {/** Statut du contact */}
                                <Text style={styles.ContactStatus}>
                                    {members
                                        ? `${members} membre${members > 1 ? "s" : ""}`
                                        : statut}
                                </Text>
                            </View>

                            {/** Bouton de menu */}
                            <TouchableOpacity style={styles.menuButton}>
                                <Icon
                                    name="ellipsis-vertical"
                                    size={30}
                                    color={colors.pureWhite}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/** Liste des messages */}
                    {isCommunity ? (
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            renderItem={renderMessage}
                            keyExtractor={(item) => item.idPub}
                            contentContainerStyle={[
                                styles.messageList,
                                { paddingBottom: keyboardHeight },
                            ]}
                            showsVerticalScrollIndicator={false}
                            onContentSizeChange={() =>
                                flatListRef.current?.scrollToEnd({ animated: true })
                            }
                        />
                    ) : (
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            renderItem={renderMessage}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={[
                                styles.messageList,
                                { paddingBottom: keyboardHeight },
                            ]}
                            showsVerticalScrollIndicator={false}
                            onContentSizeChange={() =>
                                flatListRef.current?.scrollToEnd({ animated: true })
                            }
                        />
                    )}

                    {/** Menu contextuel */}
                    <MenuActionBar
                        isVisible={isMenuVisible}
                        position={menuPosition}
                        onClose={() => setIsMenuVisible(false)}
                        options={menuOptions}
                    />

                    {/** Modal  de selection de fichier */}
                    <FileTypeModal
                        isVisible={isFileTypeModalVisible}
                        onClose={() => setFileTypeModalVisible(false)}
                        onSelectFileType={handleSelectFileType}
                    />

                    {/** Zone de texte de saisie de message */}
                    {isCommunity ? (
                        /** Zone avec un message pour dire qu'il n'a pas le droit d'envoyer des messages */

                        <View style={[styles.inputContainer, { backgroundColor: colors.primary, }]}>
                            <Text style={styles.noMessagesText}>
                                Vous n'avez pas le droit d'envoyer des messages.
                            </Text>
                        </View>
                    ) : (
                        <View style={[styles.inputContainer, { backgroundColor: colors.secondary_btn_bg, }]}>
                            {/** Bouton d'envoi de fichier */}

                            <TouchableOpacity style={styles.sendFilesButton} onPress={handleSendFiles}>
                                <Text style={styles.sendFilesButtonText}>
                                    <Icon name="attach" size={35} color={colors.primary} />
                                </Text>
                            </TouchableOpacity>

                            {/** Zone d'entrée de message */}
                            <TextInput
                                multiline={true}
                                value={inputText}
                                onChangeText={setInputText}
                                style={styles.input}
                                placeholder="Tapez un message..."
                            />

                            {/** Bouton d'envoi de message */}
                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={() => {
                                    handleSendMessage();
                                }}
                            >
                                <Text style={styles.sendButtonText}>
                                    <Icon name="send" size={20} color={colors.pureWhite} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};

/**
 * @brief Styles pour le composant ChatScreen
 *
 * Définit les styles pour tous les éléments de l'interface utilisateur
 * du chat, y compris l'en-tête, la liste des messages et la zone de saisie.
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pureWhite,
    },
    // Header styles

    header: {
        display: "flex",
        backgroundColor: colors.primary,
        height: 110,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 20,
        elevation: 5,
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 50,

        width: "100%",
    },
    profileImageContainer: {
        marginLeft: 10,
        borderRadius: 50,
        justifyContent: "center",
        backgroundColor: "red",
    },
    backButton: {
        paddingLeft: 5,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    statusIndicator: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 10,
        height: 10,
        borderColor: colors.statutIndicatorBorder,
        borderRadius: 50,
        borderWidth: 1.5,
    },
    verifiedIndicator: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    headerTextContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 42,
        paddingLeft: 15,
    },
    ContactName: {
        color: colors.pureWhite,
        fontWeight: "bold",
        fontSize: 18,
    },
    ContactStatus: {
        color: colors.pureWhite,
        fontSize: 12,
    },
    menuButton: {
        position: "absolute",
        right: 0,
        padding: 10,
        justifyContent: "center",
    },

    // style de la liste des messages
    messageList: {
        flexGrow: 1,
        justifyContent: "flex-end",
        padding: 10,
    },
    messageContainer: {
        marginVertical: 8,
        marginHorizontal: 8,
        maxWidth: "80%",
    },
    sentMessage: {
        alignSelf: "flex-end",
        backgroundColor: colors.primary,
        borderBottomRightRadius: 5,
    },
    receivedMessage: {
        alignSelf: "flex-start",
        backgroundColor: colors.whiteGreen,
        borderBottomLeftRadius: 5,
    },
    messageSendText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.whiteGreen,
    },
    postedImage: {
        width: "100%",
        height: 200,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    messageReceivedText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.smokeBlack,
    },
    timestampSendText: {
        fontSize: 10,
        fontWeight: "400",
        alignSelf: "flex-end",
        color: colors.whiteGreen,
        marginTop: 5,
    },
    timestampReceivedText: {
        fontSize: 10,
        fontWeight: "400",
        alignSelf: "flex-end",
        color: colors.smokeBlack,
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderTopWidth: 0.3,
        borderTopColor: colors.primary,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: colors.pureWhite,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 10,
        maxHeight: 150,
        paddingLeft: 55,
        backgroundColor: colors.secondary_200,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 5,
        marginRight: 10,
        padding: 12,
        borderRadius: 20,
        backgroundColor: colors.primary_200,
    },
    sendButtonText: {
        fontSize: 20,
        color: colors.pureWhite,
    },
    sendFilesButton: {
        position: "absolute",
        left: 22,
        zIndex: 10,
        padding: 10,
        borderRadius: 50,
        justifyContent: "center",
    },
    sendFilesButtonText: {
        fontWeight: "bold",
    },

    /** Gestion du menu de message */
    modalOverlay: {
        flex: 1,
        backgroundColor: "red",
    },
    menuContainer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        borderRadius: 8,
        width: "50%",
        paddingHorizontal: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 10,
    },
    menuItemOption: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
    },
    menuOptionText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "bold",
    },
    noMessagesText: {
        color: colors.pureWhite,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },


    modalOverlay: {
        height: "100%",
        justifyContent: "flex-end",
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        backgroundColor: colors.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingVertical: 30,
    },
    fileTypeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: .5,
        borderBottomColor: colors.pureWhite,
    },
    fileTypeText: {
        marginLeft: 15,
        fontSize: 16,
        color: colors.pureWhite,
    },
});

export default ChatScreen;
