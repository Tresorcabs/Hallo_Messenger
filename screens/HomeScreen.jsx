import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import bgImage from '../assets/bg-image.png';
import logo from '../assets/logo.png';

export default function HomeScreen() {

    const navigation = useNavigation();
    return (

        <View className="flex-col items-center w-full h-full bg-white">
            <StatusBar style="light" />
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="absolute w-full h-full" source={bgImage} />

            <View className="flex items-center content-center justify-center w-full h-2/3">
                <Animated.Image entering={FadeInDown.delay(400).duration(1000).springify().dumping} className="pt-10" source={logo} />
                <View className="flex-col items-center gap-5">
                    <Animated.Text entering={FadeInUp.delay(250).duration(1000).springify()} className="pt-10 text-3xl font-bold tracking-wider text-center text-white">Bienvenue sur </Animated.Text>
                    <Animated.Text entering={FadeInUp.delay(350).duration(1000).springify()} className="text-4xl font-bold tracking-wider text-center text-white"> Hallo Messenger </Animated.Text>
                </View>
                <Animated.Text entering={FadeInUp.delay(450).duration(1000).springify().dumping} className="m-10 text-sm font-semibold text-center text-white">La meilleure application de messagerie pour les entreprises</Animated.Text>

            </View>

            {/** Action Buttons */}
            <View className="flex items-center content-center justify-center w-full h-1/3">

                {/** Action Buttons : s'inscrire */}
                <Animated.View entering={FadeInUp.delay(250).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                    <TouchableOpacity className="w-full p-3 m-5 bg-primary rounded-xl" onPress={() => navigation.navigate('SignUp1')} >
                        <Text className="font-bold text-center text-white">S'inscrire         <Icon name="arrow-right" size={15} color="white" /> </Text>
                    </TouchableOpacity>
                </Animated.View>

                {/** Separator */}
                <Animated.View entering={FadeInUp.delay(450).duration(1000).springify()} className="flex-row items-center gap-2 pt-5 pb-5">
                    <View className='opacity-40' style={{ borderBottomColor: '#27A584', borderBottomWidth: 1, width: '30%', paddingLeft: 20 }} />
                    <Text className="opacity-40 text-primary-200">Déjà inscrit ?</Text>
                    <View className='opacity-40' style={{ borderBottomColor: '#27A584', borderBottomWidth: 1, width: '30%', paddingRight: 20 }} />
                </Animated.View>

                {/** Action Buttons : se connecter */}
                <Animated.View entering={FadeInUp.delay(650).duration(1000).springify()} className="items-center justify-center w-full pl-8 pr-8 ">
                    <TouchableOpacity className="w-full p-3 m-5 bg-secondary-btn-bg rounded-xl" onPress={() => navigation.navigate('Login')} >
                        <Text className="font-bold text-center text-primary-bold">Se connecter         <Icon name="arrow-right" size={15} color="#106C52" /></Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}
