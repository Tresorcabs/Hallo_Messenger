import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet, Alert, Modal, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../../components/colors';
import countryData from '../../components/data/country.json';
import { StatusBar } from 'expo-status-bar';
import { login } from '../../api/dataServices';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [dialCode, setDialCode] = useState('+237'); // Default au Cameroun
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false); // État pour le chargement

    const handleLogin = async () => {
        // Validation locale des champs
        if (!phoneNumber || !username || !password) {
            Alert.alert("Champs incomplets", "Veuillez remplir tous les champs pour vous connecter.");
            return;
        }

        setIsLoading(true); // Activer le chargement
        try {
            const fullPhoneNumber = `${dialCode}${phoneNumber}`;
            const error = await login(username, password, fullPhoneNumber, navigation);

            if (error) {
                Alert.alert("Erreur de connexion", error);
            }
            // Si la connexion réussit, la navigation est déjà gérée dans la fonction `login`
        } catch (e) {
            // Erreur inattendue
            console.error(e);
            Alert.alert("Erreur inattendue", "Une erreur s'est produite. Veuillez réessayer.");
        } finally {
            setIsLoading(false); // Désactiver le chargement
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Modal de chargement */}
                <Modal
                    transparent={true}
                    animationType="none"
                    visible={isLoading}
                    onRequestClose={() => {}}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator animating={isLoading} size="large" color={colors.primary} />
                            <Text style={styles.loadingText}>Connexion en cours...</Text>
                        </View>
                    </View>
                </Modal>

                <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10 }}>
                        <Icon name="arrow-left" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Connexion à mon compte</Text>
                </Animated.View>

                <StatusBar style='light' />

                <Animated.View entering={FadeInDown.delay(250).duration(5000).springify()} style={styles.formContainer}>
                    <View style={styles.inputsView}>
                        {/* Phone Number Input */}
                        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} style={styles.inputContainer}>
                            <View style={styles.pickerContainer}>
                                <RNPickerSelect
                                    placeholder={{}}
                                    value={dialCode}
                                    onValueChange={(value) => setDialCode(value)}
                                    items={countryData.map((country) => ({
                                        label: `${country.flag}  ${country.dial_code}`,
                                        key: country.code,
                                        value: country.dial_code
                                    }))}
                                    style={{ inputIOS: styles.pickerInput, inputAndroid: styles.pickerInput }}
                                />
                            </View>
                            <TextInput
                                style={[styles.input, { paddingLeft: 110 }]}
                                placeholder="Numéro de téléphone"
                                keyboardType='numeric'
                                onChangeText={setPhoneNumber}
                                value={phoneNumber}
                                editable={!isLoading}
                            />
                        </Animated.View>

                        {/* Username Input */}
                        <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nom d'utilisateur"
                                onChangeText={setUsername}
                                value={username}
                                editable={!isLoading}
                            />
                        </Animated.View>

                        {/* Password Input */}
                        <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()} style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Mot de passe"
                                secureTextEntry={!showPassword}
                                onChangeText={setPassword}
                                value={password}
                                editable={!isLoading}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color={colors.primary} />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                    <View style={styles.buttonSection}>
                        <Animated.View entering={FadeInUp.delay(250).duration(1000).springify()} style={styles.fullWidth}>
                            <TouchableOpacity style={[styles.button, styles.primaryButton, isLoading && styles.disabledButton]} onPress={handleLogin} disabled={isLoading}>
                                <Text style={styles.primaryButtonText}>Connexion <Icon name="arrow-right" size={15} color="white" /></Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(450).duration(1000).springify()} style={styles.dividerContainer}>
                            <Text style={styles.dividerText}>---------------- Pas encore de compte ? ----------------</Text>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(650).duration(1000).springify()} style={styles.fullWidth}>
                            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('SignUp1')}>
                                <Text style={styles.secondaryButtonText}>S'inscrire <Icon name="arrow-right" size={15} color="#106C52" /></Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}

// J'ai remplacé les classes Tailwind par des styles StyleSheet pour plus de clarté et de performance
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.primary },
    header: { flexDirection: 'row', alignItems: 'center', height: '16.66%', paddingHorizontal: 10, gap: 10 },
    headerText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    formContainer: { flex: 1, backgroundColor: 'white', borderTopLeftRadius: 70, borderTopRightRadius: 70, alignItems: 'center', paddingTop: 40 },
    inputsView: { width: '100%', alignItems: 'center', paddingBottom: 20 },
    inputContainer: { width: '80%', marginVertical: 10 },
    input: { borderWidth: 1, borderColor: colors.primary_200, borderRadius: 12, padding: 12, fontSize: 15 },
    pickerContainer: { position: 'absolute', left: 10, top: 13, zIndex: 1, borderRightWidth: 1, borderRightColor: colors.primary_200, paddingRight: 10 },
    pickerInput: { color: colors.primary_bold, width: 80 },
    eyeIcon: { position: 'absolute', right: 15, top: 15 },
    buttonSection: { width: '100%', alignItems: 'center', paddingHorizontal: 32 },
    fullWidth: { width: '100%' },
    button: { width: '100%', padding: 15, borderRadius: 12, marginVertical: 10, alignItems: 'center' },
    primaryButton: { backgroundColor: colors.primary },
    primaryButtonText: { color: 'white', fontWeight: 'bold' },
    secondaryButton: { backgroundColor: colors.secondary_btn_bg },
    secondaryButtonText: { color: colors.primary_bold, fontWeight: 'bold' },
    disabledButton: { opacity: 0.5 },
    dividerContainer: { paddingVertical: 20 },
    dividerText: { color: colors.primary_200, opacity: 0.5 },
    modalBackground: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    activityIndicatorWrapper: { backgroundColor: '#FFFFFF', height: 120, width: 200, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    loadingText: { marginTop: 10, color: colors.primary }
});
