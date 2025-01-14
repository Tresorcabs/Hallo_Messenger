import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import colors from "../../components/colors";
import { SignUpContext } from '../../Contexts/SignUpContext';

const placeholderAvatar = require('../../assets/placeholder_avatar.png');

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [memo, setMemo] = useState('');
  const [error, setError] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setError("Permission d'accès à la galerie refusée");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true
      });
      if (!result.canceled) {
        const base64Image = `data:image/jpg;base64,${result.assets[0].base64}`;
        setImage(base64Image);
        setError('');
      }
    } catch (error) {
      console.log("Erreur de sélection d'image", error);
      setError("Erreur lors de la sélection de l'image");
    }
  };


  // On enregistre les données d'inscription partielles dans le contexte
  const { updateSignUpData, signUpData } = useContext(SignUpContext);


  const handleSubmit = () => {
    if (!image) {
      setError("Veuillez sélectionner une image de profil");
      return;
    }
    if (memo.trim().length === 0) {
      setError("Veuillez saisir un mémo");
      return;
    }


    const step4Data = {
      photo_de_profil: image,
      memo: memo,
    }
    updateSignUpData(step4Data);
    //console.log(signUpData);
    navigation.navigate("SignUp5");
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-primary">
        <Animated.View
          entering={FadeInUp.delay(150).duration(1000).springify()}
          className="flex-row items-center w-full px-4 mt-5 h-1/6"
        >
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Icon name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">
            Inscription ( Etape 4 / 5)
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(250).duration(1000).springify()}
          className="flex-1 px-4 pt-8 bg-white rounded-t-3xl"
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animated.Text
              entering={FadeInUp.delay(300).duration(1000).springify()}
              className="mb-6 text-lg text-center text-primary"
            >
              Sélectionnez une photo de profil
            </Animated.Text>

            <Animated.View
              entering={FadeInUp.delay(400).duration(1000).springify()}
              className="items-center mb-6"
            >
              <View className="relative">
                <Image
                  source={image ? { uri: image } : placeholderAvatar}
                  className="w-40 h-40 rounded-full"
                />
                <TouchableOpacity
                  className="absolute bottom-0 right-0 p-3 rounded-full bg-primary"
                  onPress={pickImage}
                >
                  <Icon name="camera" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInUp.delay(500).duration(1000).springify()}
              className="mb-6"
            >
              <TextInput
                className="p-3 border border-primary-200 rounded-xl"
                placeholder="Saisissez votre mémo"
                multiline={true}
                numberOfLines={4}
                value={memo}
                onChangeText={setMemo}
              />
            </Animated.View>

            {error ? (
              <Animated.Text
                entering={FadeInUp.duration(500).springify()}
                className="mb-4 text-center text-red-500"
              >
                {error}
              </Animated.Text>
            ) : null}

            <Animated.View
              entering={FadeInUp.delay(600).duration(1000).springify()}
              className="mt-6"
            >
              <TouchableOpacity
                className="w-full p-3 bg-primary rounded-xl"
                onPress={handleSubmit}
              >
                <Text className="font-bold text-center text-white">
                  Continuer  <Icon name="arrow-right" size={15} color="white" />
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}