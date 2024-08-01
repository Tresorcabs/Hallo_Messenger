import { View, Text, Button, Image, TouchableOpacity, TextInput, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import ReactNativePhoneInput from 'react-native-phone-input';
import { Keyboard } from 'react-native';


export default function SignUpScreen1() {

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [formattedDate, setFormattedDate] = useState('__ __ / __ __ / __ __ __ __');
    const [country, setCountry] = useState(null);
    const [gender, setGender] = useState(null);
    const [phone, setPhone] = useState(null);
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const genders = [
        { label: 'Homme', value: 'homme' },
        { label: 'Femme', value: 'Femme' },
        { label: 'Autre', value: 'Autre' },
    ];

    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col items-center w-full h-full bg-primary">
            <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} className="flex-row items-center content-center w-full gap-10 h-1/6" style={{marginVertical: 20, marginTop:10}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal: 25, paddingVertical: 5}}>
                <Icon  name="arrow-left" size={20} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white " >Inscription ( Etape 1 / 5)</Text>
            </Animated.View>

            {/** signUP  Form 1 */}
            <Animated.View entering={FadeInDown.delay(250).duration(5000).springify()} className="flex-col items-center content-center justify-between w-full pt-16 pb-16 bg-white rounded-l-3xl h-5/6" style={{ borderTopLeftRadius: 70, borderTopRightRadius: 70, shadowColor: "#000" }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                {/** Inputs view */}
                <View className="flex-col items-center content-center w-full">
                    {/** Name and surname Input */}
                    <View className="flex-row w-4/5 m-5">
                        {/** Name Input */}
                        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="w-1/2">
                            <TextInput className="p-3 border-primary-200 rounded-xl placeholder:text-behind-input" placeholder="Nom" style={{ borderWidth: 1, width: "95%" }}></TextInput>
                        </Animated.View>

                        {/** surname Input */}
                        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="w-1/2">
                            <TextInput className="p-3 border-primary-200 rounded-xl placeholder:text-behind-input" placeholder="Prénom'" style={{ borderWidth: 1, width: "98%" }} />
                        </Animated.View>

                    </View>

                    {/** birth selector */}
                    <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} className="flex-row items-center content-center justify-center w-full ">

                            <TextInput className="w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input" style={{ borderWidth: 1 }} value={ formattedDate ? date.toLocaleDateString() :  formattedDate} editable={false}/>

                        <TouchableOpacity onPress={() => setShow(true)}  className='absolute p-2 rounded right-16 bg-primary'>
                            <Icon name="calendar" size={15} color="#fff" />
                        </TouchableOpacity>

                        {show == true ?
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                                maximumDate={new Date()}
                            />
                            : date == null
                        }
                    </Animated.View>

                    {/** gender selector */}
                    <View className="w-4/5 m-5 border-primary-200 rounded-xl placeholder:text-behind-input" style={{ borderWidth: 1 }}>

                        <RNPickerSelect  placeholder={{ label: 'Sexe', value: null, color: '#0C7E47', }} style={{ inputAndroid: { color: '#0C7E47', height: 50 }, inputIOS: { color: '#0C7E47', height: 50 }}} onValueChange={(value) => setGender(value)} items={genders} />
                    </View>
                </View>

                </ScrollView>
                
                {/** Action Buttons */}
                <View className="flex items-center content-center justify-center w-full h-1/3">

                    {/** Action Buttons : se connecter*/}
                    <Animated.View entering={FadeInUp.delay(250).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                        <TouchableOpacity className="w-4/5 p-3 m-5 bg-primary rounded-xl" onPress={() => navigation.navigate('SignUp2')} >
                            <Text className="font-bold text-center text-white">Continuer       <Icon name="arrow-right" size={15} color="white" /> </Text>
                        </TouchableOpacity>
                    </Animated.View>

                </View>
            </Animated.View>

        </View>
        </TouchableWithoutFeedback>
    );
}