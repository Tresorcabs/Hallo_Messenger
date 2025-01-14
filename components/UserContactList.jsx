import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity, View } from 'react-native';
import * as Contacts from 'expo-contacts';  // Importer expo-contacts
import { Contact } from './Contact';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDiscussion } from '../api/dataServices';

export default function UserContactList({ userContactData, discussionsData, onPress }) {

    const navigation = useNavigation();

    const contactData = Array.isArray(userContactData) ? userContactData : [userContactData]; // ici, on vérifie si userContactData est un tableau sinon on le transforme en tableau
    const [discussionId, setDiscussionId] = useState(null);
    const [correspondantId, setCorrespondantId] = useState(null);
    const [nom, setNom] = useState(null);
    const [prenom, setPrenom] = useState(null);
    const [photo_de_profil, setPhoto_de_profil] = useState(null);
    const [statut, setStatut] = useState(null);

    const creer_discussion = async (contactId, nom, prenom, photo_de_profil, statut) => {

        // on ferme le modal 
        onPress();

        // On vérifie si l'id de l'utilisateur est dans le tableau des discussions si oui, on ouvre la discussion, sinon on creer une nouvelle
        if (contactId in discussionsData) {
            //console.log("contact id", contactId);
            setDiscussionId(contactId);
            navigation.navigate("ChatScreen", {
                discussionId: contactId,
                nom: nom,
                //phoneNumber: item.contactPhone,
                profile: photo_de_profil,
                statut: statut,
            })
        }
        else {

            const response = await createDiscussion(contactId, nom, statut, photo_de_profil, prenom, navigation);
            console.log("response", response);
            setDiscussionId(response);
        }
    }
    //console.log("Contact Data:", contactData); // Ajoutez ce log pour vérifier les données

    const renderUserContactDataItem = ({ item }) => {
        //console.log("Rendering item:", item);
        return (
            <TouchableOpacity style={styles.container}
                onPress={() => creer_discussion(item.id, item.nom, item.prenom, item.photo_de_profil, item.statut)}>
                <View style={styles.profil}>
                    <Image source={{ uri: item.photo_de_profil }} style={styles.profilImage} />
                </View>
                <View style={styles.infos}>
                    <View style={styles.name}>
                        <Text style={styles.nameText}>{item.nom} {item.prenom}</Text>
                    </View>
                    <View style={styles.phone}>
                        <Text style={styles.phoneText}>Faire un coucou 👋</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };


    return (
        <>
            {contactData.length > 0 ? (
                <FlatList
                    data={contactData}
                    renderItem={renderUserContactDataItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.contactList}
                    windowSize={10}
                />
            ) : (
                <Text style={styles.noContactsText}>Aucun contact trouvé</Text>
            )}
        </>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
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
    noContactsText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});
