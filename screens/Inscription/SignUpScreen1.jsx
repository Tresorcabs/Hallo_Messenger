import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { SignUpContext } from '../../Contexts/SignUpContext';


export default function SignUpScreen1() {
    const [birthDate, setBirthDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('__ __ / __ __ / __ __ __ __');
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [gender, setGender] = useState(null);
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});

    const navigation = useNavigation();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        setShow(Platform.OS === 'ios');
        setBirthDate(currentDate);
        setFormattedDate(currentDate.toLocaleDateString());
    };

    const genders = [
        { label: 'Homme', value: 'homme' },
        { label: 'Femme', value: 'femme' },
        { label: 'Autre', value: 'autre' },
    ];

    const validateFields = () => {
        let newErrors = {};
        if (!name.trim()) newErrors.name = "Le nom est requis";
        if (!secondName.trim()) newErrors.secondName = "Le prénom est requis";
        if (formattedDate === '__ __ / __ __ / __ __ __ __') newErrors.date = "La date de naissance est requise";
        if (!gender) newErrors.gender = "Le genre est requis";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // On enregistre les données d'inscription partielles dans le contexte

    const { updateSignUpData, signUpData } = useContext(SignUpContext);

    const handleContinue = () => {
        if (validateFields()) {
            const step1Data = {
                nom: name,
                prenom: secondName,
                date_naissance: birthDate,
                genre: gender,
                pays: null,
                numero_de_telephone: null,
                OTPCode: null,
                nom_utilisateur: null,
                mot_de_passe: null,
                photo_de_profil: null,
                memo: null,
                est_certifie: false,

            }
            updateSignUpData(step1Data);
            navigation.navigate("SignUp2");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-col items-center w-full h-full bg-primary">
                {/* Header */}
                <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} className="flex-row items-center content-center w-full h-1/6" style={{ gap: 10, marginBottom: 5, marginTop: 5, paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10 }}>
                        <Icon name="arrow-left" size={20} color="white" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-white">Inscription ( Étape 1 / 5)</Text>
                </Animated.View>

                {/* Form */}
                <Animated.View entering={FadeInDown.delay(250).duration(1000).springify()} className="flex-col items-center content-center justify-between w-full pt-16 pb-16 bg-white rounded-l-3xl h-5/6" style={{ borderTopLeftRadius: 70, borderTopRightRadius: 70, shadowColor: "#000" }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex-col items-center content-center w-full">
                            {/* Name and surname Input */}
                            <View className="flex-row w-4/5 m-5">
                                <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="w-1/2">
                                    <TextInput
                                        className={`p-3 mb-2 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.name ? 'border-red-500' : ''}`}
                                        style={{ borderWidth: 1, width: "95%" }}
                                        placeholder="Nom"
                                        value={name}
                                        onChangeText={(text) => setName(text)}
                                    />
                                    {errors.name && <Text className="text-xs text-red-500">{errors.name}</Text>}
                                </Animated.View>
                                <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="w-1/2">
                                    <TextInput
                                        className={`p-3 mb-2 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.secondName ? 'border-red-500' : ''}`}
                                        style={{ borderWidth: 1, width: "98%" }}
                                        placeholder="Prénom"
                                        value={secondName}
                                        onChangeText={(text) => setSecondName(text)}
                                    />
                                    {errors.secondName && <Text className="text-xs text-red-500">{errors.secondName}</Text>}
                                </Animated.View>
                            </View>

                            {/* Birth selector */}
                            <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} className="flex-col items-center content-center justify-center w-full mb-4 ">
                                <TextInput
                                    className={`w-4/5 p-3 m-2 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.date ? 'border-red-500' : ''}`}
                                    style={{ borderWidth: 1 }}
                                    value={formattedDate}
                                    editable={false}
                                />
                                <TouchableOpacity onPress={() => setShow(true)} className='absolute p-2 rounded top-5 right-16 bg-primary'>
                                    <Icon name="calendar" size={15} color="#fff" />
                                </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                        value={birthDate}
                                        mode="date"
                                        display="default"
                                        onChange={onChange}
                                        maximumDate={new Date()}
                                    />
                                )}
                                {errors.date && <Text className="text-xs text-red-500 " style={{ alignSelf: "flex-start", marginLeft: 45 }}>{errors.date}</Text>}
                            </Animated.View>

                            {/* Gender selector */}
                            <View className={`w-4/5 m-2 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.gender ? 'border-red-500' : ''}`} style={{ borderWidth: 1 }}>
                                <RNPickerSelect
                                    placeholder={{ label: 'Sexe', value: null, color: '#0C7E47' }}
                                    style={{ inputAndroid: { color: '#0C7E47', height: 50 }, inputIOS: { color: '#0C7E47', height: 50 } }}
                                    onValueChange={(value) => setGender(value)}
                                    items={genders}
                                />
                            </View>
                            {errors.gender && <Text className="text-xs text-red-500" style={{ alignSelf: "flex-start", marginLeft: 45 }}>{errors.gender}</Text>}
                        </View>
                    </ScrollView>

                    {/* Action Buttons */}
                    <View className="flex items-center content-center justify-center w-full h-1/3">
                        <Animated.View entering={FadeInUp.delay(250).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                            <TouchableOpacity className="w-4/5 p-3 m-5 bg-primary rounded-xl" onPress={handleContinue}>
                                <Text className="font-bold text-center text-white">Continuer     <Icon name="arrow-right" size={15} color="white" /></Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}