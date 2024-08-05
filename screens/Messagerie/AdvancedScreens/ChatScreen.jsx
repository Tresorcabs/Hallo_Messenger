import React, { useState } from 'react';
import { View, Image, Dimensions, FlatList, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
    ],
    '2': [
        { id: 'm1', text: 'On se voit demain ?', isSent: false, timestamp: '09:15' },
        { id: 'm2', text: 'Oui, à quelle heure ?', isSent: true, timestamp: '09:16' },
    ],

    // Ajoutez d'autres conversations ici
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
const ChatScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { discussionId, nom, profile, statut, phoneNumber } = route.params;

    const renderMessage = ({ item }) => (
        <TouchableOpacity style={[styles.messageContainer, item.isSent ? styles.sentMessage : styles.receivedMessage]} >
            <Text style={item.isSent ? styles.messageSendText : styles.messageReceivedText}>{item.text}</Text>
            <Text style={item.isSent ? styles.timestampSendText : styles.timestampReceivedText}>{item.timestamp}</Text>
        </TouchableOpacity>
    );


    // ----------------- Gestion du menu ----------------------- \\
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [selectedMessage, setSelectedMessage] = useState(null);

    // ----------------- Affiche les messages de la discussion ----------------------- \\
    return (
        <View style={styles.container}>
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
                data={messagesData[discussionId]}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                style={styles.messageList}
            />

            <View style={styles.inputContainer}>

                {/** Bouton d'envoi de fichier */}

                <TouchableOpacity style={styles.sendFilesButton}>
                    <Text style={styles.sendFilesButtonText}>
                        <Icon name='attach' size={30} color={colors.primary} />
                    </Text>
                </TouchableOpacity>

                {/** Zone d'entrée de message */}
                <TextInput multiline={true} style={styles.input} placeholder="Tapez un message..." />

                {/** Bouton d'envoi de message */}
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>
                        <Icon name="send" size={20} color={colors.pureWhite} />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 15,
        color: colors.pureBlack,
    },
    messageList: {
        flexDirection: 'column-reverse',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        bottom: 8,
        zIndex: -10,
    },
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 8,
        maxWidth: '80%',
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 5,
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: colors.whiteGreen,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 20,
    },
    messageSendText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: colors.whiteGreen,
    },
    messageReceivedText: {
        fontWeight: '600',
        marginBottom: 10,
        fontSize: 16,
        color: colors.smokeBlack,
    },
    timestampSendText: {
        fontSize: 10,
        fontWeight: '400',
        alignSelf: 'flex-end',
        color: colors.whiteGreen,
    },
    timestampReceivedText: {
        fontSize: 10,
        fontWeight: '400',
        alignSelf: 'flex-end',
        color: colors.smokeBlack,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: colors.secondary_btn_bg,
        elevation: 5,
        maxHeight: 120,
    },
    input: {
        flex: 1,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingLeft: 55,
        paddingVertical: 10,
        backgroundColor: colors.secondary_200,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: colors.primary_200,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        justifyContent: 'center',
    },
    sendButtonText: {
        color: colors.pureWhite,
        fontWeight: 'bold',
    },
    sendFilesButton: {
        position: 'absolute',
        left: 15,
        zIndex: 10,
        padding: 10,
        borderRadius: 50,
        justifyContent: 'center',
    },
    sendFilesButtonText: {
        fontWeight: 'bold',
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
});

export default ChatScreen;