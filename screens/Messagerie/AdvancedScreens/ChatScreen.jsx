import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Dimensions, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../../components/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import placeholderImage from '../../../assets/placeholder_avatar.png';




// Données factices pour les messages
const messagesData = {
    '1': [
        { id: 'm1', text: 'hi !', isSent: false, timestamp: '10:30' },
        { id: 'm2', text: 'yeah ! massa', isSent: true, timestamp: '10:31' },
        { id: 'm3', text: 'Lorem ipsum, dolour sit amet consectetur adipisicing elit. Nulla corporis nemo in sint excepturi aut  !', isSent: false, timestamp: '10:30' },
        { id: 'm4', text: 'fugs quia et volupté total, a, commodi quo quae tenetur mollitia sunt suscipit quidem nostrum! ?', isSent: true, timestamp: '10:31' },
        { id: 'm5', text: 'je m\'amuse bien  !', isSent: false, timestamp: '10:30' },
        { id: 'm6', text: 'moi aussi', isSent: true, timestamp: '10:31' },
        { id: 'm7', text: 'Salut !', isSent: false, timestamp: '10:30' },
        { id: 'm8', text: 'Comment ça va ?', isSent: true, timestamp: '10:31' },
        { id: 'm9', text: 'Le programme avance bien !', isSent: true, timestamp: '10:31' },
        { id: 'm10', text: 'Salut !', isSent: false, timestamp: '10:30' },
        { id: 'm11', text: 'Salut !', isSent: false, timestamp: '10:30' },
        { id: 'm12', text: 'Comment ça va ?', isSent: true, timestamp: '10:31' },
        { id: 'm13', text: 'Le programme avance bien !', isSent: true, timestamp: '10:31' },
    ],
    "2": [
        { id: 'm1', text: 'hi !', isSent: false, timestamp: '10:30' },
        { id: 'm2', text: 'yeah ! massa', isSent: true, timestamp: '10:31' },
    ],
    "3": [
        { id: 'm1', text: 'hi !', isSent: false, timestamp: '10:30' },
        { id: 'm2', text: 'yeah ! massa', isSent: true, timestamp: '10:31' },
    ],
    "4": [
        { id: 'm1', text: 'hi !', isSent: false, timestamp: '10:30' },
        { id: 'm2', text: 'yeah ! massa', isSent: true, timestamp: '10:31' },
    ],

    // Ajouter d'autres conversations ici
};

// Option pour le menu
const menuOptions = [
    { text: 'Répondre', icon: 'arrow-undo-outline', onPress: () => console.log('Répondre') },
    { text: 'Transférer', icon: 'arrow-redo-outline', onPress: () => console.log('Transférer') },
    { text: 'Supprimer', icon: 'trash-outline', onPress: () => console.log('Supprimer') },
    { text: 'Modifier', icon: 'create-outline', onPress: () => console.log('Modifier') },
];


