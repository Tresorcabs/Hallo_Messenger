import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';  // Importer expo-contacts
import { Contact } from './Contact';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            // Demander la permission d'accéder aux contacts
            const { status } = await Contacts.requestPermissionsAsync();

            if (status === 'granted') {
                // Obtenir tous les contacts
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data);  // Mettre à jour l'état avec les contacts récupérés
                }
            } else {
                console.log('Permission contacts refusée');
            }
        };

        fetchContacts();  // Appeler la fonction de récupération des contacts
    }, []);

    const keyExtractor = (item, index) => {
        return item?.id?.toString() || index.toString();
    };

    const renderItem = ({ item }) => {
        return <Contact contact={item} />;
    };


    return (
        <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.contactList}
            windowSize={10}
        />
    );
}

const styles = StyleSheet.create({
    contactList: {
        flex: 1,
    },
});
