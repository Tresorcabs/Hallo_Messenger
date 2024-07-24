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

export default function SignUpEndScreen() {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-col items-center w-full h-full bg-primary">
        <Animated.View
          entering={FadeInUp.delay(150).duration(1000).springify()}
          className="flex-row items-center content-center w-full gap-10 h-1/6"
          style={{ marginVertical: 20, marginTop: 10 }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 25, paddingVertical: 5 }}
          >
            <Icon
              name="arrow-left"
              size={20}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white ">
            {" "}
            Félicitations{" "}
          </Text>
        </Animated.View>

        {/** signUP  Form 1 */}
        <Animated.View
          entering={FadeInDown.delay(250).duration(5000).springify()}
          className="flex-col items-center content-center justify-between w-full pt-16 pb-16 bg-white rounded-l-3xl h-5/6"
          style={{
            borderTopLeftRadius: 70,
            borderTopRightRadius: 70,
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
                source={require("../../assets/images/Ok.gif")}
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
              <TouchableOpacity className="w-4/5 p-3 m-5 bg-primary rounded-xl">
                <Text className="font-bold text-center text-white">
                  Démarrer <Icon name="arrow-right" size={15} color="white" />{" "}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
