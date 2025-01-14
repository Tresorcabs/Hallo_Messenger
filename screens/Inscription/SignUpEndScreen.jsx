import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useContext, useState } from "react";
import colors from "../../components/colors";
import okGif from "../../assets/Ok.gif";
import axios from "axios";
import { SignUpContext } from "../../Contexts/SignUpContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HelperText } from "react-native-paper";
import { login } from "../../api/dataServices";

export default function SignUpEndScreen() {
  const navigation = useNavigation();
  const [apiError, setApiError] = useState(null);

  const { updateSignUpData, signUpData } = useContext(SignUpContext);

  const directLogin = async () => {

    console.log(signUpData.nom_utilisateur, signUpData.mot_de_passe, signUpData.numero_de_telephone)
    login(signUpData.nom_utilisateur, signUpData.mot_de_passe, signUpData.numero_de_telephone, navigation)
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-col items-center w-full h-full bg-primary">

        {/** Affichage des erreurs API */}
        {apiError && (
          <Animated.View entering={FadeInUp.delay(250).duration(2000).springify()} style={{ width: "80%", height: 30, borderColor: colors.redAlert, borderLeftWidth: 15, borderWidth: 1, borderRadius: 8, textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <HelperText type="error" visible={true} >
              {apiError}
            </HelperText>
          </Animated.View>
        )}

        {/** signUP  Form 1 */}
        <Animated.View
          entering={FadeInDown.delay(250).duration(5000).springify()}
          className="absolute flex-col items-center content-center justify-between w-full pt-16 mt-16 bg-white rounded-l-3xl"
          style={{
            borderTopLeftRadius: 70,
            borderTopRightRadius: 70,
            height: "100%",
            shadowColor: "#000",
          }}
        >
          {/** Inputs view */}
          <View className="flex-col items-center content-center w-full">
            {/** Congratulations GIF */}
            <Animated.View
              entering={FadeInUp.delay(400).duration(1000).springify()}
              className="items-center content-center w-full "
            >
              <Image
                source={okGif}
                style={{ width: 300, height: 300 }}
              />
            </Animated.View>

            {/** Congratulations text */}
            <Animated.View
              entering={FadeInUp.delay(300).duration(1000).springify()}
              className="flex-row items-center content-center justify-center w-full m-5"
            >
              <Text className="text-lg text-center text-primary">
                Félicitations ! Vous avez terminé votre inscription.
              </Text>
            </Animated.View>
          </View>

          {/** Action Buttons */}
          <View className="flex items-center content-center justify-center w-full h-1/3">
            {/** Action Buttons : Continuer*/}
            <Animated.View
              entering={FadeInUp.delay(250).duration(1000).springify()}
              className="items-center justify-center w-full pl-8 pr-8"
            >
              <TouchableOpacity className="w-4/5 p-3 m-5 bg-primary rounded-xl" onPress={() => navigation.navigate('Login')}>
                <Text className="font-bold text-center text-white">
                  Démarrer   <Icon name="arrow-right" size={15} color="white" />
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
