import React, { useState, useContext } from 'react';
import {
  View,
  Text,
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
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";
import countryData from "../../components/data/country.json";
import colors from "../../components/colors";
import { SignUpContext } from '../../Contexts/SignUpContext';

export default function SignUpScreen2() {
  const [country, setCountry] = useState(null);
  const [countryDialCode, setCountryDialCode] = useState("+ 237 600 000 000");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();



  // On enregistre les données d'inscription partielles dans le contexte

  const { updateSignUpData, signUpData } = useContext(SignUpContext);

  const handleContinue = () => {
    if (validateFields()) {
      const step2Data = {
        pays: country,
        numero_de_telephone: countryDialCode + phone,
      }
      updateSignUpData(step2Data);
      navigation.navigate("OTP");
    }
  };



  const handleCountryChange = (value) => {
    const selectedCountry = countryData.find((c) => c.name === value);
    setCountry(value);
    setCountryDialCode(selectedCountry ? selectedCountry.dial_code : "");
  };

  const validateFields = () => {
    let newErrors = {};
    if (!country) newErrors.country = "Le pays est requis";
    if (!phone.trim()) newErrors.phone = "Le numéro de téléphone est requis";
    // Ajoutez une validation plus poussée pour le numéro de téléphone si nécessaire
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-col items-center w-full h-full bg-primary">
        <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()} className="flex-row items-center content-center w-full h-1/6" style={{ gap: 10, marginBottom: 5, marginTop: 5, paddingHorizontal: 10, }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10, }}>
            <Icon
              name="arrow-left"
              size={20}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white ">
            Inscription ( Etape 2 / 5)
          </Text>
        </Animated.View>

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
            <View className="flex-col items-center content-center w-full">
              <View
                className={`w-4/5 m-5 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.country ? 'border-red-500' : ''}`}
                style={{ borderWidth: 1 }}
              >
                <RNPickerSelect
                  placeholder={{ label: "Pays", value: null, color: colors.behind_input }}
                  style={{
                    inputAndroid: { color: "#0C7E47", height: 50 },
                    inputIOS: { color: "#0C7E47", height: 50, paddingLeft: 10 },
                  }}
                  onValueChange={handleCountryChange}
                  items={countryData.map((country) => ({
                    label: country.flag + "    |   " + country.name,
                    key: country.code,
                    value: country.name,
                  }))}
                />
              </View>
              {errors.country && <Text className="text-red-500">{errors.country}</Text>}

              <Animated.View
                entering={FadeInUp.delay(400).duration(1000).springify()}
                className="items-center content-center w-full "
              >
                <TextInput
                  className={`w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input ${errors.phone ? 'border-red-500' : ''}`}
                  style={{ borderWidth: 1 }}
                  placeholder={countryDialCode}
                  keyboardType="numeric"
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
                {errors.phone && <Text className="text-red-500">{errors.phone}</Text>}
              </Animated.View>
            </View>
          </ScrollView>

          <View className="flex items-center content-center justify-center w-full h-1/3">
            <Animated.View
              entering={FadeInUp.delay(250).duration(1000).springify()}
              className="items-center justify-center w-full pl-8 pr-8 "
            >
              <TouchableOpacity
                className="w-4/5 p-3 m-5 bg-primary rounded-xl"
                onPress={handleContinue}
              >
                <Text className="font-bold text-center text-white">
                  Vérifier mon numéro{" "}
                  <Icon name="arrow-right" size={15} color="white" />{" "}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}