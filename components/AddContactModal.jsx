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

const AddContactModal = ({ visible, onClose, onAdd }) => {
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleAddContact = async () => {
        if (!givenName || !familyName || !phoneNumber) {
            Alert.alert('Erreur', 'Tous les champs sont requis.');
            return;
        }

        try {
            await Contacts.addContactAsync({
                [Contacts.Fields.FirstName]: givenName,
                [Contacts.Fields.LastName]: familyName,
                [Contacts.Fields.PhoneNumbers]: [{ number: phoneNumber }],
            });
            Alert.alert('Succès', 'Contact ajouté avec succès.');
            onAdd();
            clearForm();
            onClose();
        } catch (error) {
            Alert.alert('Erreur', 'Impossible d\'ajouter le contact.');
            console.error(error);
        }
    };

    const clearForm = () => {
        setGivenName('');
        setFamilyName('');
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
                    <Text style={styles.title}>Ajouter un Contact</Text>
                    <TextInput
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
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Numéro de téléphone"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
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
        marginBottom: 15,
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
});

export default AddContactModal;
