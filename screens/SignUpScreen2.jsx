import { View, Text, Button, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import ReactNativePhoneInput from 'react-native-phone-input';


export default function SignUpScreen1() {

    const [country, setCountry] = useState(null);
    const [phone, setPhone] = useState(null);
    const [show, setShow] = useState(false);

    const countries = [
        { label: 'Cameroun', value: 'cmr' },
        { label: 'Senegal', value: 'sng' }

    ]

    const navigation = useNavigation();

    return (
        <View className="flex-col items-center w-full h-full bg-primary">

            <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} className="flex-row items-center content-center w-full gap-10 h-1/6" style={{ marginVertical: 20, marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal: 25, paddingVertical: 5}}>
                <Icon  name="arrow-left" size={20} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white " >Inscription ( Etape 2 / 5)</Text>
            </Animated.View>

            {/** signUP  Form 1 */}
            <Animated.View entering={FadeInDown.delay(250).duration(5000).springify()} className="flex-col items-center content-center justify-between w-full pt-16 pb-16 bg-white rounded-l-3xl h-5/6" style={{ borderTopLeftRadius: 70, borderTopRightRadius: 70, shadowColor: "#000" }}>
                {/** Inputs view */}
                <View className="flex-col items-center content-center w-full">

                    {/** country selector */}
                    <Animated.View entering={FadeInUp.delay(300).duration(1000).springify()} className="w-4/5 m-5 border-primary-200 rounded-xl placeholder:text-behind-input" style={{ borderWidth: 1 }}>

                        <RNPickerSelect placeholder={{ label: 'Pays', value: null, color: '#0C7E47', }} style={{ inputAndroid: { color: '#0C7E47' }, inputIOS: { color: '#0C7E47' } }} onValueChange={(value) => setCountry(value)} items={countries} />
                    </Animated.View>


                    {/** Phone Input */}
                    <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} className="items-center content-center w-full ">
                        <TextInput className="w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input" style={{ borderWidth: 1 }} placeholder="Numéro de téléphone" keyboardType='numeric'></TextInput>
                    </Animated.View>

                </View>



                {/** Action Buttons */}
                <View className="flex items-center content-center justify-center w-full h-1/3">

                    {/** Action Buttons : vérifier mon numéro*/}
                    <Animated.View entering={FadeInUp.delay(250).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                        <TouchableOpacity className="w-4/5 p-3 m-5 bg-primary rounded-xl" onPress={() => navigation.navigate('OTP')} >
                            <Text className="font-bold text-center text-white">Vérifier mon numéro       <Icon name="arrow-right" size={15} color="white" /> </Text>
                        </TouchableOpacity>
                    </Animated.View>

                </View>

            </Animated.View>

        </View>
    );
}