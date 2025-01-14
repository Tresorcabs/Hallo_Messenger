import React, { useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { SignUpContext } from '../../Contexts/SignUpContext';

export default function OTPScreen() {
    const navigation = useNavigation();
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef([]);
    const [error, setError] = useState('');

    const handleChange = (text, index) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text !== '') {
            if (index < 3) {
                inputs.current[index + 1].focus();
            }
        }

        if (text === '' && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleKeyPress = ({ nativeEvent: { key: keyValue } }, index) => {
        if (keyValue === 'Backspace' && otp[index] === '' && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const validateOTP = () => {
        return otp.every(digit => digit !== '');
    };

{/*}
    const handleVerify = async () => {
        if (validateOTP()) {
            try {
                const response = await axios.post('YOUR_API_ENDPOINT/verify-otp', {
                    otp: otp.join('')
                });
                if (response.data.success) {
                    navigation.navigate('ProfileScreen');
                } else {
                    setError('Code OTP invalide');
                }
            } catch (error) {
                console.error('Error verifying OTP:', error);
                setError('Une erreur est survenue lors de la vérification');
            }
        } else {
            setError('Veuillez entrer un code OTP complet');
        }
    };

    const handleResendOTP = async () => {
        try {
            await axios.post('YOUR_API_ENDPOINT/resend-otp');
            // Afficher un message de succès à l'utilisateur
        } catch (error) {
            console.error('Error resending OTP:', error);
            // Afficher un message d'erreur à l'utilisateur
        }
    }; */}



        // On enregistre les données d'inscription partielles dans le contexte

    const { updateSignUpData, signUpData } = useContext(SignUpContext);

    const handleSaveOTP = () => {
        if (validateOTP()) {
            const step3Data = {
                OTPCode: otp,
            }
            updateSignUpData(step3Data);
            navigation.navigate("ProfileScreen");
        }
        else{
            setError('Code OTP Requis pour continuer');
        }
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-col items-center w-full h-full bg-primary">
                <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} className="flex-row items-center content-center w-full h-1/6" style={{ gap: 10, marginBottom: 5, marginTop: 5, paddingHorizontal: 10, }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10, }}>
                        <Icon name="arrow-left" size={20} color="white" onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-white " >Inscription ( Etape 3 / 5)</Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(250).duration(5000).springify()} className="flex-col items-center content-center justify-between w-full pt-16 pb-16 bg-white rounded-l-3xl h-5/6" style={{ borderTopLeftRadius: 70, borderTopRightRadius: 70, shadowColor: "#000" }}>
                    <View className="flex-col items-center content-center w-full">
                        <Animated.View entering={FadeInUp.delay(300).duration(1000).springify()} className="w-4/5 m-5 placeholder:text-behind-input" >
                            <Animated.Text entering={FadeInUp.delay(300).duration(1000).springify()} style={{ fontSize: 16, letterSpacing: 0.5 }} className=" text-primary-200"> Entrer le code de vérification OTP envoyé par message </Animated.Text>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} className="flex-row items-center content-center justify-center w-full ">
                            {otp.map((value, index) => (
                                <TextInput
                                    ref={ref => inputs.current[index] = ref}
                                    value={value}
                                    key={index}
                                    onChangeText={text => handleChange(text, index)}
                                    onKeyPress={e => handleKeyPress(e, index)}
                                    className={`p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input text-primary ${error ? 'border-red-500' : ''}`}
                                    style={[styles.input]}
                                    maxLength={1}
                                    keyboardType='number-pad'
                                />
                            ))}
                        </Animated.View>

                        {error && <Text className="mt-2 text-red-500">{error}</Text>}

                        <Animated.View entering={FadeInUp.delay(300).duration(1000).springify()} className="flex flex-row items-center justify-end w-4/5 m-5 font-bold">
                            <Text className="text-primary-200" entering={FadeInUp.delay(300).duration(1000).springify()} style={{ fontSize: 16 }}> Code non reçu ? </Text>
                            <TouchableOpacity><Text className="text-primary-bold" style={{ fontSize: 16 }}>  Renvoyer</Text></TouchableOpacity>
                        </Animated.View>
                    </View>

                    <View className="flex items-center content-center justify-center w-full h-1/3">
                        <Animated.View entering={FadeInUp.delay(250).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                            <TouchableOpacity className="w-4/5 p-3 m-5 bg-primary rounded-xl" onPress={handleSaveOTP} >
                                <Text className="font-bold text-center text-white">Vérifier <Icon name="arrow-right" size={15} color="white" /> </Text>
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
        width: 60,
        textAlign: 'center',
        borderWidth: 1,
        fontSize: 20
    }
});