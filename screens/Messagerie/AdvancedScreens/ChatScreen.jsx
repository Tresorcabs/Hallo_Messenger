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
    AppState,
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
import { getMessages } from "../../../api/dataServices"; // sendMessage est supprimé
import { useSocket } from "../../../Contexts/SocketContext"; // Import du hook useSocket
import moment from "moment";
import NetInfo from "@react-native-community/netinfo";
import placeholderGroup from '../../../assets/placeholder_group.jpg';

// ... (Le reste des données factices et des options de menu reste inchangé)

const FileTypeModal = ({ isVisible, onClose, onSelectFileType }) => {
    // ... (Le composant Modal reste inchangé)
};

const ChatScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        discussionId,
        nom,
        profile,
        logo,
        statut,
        phoneNumber,
        members,
        isCommunity,
        communityId,
    } = route.params;

    const socket = useSocket(); // Utilisation du socket depuis le contexte

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const flatListRef = useRef(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Effet pour charger les messages initiaux et écouter les nouveaux messages
    useEffect(() => {
        // 1. Charger les messages existants au montage de l'écran
        const loadInitialMessages = async () => {
            try {
                const initialMessages = await getMessages(discussionId);
                setMessages(initialMessages || []);
            } catch (error) {
                console.error("Erreur lors du chargement des messages initiaux:", error);
            }
        };

        loadInitialMessages();

        // 2. S'abonner aux nouveaux messages via le socket
        if (socket) {
            const handleNewMessage = (newMessage) => {
                // S'assurer que le message appartient à la discussion actuelle
                if (newMessage.canal_id === discussionId) {
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                }
            };

            socket.on('nouveau_message', handleNewMessage);
            console.log("Abonné à l'événement 'nouveau_message'");

            // 3. Fonction de nettoyage pour se désabonner
            return () => {
                socket.off('nouveau_message', handleNewMessage);
                console.log("Désabonné de l'événement 'nouveau_message'");
            };
        }
    }, [discussionId, socket]); // Dépendances : se ré-exécute si l'ID de discussion ou le socket change

    const handleSendMessage = () => {
        if (inputText.trim() && socket) {
            const messageData = {
                canal_id: discussionId,
                contenu: inputText,
                type_message: 'texte',
            };

            // Émettre le message via le socket
            socket.emit('envoyer_message', messageData, (ack) => {
                if (ack && ack.error) {
                    console.error("Erreur d'envoi du message (ack):", ack.error);
                    // On pourrait afficher une alerte ici
                } else {
                    console.log("Message envoyé avec succès via socket.");
                }
            });

            // Réinitialiser le champ de saisie
            setInputText("");
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    };

    const handleLongPress = (event, message) => {
        // ... (la logique du menu reste la même)
    };

    const renderMessage = ({ item }) => {
        // ... (la logique de rendu de message reste la même, s'assurer que les clés correspondent)
        // Note: la logique `isSent` est remplacée par la comparaison des IDs expéditeur/utilisateur
        const isSentByMe = item.expediteur_id === item.utilisateur_actuel_id; // Supposant que l'API renvoie ces deux IDs

        return (
            <TouchableOpacity
                style={[
                    styles.messageContainer,
                    isSentByMe ? styles.sentMessage : styles.receivedMessage,
                ]}
                onLongPress={(event) => handleLongPress(event, item)}
                delayLongPress={500}
            >
                <Text style={isSentByMe ? styles.messageSendText : styles.messageReceivedText}>
                    {item.contenu}
                </Text>
                <Text style={isSentByMe ? styles.timestampSendText : styles.timestampReceivedText}>
                    {moment(item.date_envoi).format("HH:mm")}
                </Text>
            </TouchableOpacity>
        );
    };

    // ... (Le reste du JSX et des styles reste majoritairement inchangé)
    // Je vais juste m'assurer que le JSX principal est ici
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <StatusBar style="light" />
                <View style={styles.container} onPress={Keyboard.dismiss}>
                    {/* Header du chat (inchangé) */}
                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity style={styles.backButton}>
                                <Icon name="arrow-back" size={30} color={colors.pureWhite} onPress={() => navigation.goBack()} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileImageContainer}>
                                {profile ? (
                                    <Image source={{ uri: profile }} style={styles.profileImage} />
                                ) : (
                                    <Image source={placeholderImage} style={styles.profileImage} />
                                )}
                            </TouchableOpacity>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.ContactName}>{nom}</Text>
                                <Text style={styles.ContactStatus}>{statut}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Liste des messages */}
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        contentContainerStyle={styles.messageList}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    />

                    {/* Zone de texte de saisie de message (inchangée) */}
                    <View style={[styles.inputContainer, { backgroundColor: colors.secondary_btn_bg, }]}>
                        <TextInput
                            multiline={true}
                            value={inputText}
                            onChangeText={setInputText}
                            style={styles.input}
                            placeholder="Tapez un message..."
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                            <Text style={styles.sendButtonText}>
                                <Icon name="send" size={20} color={colors.pureWhite} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};

// ... (Les styles restent les mêmes)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pureWhite,
    },
    header: {
        backgroundColor: colors.primary,
        height: 110,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    backButton: {
        paddingLeft: 5,
    },
    profileImageContainer: {
        marginLeft: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerTextContainer: {
        marginLeft: 15,
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
    messageList: {
        flexGrow: 1,
        padding: 10,
    },
    messageContainer: {
        padding: 10,
        borderRadius: 20,
        marginVertical: 8,
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
        color: colors.pureWhite,
    },
    messageReceivedText: {
        fontSize: 16,
        color: colors.smokeBlack,
    },
    timestampSendText: {
        fontSize: 10,
        alignSelf: "flex-end",
        color: colors.pureWhite,
        marginTop: 5,
    },
    timestampReceivedText: {
        fontSize: 10,
        alignSelf: "flex-end",
        color: colors.smokeBlack,
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
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
        marginHorizontal: 10,
    },
    sendButton: {
        padding: 12,
        borderRadius: 20,
        backgroundColor: colors.primary_200,
    },
    sendButtonText: {
        color: colors.pureWhite,
    },
});

export default ChatScreen;
