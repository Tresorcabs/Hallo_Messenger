import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../../components/colors';
import countryData from '../../components/data/country.json';
import { StatusBar } from 'expo-status-bar';
import { HelperText } from 'react-native-paper';
import { login } from '../../api/dataServices';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [dialCode, setDialCode] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [isHelperTextVisible, setIsHelperTextVisible] = useState(false);

    const handleLogin = async () => {
        // Réinitialiser les erreurs
        setErrors({});
        setApiError(null);

        // Validation locale des champs
        let newErrors = {};
        if (!phoneNumber) newErrors.phoneNumber = 'Le numéro de téléphone est requis';
        if (!username) newErrors.username = "Le nom d'utilisateur est requis";
        if (!password) newErrors.password = 'Le mot de passe est requis';

        // Si des erreurs sont présentes, on les affiche
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Fonction appel de la fonction dataService pour la Connexion
        const fullPhoneNumber = `${dialCode}${phoneNumber}`;
        const response = await login(username, password, fullPhoneNumber, navigation);
        setApiError(response);
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View className="flex-col items-center w-full h-full bg-primary">
                <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} className="flex-row items-center content-center w-full h-1/6" style={{ gap: 10, marginBottom: 5, marginTop: 5, paddingHorizontal: 10, }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10, }}>
                        <Icon name="arrow-left" size={20} color="white" onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-white">Connexion à mon compte</Text>
                </Animated.View>


                <StatusBar style='light' />

                {/** Login form */}
                <Animated.View entering={FadeInDown.delay(250).duration(5000).springify()} className="flex-col items-center content-center w-full pt-16 bg-white rounded-l-3xl h-5/6" style={{ borderTopLeftRadius: 70, borderTopRightRadius: 70, shadowColor: "#000" }}>

                    {/** Affichage des erreurs API */}
                    {apiError && (
                        <Animated.View entering={FadeInUp.delay(250).duration(2000).springify()} style={{ width: "80%", height: 30, borderColor: colors.redAlert, borderLeftWidth: 15, borderWidth: 1, borderRadius: 8, textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <HelperText type="error" visible={true} >
                                {apiError}
                            </HelperText>
                        </Animated.View>
                    )}

                    {/** Inputs View */}

                    <View className="flex-col w-full pb-14">
                        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="flex-row items-center justify-center w-full">
                            <View className={`absolute mr-5 left-11 rounded-tl-xl rounded-bl-xl border-r-primary-200 ${errors.dialCode ? "border-r-red-500" : "border-r-primary-200"}`} style={{ width: 138, borderRightWidth: 1, zIndex: 100 }}>
                                <RNPickerSelect
                                    placeholder={{ label: '+237', value: '+237', color: colors.behind_input }}
                                    onValueChange={(value) => setDialCode(value)}
                                    items={countryData.map((country) => ({
                                        label: `${country.flag}  ${country.dial_code}`,
                                        key: country.code,
                                        value: country.dial_code
                                    }))}
                                />
                            </View>
                            <TextInput
                                className={`w-4/5 p-3 m-5 pl-36 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                style={styles.input}
                                placeholder="Numéro de téléphone"
                                keyboardType='numeric'
                                onChangeText={(text) => setPhoneNumber(text)}
                                value={phoneNumber}
                            />
                        </Animated.View>
                        {errors.phoneNumber && <Text className="ml-12 text-red-500">{errors.phoneNumber}</Text>}

                        {/** Username input */}
                        <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} className="items-center content-center w-full ">
                            <TextInput
                                className={`w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.username ? 'border-red-500' : ''}`}
                                style={styles.input}
                                placeholder="Nom d'utilisateur"
                                onChangeText={(text) => setUsername(text)}
                                value={username}
                            />
                        </Animated.View>
                        {errors.username && <Text className="ml-12 text-red-500">{errors.username}</Text>}

                        <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()} className="flex-col items-center content-center justify-center w-full ">
                            <TextInput
                                className={`w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.password ? 'border-red-500' : ''}`}
                                style={styles.input}
                                placeholder="Mot de passe"
                                secureTextEntry={!showPassword}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                            />
                            <Icon
                                style={{ position: 'absolute', right: 60 }}
                                name={showPassword ? "eye-slash" : "eye"}
                                size={20}
                                color={colors.primary}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        </Animated.View>
                        {errors.password && <Text className="ml-12 text-red-500">{errors.password}</Text>}
                    </View>

                    <View className="flex items-center content-center justify-center w-full h-1/3">
                        <Animated.View entering={FadeInUp.delay(250).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                            <TouchableOpacity className="w-full p-3 m-5 bg-primary rounded-xl" onPress={handleLogin}>
                                <Text className="font-bold text-center text-white">Connexion          <Icon name="arrow-right" size={15} color="white" /></Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(450).duration(1000).springify()} className="flex-row gap-2 pt-5 pb-5">
                            <Text className="opacity-50 text-primary-200">--------------------------------------</Text>
                            <Text className="opacity-50 text-primary-200">Pas encore de compte ?</Text>
                            <Text className="opacity-50 text-primary-200">---------------------------------------</Text>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(650).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                            <TouchableOpacity className="w-full p-3 m-5 bg-secondary-btn-bg rounded-xl" onPress={() => navigation.navigate('SignUp1')}>
                                <Text className="font-bold text-center text-primary-bold">S'inscrire        <Icon name="arrow-right" size={15} color="#106C52" /></Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 15,
        borderWidth: 1
    }
});
