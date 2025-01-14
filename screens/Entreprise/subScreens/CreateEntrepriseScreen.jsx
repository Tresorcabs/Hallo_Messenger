import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { TextInput, Button, RadioButton, Text, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../components/colors';
import workImage from '../../../assets/Work.png';
import { createEnterprise } from '../../../EntrepriseApi/EntrepriseDataService';

const CreateEntrepriseScreen = () => {
    const [visible, setVisible] = useState(false); // State to manage the dialog visibility
    const [choice, setChoice] = useState('create'); // Default to 'create' option
    const [companyName, setCompanyName] = useState('');
    const [companyIndustry, setCompanyIndustry] = useState('');
    const [companyEmployees, setCompanyEmployees] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        // Show the dialog when the component is mounted
        setVisible(true);
    }, []);

    const handleConfirmChoice = () => {
        if (choice === 'create') {
            // Close the dialog and proceed with company creation
            setVisible(false);
        } else {
            // Redirect to the waiting page for company invitations
            setVisible(false);
            navigation.navigate('WaitingForInvitation');
        }
    };

    const handleCreateCompany = async () => {
        // Function to handle company creation API call
        if (companyName.trim() !== '' && companyIndustry.trim() !== '') {
            // Call API to create the company here
            try {
                const response = await createEnterprise({ nom: companyName, secteur_activite: companyIndustry });
                console.log("réponse du serveur pour la création d'entreprise : ", response)
                Alert.alert('Entreprise créée avec succès', 'Votre entreprise a été enregistrée. \n', [
                    { text: 'OK', onPress: () => navigation.navigate('Entreprise') },
                ]);
            } catch (error) {
                Alert.alert('Error', 'Échec de la création de l\'entreprise ');
                console.log('Error', 'Échec de la création de l\'entreprise : ', error)
            }

        } else {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Dialog for choosing between creating or joining a company */}
            <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}
                    style={{ backgroundColor: colors.pureWhite }}>
                    <Dialog.Title>Que souhaitez-vous faire ?</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={value => setChoice(value)} value={choice}>
                            <RadioButton.Item label="Créer une entreprise" value="create" color={colors.primary} />
                            <RadioButton.Item label="Rejoindre une entreprise" value="join" color={colors.primary} />
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode="contained" onPress={handleConfirmChoice}
                            theme={{ colors: { primary: colors.primary } }}>
                            Confirmer
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            {/* Form to create a company if 'create' is selected */}
            {choice === 'create' && !visible && (
                <View style={styles.formContainer}>

                    <Image source={workImage} style={styles.image} />

                    <Text style={styles.header}>Créer une entreprise</Text>

                    <TextInput
                        label="Nom de l'entreprise"
                        theme={{ colors: { primary: colors.primary, background: colors.pureWhite } }}
                        activeOutlineColor={colors.primary}
                        outlineColor={colors.primary}
                        value={companyName}
                        onChangeText={text => setCompanyName(text)}
                        mode="outlined"
                        style={styles.input}
                    />

                    <TextInput
                        label="Secteur d'activité"
                        theme={{ colors: { primary: colors.primary, background: colors.pureWhite } }}
                        activeOutlineColor={colors.primary}
                        outlineColor={colors.primary}
                        value={companyIndustry}
                        onChangeText={text => setCompanyIndustry(text)}
                        mode="outlined"
                        style={styles.input}
                    />

                    {/* <TextInput
                        label="Nombre d'employés"
                        theme={{ colors: { primary: colors.primary, background: colors.pureWhite } }}
                        activeOutlineColor={colors.primary}
                        outlineColor={colors.primary}
                        value={companyEmployees}
                        onChangeText={text => setCompanyEmployees(text)}
                        keyboardType="numeric"
                        mode="outlined"
                        style={styles.input}
                    /> */}

                    <Button mode="contained"
                        onPress={handleCreateCompany}
                        style={styles.createButton}
                        theme={{ colors: { primary: colors.primary } }}>
                        Créer l'entreprise
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    formContainer: {
        marginTop: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#148760',
    },
    input: {
        marginBottom: 15,
    },
    createButton: {
        marginTop: 20,
        paddingVertical: 10,
    },
    image: {
        alignSelf: "center",
        width: 280,
        height: 280,
    },
});

export default CreateEntrepriseScreen