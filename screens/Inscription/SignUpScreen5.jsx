import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import Animated, {
    FadeInDown,
    FadeInUp,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../components/colors";
import { SignUpContext } from '../../Contexts/SignUpContext';
import axios from "axios";
import { inscription } from '../../api/dataServices';

export default function SignUpScreen5() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);

    const validateForm = () => {
        let newErrors = {};
        if (!username) newErrors.username = "Le nom d'utilisateur est requis";
        if (!password) newErrors.password = "Le mot de passe est requis";
        if (password !== confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // On enregistre les données d'inscription partielles dans le contexte

    const { updateSignUpData, signUpData } = useContext(SignUpContext);


    const handleSubmit = () => {
        if (validateForm()) {
            const step5Data = {
                nom_utilisateur: username,
                mot_de_passe: password,
            }
            updateSignUpData(step5Data);
            console.log(signUpData);
            // Route pour l'inscription
            inscription(signUpData, navigation);
        }

    };



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-col items-center w-full h-full bg-primary">
                <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} className="flex-row items-center content-center w-full h-1/6" style={{ gap: 10, marginBottom: 5, marginTop: 5, paddingHorizontal: 10, }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10, }}>
                        <Icon
                            name="arrow-left"
                            size={20}
                            color="white"
                            onPress={() => navigation.goBack()}
                        />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-white ">
                        Inscription ( Etape 5 / 5)
                    </Text>
                </Animated.View>


                {/** Affichage des erreurs API */}
                {apiError && (
                    <Animated.View entering={FadeInUp.delay(250).duration(2000).springify()} style={{ width: "80%", height: 30, borderColor: colors.redAlert, borderLeftWidth: 15, borderWidth: 1, borderRadius: 8, textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <HelperText type="error" visible={true} >
                            {apiError}
                        </HelperText>
                    </Animated.View>
                )}

                <Animated.View
                    entering={FadeInDown.delay(250).duration(1000).springify()}
                    className="flex-col items-center content-center justify-between w-full pt-16 pb-16 bg-white rounded-l-3xl h-5/6"
                    style={{
                        borderTopLeftRadius: 70,
                        borderTopRightRadius: 70,
                        shadowColor: "#000",
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: "95%" }}>
                        <View className="flex-col items-center content-center w-full">
                            <Animated.View
                                entering={FadeInUp.delay(400).duration(1000).springify()}
                                className="items-center content-center w-full "
                            >
                                <TextInput
                                    className={`w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.username ? 'border-red-500' : ''}`}
                                    style={{ borderWidth: 1 }}
                                    placeholder="Nom d'utilisateur ( Ex: john_doe )"
                                    value={username}
                                    onChangeText={setUsername}
                                />
                                {errors.username && <Text className="text-red-500">{errors.username}</Text>}
                            </Animated.View>

                            <Animated.View
                                entering={FadeInUp.delay(600).duration(1000).springify()}
                                className="flex-col items-center content-center justify-center w-full "
                            >
                                <View className="relative w-4/5">
                                    <TextInput
                                        className={`w-full p-3 m-5 text-sm border-primary-200 rounded-xl placeholder:text-behind-input ${errors.password ? 'border-red-500' : ''}`}
                                        style={{ borderWidth: 1 }}
                                        placeholder="Mot de passe"
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity
                                        style={{ position: "absolute", right: 30, top: 25 }}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Icon
                                            name={showPassword ? "eye-slash" : "eye"}
                                            size={20}
                                            color={colors.primary}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && <Text className="text-red-500">{errors.password}</Text>}
                            </Animated.View>

                            <Animated.View
                                entering={FadeInUp.delay(800).duration(1000).springify()}
                                className="flex-col items-center content-center justify-center w-full "
                            >
                                <TextInput
                                    className={`w-4/5 p-3 m-5 text-sm border-primary-200 rounded-xl placeholder:text-behind-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                    style={{ borderWidth: 1 }}
                                    placeholder="Confirmez le mot de passe"
                                    secureTextEntry={!showPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                {errors.confirmPassword && <Text className="text-red-500">{errors.confirmPassword}</Text>}
                            </Animated.View>
                        </View>
                    </ScrollView>

                    <View className="flex items-center content-center justify-center w-full h-1/3">
                        <Animated.View
                            entering={FadeInUp.delay(1000).duration(1000).springify()}
                            className="items-center justify-center w-full pl-8 pr-8 "
                        >
                            <TouchableOpacity
                                className="w-full p-3 m-5 bg-primary rounded-xl"
                                onPress={handleSubmit}
                            >
                                <Text className="font-bold text-center text-white">
                                    Continuer <Icon name="arrow-right" size={15} color="white" />
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}