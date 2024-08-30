import React, { memo } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import placeholderImage from "../assets/placeholder_avatar.png"; // Image de profil par défaut
import * as SMS from 'expo-sms';

// Composant Contact
export const Contact = memo(({ contact }) => {
    const firstName = contact.firstName || '';
    const lastName = contact.lastName || '';
    const phoneNumber = contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : 'N/A'; // N/A par défaut

    const handleContactPress = (contact) => {
        // demande de confirmation de l'envoi de la demande
        Alert.alert(
            'Envoyer une invitation',
            `Oupps !  Ce contact n'est pas inscrit sur Flow  >_<\n\nVoulez-vous envoyer une invitation pour le contact :  ${firstName} ${lastName} ?`,
            [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Envoyer', onPress: () => sendSMSInvitation(contact.phoneNumbers[0].number) },
            ],
            { cancelable: false }
        );
    };

    const sendSMSInvitation = async (phoneNumber) => {
        const { result } = await SMS.sendSMSAsync([phoneNumber], 'Rejoignez-moi sur cette application incroyable !\nFlow est une application de messagerie instantanée.\nCliquez ici pour rejoindre : https://flowapp.netlify.app/');
        if (result === 'sent') {
            console.log('SMS envoyé avec succès.');
        } else {
            console.log('Echec de l\'envoi du SMS.');
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => handleContactPress(contact)}>
            <View style={styles.profil}>
                <Image source={placeholderImage} style={styles.profilImage} />
            </View>
            <View style={styles.infos}>
                <View style={styles.name}>
                    <Text style={styles.nameText}>{firstName} {lastName}</Text>
                </View>
                <View style={styles.phone}>
                    <Text style={styles.phoneText}>Faire un coucou 👋</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 10,
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 0.7,
    },
    profil: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    profilImage: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
    },
    infos: {
        flex: 1,
    },
    name: {
        marginTop: 5,
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    phone: {
        marginTop: 5,
    },
    phoneText: {
        fontSize: 12,
    },
});
