import { View, Text, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function LoginScreen() {

    const navigation = useNavigation();

    const [ showPassword, setShowPassword ] = useState(false);
    return (
        <View className="flex-col items-center w-full h-full bg-primary">

            <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} className="flex-row items-center content-center w-full gap-10 h-1/6" style={{ marginVertical: 20, marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 25, paddingVertical: 5 }}>
                    <Icon name="arrow-left" size={20} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white " >Connexion à mon compte </Text>
            </Animated.View>

            {/** Login  Form 1 */}
            <Animated.View entering={FadeInDown.delay(250).duration(5000).springify()} className="flex-col items-center content-center justify-between w-full pt-16 pb-16 bg-white rounded-l-3xl h-5/6" style={{ borderTopLeftRadius: 70, borderTopRightRadius: 70, shadowColor: "#000" }}>
                {/** Phone Input */}
                <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="items-center content-center w-full ">
                    <TextInput className="w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input" style={{ borderWidth: 1 }} placeholder="Numéro de téléphone" keyboardType='numeric'></TextInput>
                </Animated.View>

                {/** Login Input */}
                <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} className="items-center content-center w-full ">
                    <TextInput className="w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input" style={{ borderWidth: 1 }} placeholder="Login"></TextInput>
                </Animated.View>

                {/** Password Input */}
                <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()} className="items-center content-center w-full ">
                    <TextInput className="w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input" style={{ borderWidth: 1 }} placeholder="Password" secureTextEntry={showPassword}>
                        <Icon style={{ position: 'absolute', right: 10 }} name="eye" size={15} color="black" onPress={() => setShowPassword(!showPassword)} />
                    </TextInput>
                </Animated.View>

                {/** Action Buttons */}
                <View className="flex items-center content-center justify-center w-full h-1/3">

                    {/** Action Buttons : se connecter*/}
                    <Animated.View entering={FadeInUp.delay(250).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                        <TouchableOpacity className="w-full p-3 m-5 bg-primary rounded-xl">
                            <Text className="font-bold text-center text-white">Connexion          <Icon name="arrow-right" size={15} color="white" /> </Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/** Separator */}
                    <Animated.View entering={FadeInUp.delay(450).duration(1000).springify()} className="flex-row gap-2 pt-5 pb-5">
                        <Text className="opacity-50 text-primary-200">--------------------------------------</Text>
                        <Text className="opacity-50 text-primary-200">Pas encore de compte ?</Text>
                        <Text className="opacity-50 text-primary-200">---------------------------------------</Text>
                    </Animated.View>

                    {/** Action Buttons : s'inscrire'*/}
                    <Animated.View entering={FadeInUp.delay(650).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                        <TouchableOpacity className="w-full p-3 m-5 bg-secondary-btn-bg rounded-xl" onPress={navigation.navigate('Home')}>
                            <Text className="font-bold text-center text-primary-bold">S'inscrire        <Icon name="arrow-right" size={15} color="#106C52" /></Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Animated.View>

        </View>
    )
}