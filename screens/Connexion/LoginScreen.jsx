import { View, Text, Button, Image, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import colors from '../../components/colors';
import RNPickerSelect from 'react-native-picker-select';
import countryData from '../../components/data/country.json'

export default function LoginScreen() {

    const navigation = useNavigation();

    const [ dialCode, setDialCode ] = useState(null)
    
    const handleNavigateToHome = () => {
        navigation.navigate('Home');
    };

    const [showPassword, setShowPassword] = useState(false);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col items-center w-full h-full bg-primary">

            <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} className="flex-row items-center content-center w-full gap-10 h-1/6" style={{ marginVertical: 20, marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 25, paddingVertical: 5 }}>
                    <Icon name="arrow-left" size={20} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white " >Connexion à mon compte </Text>
            </Animated.View>

            {/** Login  Form 1 */}
            <Animated.View entering={FadeInDown.delay(250).duration(5000).springify()} className="flex-col items-center content-center w-full pt-16 bg-white rounded-l-3xl h-5/6" style={{ borderTopLeftRadius: 70, borderTopRightRadius: 70, shadowColor: "#000" }}>
                
                {/** Inputs View */}
                <View className="flex-col w-full pb-14">
                {/** Phone Input */}

                <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} className="flex-row items-center justify-center w-full">
                    <View className='absolute mr-5 left-11 rounded-tl-xl rounded-bl-xl border-r-primary' style={{width: 138, borderRightWidth: 1, zIndex: 100}}>
                        <RNPickerSelect placeholder={ {label:'+237' , value:null, color:colors.behind_input} } 
                        onValueChange={(value) => setDialCode(value)}
                        items={countryData.map((country) => ({
                            label: country.flag + '  ' + country.dial_code,
                            key: country.code,
                            value: country.name
                        }) )}
                        />
                    </View>
                    <TextInput className="w-4/5 p-3 m-5 pl-36 border-primary-200 rounded-xl placeholder:text-behind-input " style={styles.input} placeholder="Numéro de téléphone" keyboardType='numeric'></TextInput>
                </Animated.View>

                {/** Login Input */}
                <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} className="items-center content-center w-full ">
                    <TextInput className="w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input" style={styles.input} placeholder="Nom d'utilisateur"></TextInput>
                </Animated.View>

                {/** Password Input */}
                <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()} className="flex-col items-center content-center justify-center w-full ">
                    <TextInput className="w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input" style={styles.input} placeholder="Mot de passe" secureTextEntry={!showPassword}>
                    </TextInput>
                    <Icon
                        style={{ position: 'absolute', right: 60 }}
                        name={showPassword ? "eye-slash" : "eye"}
                        size={20}
                        color={colors.primary}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                </Animated.View>
                </View>

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
                        <TouchableOpacity className="w-full p-3 m-5 bg-secondary-btn-bg rounded-xl" onPress={handleNavigateToHome}>
                            <Text className="font-bold text-center text-primary-bold">S'inscrire        <Icon name="arrow-right" size={15} color="#106C52" /></Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Animated.View>

        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 15,
        borderWidth: 1
    }
})