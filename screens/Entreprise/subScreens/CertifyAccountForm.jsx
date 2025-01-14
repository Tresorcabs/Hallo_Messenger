import React, { useState } from 'react';
import { View, Text, Linking, StyleSheet, Alert } from 'react-native';
import { TextInput, Checkbox, Button } from 'react-native-paper';
import { certifyAccount } from '../../../api/dataServices';
import colors from '../../../components/colors';
import { useNavigation } from '@react-navigation/native';

const CertifyAccountForm = () => {

    const navigation = useNavigation();

    const [inputValue, setInputValue] = useState('');
    const [conditionsAccepted, setConditionsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    const handleCertify = async () => {
        if (conditionsAccepted && privacyAccepted) {

            // Effectuer la certification (API call)
            try {
                // Appel API pour certifier le compte
                const response = await certifyAccount(); // Fonction que vous avez définie pour appeler l'API

                // Si la certification est réussie, afficher l'alerte
                if (response.message == "Compte certifié") {
                    Alert.alert(
                        'Certification réussie',
                        'Votre compte a bien été certifié !',
                        [
                            {
                                text: 'Continuer',
                                onPress: () => navigation.navigate('CreateEnterpriseScreen'), // Redirection vers la page de création d'entreprise
                            },
                        ]
                    );
                }
            } catch (error) {
                console.log('Erreur lors de la certification du compte :', error);
                Alert.alert('Erreur', 'Une erreur est survenue lors de la certification du compte.');
            }

        } else {
            alert('Veuillez accepter les conditions et la politique de confidentialité.');
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Certifier mon compte</Text>
            </View>

            <TextInput
                label="Votre adresse de domicile (Ville, nom rue ou quartier)"
                theme={{ colors: { primary: colors.primary, background: colors.pureWhite } }}
                activeOutlineColor={colors.primary}
                outlineColor={colors.primary}
                value={inputValue}
                onChangeText={text => setInputValue(text)}
                mode="outlined"
                style={styles.input}
                textColor={colors.primary}

            />

            {/* Checkbox pour accepter les conditions d'utilisation */}
            <View style={styles.checkboxContainer}>
                <Checkbox
                    color={colors.primary}
                    uncheckedColor={colors.primary}
                    status={conditionsAccepted ? 'checked' : 'unchecked'}
                    onPress={() => setConditionsAccepted(!conditionsAccepted)}
                />
                <Text style={styles.checkboxLabel}>
                    Je comprends et J'accepte les {' '}
                    <Text
                        style={styles.link}
                        onPress={() => Linking.openURL('https://example.com/terms')}
                    >
                        conditions d'utilisation
                    </Text>.
                </Text>
            </View>

            {/* Checkbox pour accepter la politique de confidentialité (RGPD) */}
            <View style={styles.checkboxContainer}>
                <Checkbox
                    color={colors.primary}
                    uncheckedColor={colors.primary}
                    status={privacyAccepted ? 'checked' : 'unchecked'}
                    onPress={() => setPrivacyAccepted(!privacyAccepted)}
                />
                <Text style={styles.checkboxLabel}>
                    J'accepte la{' '}
                    <Text
                        style={styles.link}
                        onPress={() => Linking.openURL('https://example.com/privacy')}
                    >
                        politique de confidentialité
                    </Text>.
                </Text>
            </View>

            {/* Bouton certifier */}
            <Button
                mode="contained"
                theme={{ colors: { primary: colors.primary } }}
                onPress={handleCertify}
                style={styles.button}
                disabled={!conditionsAccepted || !privacyAccepted}
            >
                Certifier
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: colors.pureWhite,
    },
    header: {
        marginVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        width: "100%",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "800",
        color: colors.primary,
    },
    input: {
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        flexShrink: 1,
        color: colors.primary,
    },
    link: {
        color: colors.primary_bold,
        fontWeight: 'bold',
        fontSize: 14,
    },
    button: {
        marginTop: 40,
    },
});

export default CertifyAccountForm;