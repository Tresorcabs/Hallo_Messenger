import React from 'react';
import { View, Dimensions, FlatList, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import colors from '../../../components/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';


// Données factices pour les messages
const messagesData = {
    '1': [
        { id: 'm1', text: 'Salut !', isSent: false, timestamp: '10:30' },
        { id: 'm2', text: 'Comment ça va ?', isSent: true, timestamp: '10:31' },
    ],
    '2': [
        { id: 'm1', text: 'On se voit demain ?', isSent: false, timestamp: '09:15' },
        { id: 'm2', text: 'Oui, à quelle heure ?', isSent: true, timestamp: '09:16' },
    ],
    // Ajoutez d'autres conversations ici
};


const { width } = Dimensions.get('window');

const ChatScreen = () => {

    const route = useRoute();
    const { discussionId, nom, profile } = route.params;

    const renderMessage = ({ item }) => (
        <View style={[styles.messageContainer, item.isSent ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={item.isSent ? styles.messageSendText : styles.messageReceivedText}>{item.text}</Text>
            <Text style={item.isSent ? styles.timestampSendText : styles.timestampReceivedText}>{item.timestamp}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            {/** Header du chat */}
            <View style={styles.header}>

                <Text style={styles.headerText}>{nom}</Text>
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
                        <Icon name="send" size={20} color="#fff" />
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
    header: {
        display: 'flex',
        backgroundColor: colors.primary,
        height: 130,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 15,
        color: '#000',
    },
    messageList: {
        flex: 1,
        flexDirection: 'column-reverse',
        padding: 10,
    },
    messageContainer: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
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
        backgroundColor: colors.secondary_btn_bg
    },
    input: {
        flex: 1,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingLeft: 55,
        paddingVertical: 10,
        backgroundColor: colors.secondary_200
    },
    sendButton: {
        backgroundColor: colors.primary_200,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        justifyContent: 'center',
    },
    sendButtonText: {
        color: '#fff',
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
});

export default ChatScreen;