const { width } = Dimensions.get('window');

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
    const { discussionId, nom, profile, statut, phoneNumber } = route.params;





    // ----------------- Gestion du menu ----------------------- \\
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleLongPress = (message) => {
        setSelectedMessage(message);
        // position du message

        setMenuPosition({ top: 10, left: 10 });
        setIsMenuVisible(true);
    }

    const handleCloseMenu = () => {
        setIsMenuVisible(false);
    }

    // const handleMenuOptionPress = (option) => {
    //     handleCloseMenu();
    //     option.onPress();
    // }

    // ----------------- Gestion des messages ----------------------- \\ 
    const renderMessage = ({ item }) => (
        <TouchableOpacity ref={messageRef} style={[styles.messageContainer, item.isSent ? styles.sentMessage : styles.receivedMessage]} onLongPress={() => handleLongPress(messageRef.current)} >
            <Text style={item.isSent ? styles.messageSendText : styles.messageReceivedText}>{item.text}</Text>
            <Text style={item.isSent ? styles.timestampSendText : styles.timestampReceivedText}>{item.timestamp}</Text>
        </TouchableOpacity>

    );


    // ----------------- Gestion de la taille du clavier ----------------------- \\

    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);
    const [messages, setMessages] = useState(messagesData[discussionId] || []); // Initialiser avec les messages de la conversation ou un tableau vide si aucuns messages n'existent
    const messageRef = useRef(null);
    /**
   * @brief Effet pour gérer l'apparition et la disparition du clavier
   * 
   * Ajoute des écouteurs pour détecter l'ouverture et la fermeture du clavier,
   * et ajuste la hauteur du contenu en conséquence.
   */

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });
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
        if (inputText.trim()) { // la fonction trim() Vérifie que le TextInput de caractères n'est pas vide
            const newMessage = { // Créer un nouveau message
                id: `m${messages.length + 1}`, // id du nouveau message le 'm' permet d'avoir un identifiant unique à chaque nouveau message
                text: inputText,
                isSent: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Obtenir l'heure et la minute actuelle ; le paramètre '2-digit' permet d'avoir 2 chiffres au maximum
            };
            setMessages([...messages, newMessage]); // Ajouter le nouveau message à la liste des messages; ...messages permet d'ajouter le nouveau message à la liste existante via le spread (...) pour travailler sur une copie de la liste
            setInputText('');
            flatListRef.current?.scrollToEnd({ animated: true }); // Scroll vers le bas de l'écran ; le '?' permet de s'assurer que flatListRef.current existe avant de l'utiliser
        }
    };

    // ----------------- Affiche les messages de la discussion ----------------------- \\
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >

            <StatusBar style="light" />

            {/** Header du chat */}
            <View style={styles.header}>

                <View style={styles.headerContainer}>
                    {/** Bouton de retour */}
                    <TouchableOpacity style={styles.backButton}>
                        <Icon name="arrow-back" size={30} color={colors.pureWhite} onPress={() => navigation.goBack()} />
                    </TouchableOpacity>

                    {/** Profil image */}
                    <TouchableOpacity style={styles.profileImageContainer}>
                        {profile ?
                            <Image source={profile} style={styles.profileImage} />
                            : <Image source={placeholderImage} style={styles.profileImage} />
                        }
                        {/** Indicateur de  Statut du contact */}
                        <View style={[styles.statusIndicator, { backgroundColor: statut === "En ligne" ? colors.statutIndicator : "grey", }]} />
                    </TouchableOpacity>

                    <View style={styles.headerTextContainer}>
                        {/** Nom du contact */}
                        <Text style={styles.ContactName}>{nom === "" ? phoneNumber : nom}</Text>

                        {/** Statut du contact */}
                        <Text style={styles.ContactStatus}>{statut}</Text>
                    </View>

                    {/** Bouton de menu */}
                    <TouchableOpacity style={styles.menuButton}>
                        <Icon name="ellipsis-vertical" size={30} color={colors.pureWhite} />
                    </TouchableOpacity>
                </View>
            </View>


            {/** Liste des messages */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.messageList, { paddingBottom: keyboardHeight }]}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}

            />

            {/** Menu contextuel */}
            <Modal visible={isMenuVisible} animationType="slide" onRequestClose={handleCloseMenu} presentationStyle='overFullScreen' statusBarTranslucent={false}
                transparent={true}>
                <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseMenu}>
                    <View style={[styles.menuContainer, { top: 0, left: 0 }]}>
                        {/** Liste des options du menu */}
                        {menuOptions.map((option, index) => (
                            <TouchableOpacity key={index}
                                style={styles.menuItemOption}
                                onPress={() => { option.onPress; handleCloseMenu(); }}>
                                <Text style={styles.menuOptionText}>{option.text}</Text>
                                <Icon name={option.icon} size={20} color={colors.primary} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>


            {/** Zone de texte de saisie de message */}
            <View style={styles.inputContainer}>

                {/** Bouton d'envoi de fichier */}

                <TouchableOpacity style={styles.sendFilesButton}>
                    <Text style={styles.sendFilesButtonText}>
                        <Icon name='attach' size={35} color={colors.primary} />
                    </Text>
                </TouchableOpacity>

                {/** Zone d'entrée de message */}
                <TextInput multiline={true}
                    value={inputText}
                    onChangeText={setInputText}
                    style={styles.input} placeholder="Tapez un message..." />



                {/** Bouton d'envoi de message */}
                <TouchableOpacity style={styles.sendButton} onPress={() => { handleSendMessage(); }}>
                    <Text style={styles.sendButtonText}>
                        <Icon name="send" size={20} color={colors.pureWhite} />
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        display: 'flex',
        backgroundColor: colors.primary,
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
        elevation: 5,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,

        width: '100%',
    },
    profileImageContainer: {
        paddingLeft: 10,
        borderRadius: 50,
        justifyContent: 'center',
    },
    backButton: {
        paddingLeft: 5,

    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    statusIndicator: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 10,
        height: 10,
        borderColor: colors.statutIndicatorBorder,
        borderRadius: 50,
        borderWidth: 1.5,

    },
    headerTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 42,
        paddingLeft: 15,
    },
    ContactName: {
        color: colors.pureWhite,
        fontWeight: 'bold',
        fontSize: 18,
    },
    ContactStatus: {
        color: colors.pureWhite,
        fontSize: 12,
    },
    menuButton: {
        position: 'absolute',
        right: 0,
        padding: 10,
        justifyContent: 'center',
    },

    // style de la liste des messages
    messageList: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        padding: 10,
    },
    messageContainer: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        maxWidth: '50%',
        borderRadius: 20,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
        borderBottomRightRadius: 5,
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: colors.whiteGreen,
        borderBottomLeftRadius: 5,
    },
    messageSendText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.whiteGreen,
    },
    messageReceivedText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.smokeBlack,
    },
    timestampSendText: {
        fontSize: 10,
        fontWeight: '400',
        alignSelf: 'flex-end',
        color: colors.whiteGreen,
        marginTop: 5,
    },
    timestampReceivedText: {
        fontSize: 10,
        fontWeight: '400',
        alignSelf: 'flex-end',
        color: colors.smokeBlack,
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: .3,
        borderTopColor: colors.primary,
        backgroundColor: colors.secondary_btn_bg,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: colors.pureWhite,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 10,
        maxHeight: 100,
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
        position: 'absolute',
        left: 22,
        zIndex: 10,
        padding: 10,
        borderRadius: 50,
        justifyContent: 'center',
    },
    sendFilesButtonText: {
        fontWeight: 'bold',
    },

    /** Gestion du menu de message */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
    },
    menuContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 8,
        width: '50%',
        paddingHorizontal: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 10,
    },
    menuItemOption: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
    },
    menuOptionText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default ChatScreen;