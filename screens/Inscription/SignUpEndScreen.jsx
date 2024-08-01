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
import React, { useState } from "react";
import colors from "../../components/colors";
import okGif from "../../assets/Ok.gif";

export default function SignUpEndScreen() {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-col items-center w-full h-full bg-primary">


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
              <TouchableOpacity className="w-4/5 p-3 m-5 bg-primary rounded-xl" onPress={() => navigation.replace("Messenger")}>
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
