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
  ScrollView
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
import * as ImagePicker from "expo-image-picker";
import placeholderAvatar from "../../assets/placeholder_avatar.png";
import profil1 from '../../assets/profil1.jpg';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    //Demander la permission pour accéder à la galerie

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission refusé");

      return;
    }

    //sélectionner une image
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch {
      console.log("Erreur de selection d'image ", error);
    }
  };

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
            Inscription ( Etape 4 / 5)
          </Text>
        </Animated.View>

        {/** signUP  Form 4 */}
        <Animated.View
          entering={FadeInDown.delay(250).duration(5000).springify()}
          className="flex-col items-center content-center justify-between w-full pt-16 pb-16 bg-white rounded-l-3xl h-5/6"
          style={{
            borderTopLeftRadius: 70,
            borderTopRightRadius: 70,
            shadowColor: "#000",
          }}
        >

          <ScrollView showsVerticalScrollIndicator={false} style={{ width: "95%" }}>
            {/** Inputs view */}
            <View className="flex-col items-center content-center w-full">
              {/** Profile text */}
              <Animated.View
                entering={FadeInUp.delay(300).duration(1000).springify()}
                className="flex-row items-center content-center justify-center w-full m-5"
              >
                <Text className="text-lg text-center text-primary">
                  Sélectionnez une photo de profil
                </Text>
              </Animated.View>

              {/** Profile selector  */}
              <Animated.View
                entering={FadeInUp.delay(400).duration(1000).springify()}
                className="items-center content-center w-full "
              >
                <View
                  className="p-3 m-5 rounded-full bg-secondary-btn-bg border-primary-200"
                  style={{ borderWidth: 1 }}
                >
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      className="w-40 h-40 rounded-full"
                    />
                  ) : (
                    /*placeholder image */
                    <Image
                      source={placeholderAvatar}
                      className="w-40 h-40 rounded-full"
                    />
                  )}

                  <TouchableOpacity
                    className="absolute bottom-0 p-3 rounded-full right-2 bg-primary"
                    onPress={pickImage}
                  >
                    <Icon name="camera" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </Animated.View>

              {/** Memo Input */}
              <Animated.View
                entering={FadeInUp.delay(400).duration(1000).springify()}
                className="items-center content-center w-full "
              >
                <TextInput
                  className="w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input"
                  style={{ borderWidth: 1 }}
                  placeholder="Saisissez votre mémo"
                  multiline={true}
                ></TextInput>
              </Animated.View>
            </View>

          </ScrollView>

          {/** Action Buttons */}
          <View className="flex items-center content-center justify-center w-full h-1/3">
            {/** Action Buttons : Continuer*/}
            <Animated.View
              entering={FadeInUp.delay(250).duration(1000).springify()}
              className="items-center justify-center w-full pl-8 pr-8"
            >
              <TouchableOpacity
                className="w-4/5 p-3 m-5 bg-primary rounded-xl"
                onPress={() => navigation.navigate("SignUp5")}
              >
                <Text className="font-bold text-center text-white">
                  Continuer  {"    "}
                  <Icon name="arrow-right" size={15} color="white" />
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
