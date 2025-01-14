import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity
} from 'react-native';
import * as Contacts from 'expo-contacts';
import colors from './colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addContact } from '../api/dataServices';

const AddContactModal = ({ visible, onClose, onAdd }) => {
    // const [givenName, setGivenName] = useState('');
    // const [familyName, setFamilyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleAddContact = async () => {
        if (!phoneNumber) {
            Alert.alert('Erreur', 'Tous les champs sont requis.');
            return;
        }

        const response = await addContact(phoneNumber);
        console.log(response);
    };

    const clearForm = () => {
        // setGivenName('');
        // setFamilyName('');
        setPhoneNumber('');
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
            onDismiss={onClose}

        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Ajouter un Contact à la liste</Text>
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        value={givenName}
                        onChangeText={setGivenName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        value={familyName}
                        onChangeText={setFamilyName}
                    /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Numéro de téléphone"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.noteText} >
                        NB : Le contact dois être inscrit !
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.revokeButton} onPress={onClose} >
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmButton} onPress={handleAddContact} >
                            <Text style={styles.buttonText}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderBottomWidth: 0.7,
        borderBottomColor: colors.primary_bold,
        marginBottom: 25,
        padding: 8,
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    revokeButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    confirmButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.pureWhite,
        fontSize: 16,
        fontWeight: 'bold',
    },
    noteText: {
        marginBottom: 20
    }
});

export default AddContactModal;
