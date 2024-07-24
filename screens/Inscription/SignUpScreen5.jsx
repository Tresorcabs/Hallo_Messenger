import {
    View,
    Text,
    Button,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
    FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import colors from "../../components/colors";

export default function SignUpScreen5() {

const navigation = useNavigation();

const handleNavigateToHome = () => {
navigation.navigate("Home");
};

const [showPassword, setShowPassword] = useState(false);
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
        Inscription ( Etape 5 / 5)
        </Text>
    </Animated.View>

    {/** signUP  Form 5 */}
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
        {/** Login Input */}
        <Animated.View
            entering={FadeInUp.delay(400).duration(1000).springify()}
            className="items-center content-center w-full "
        >
            <TextInput
            className="w-4/5 p-3 m-5 border-primary-200 rounded-xl placeholder:text-behind-input"
            style={{ borderWidth: 1 }}
            placeholder="Nom d'utilisateur"
            ></TextInput>
        </Animated.View>

        {/** Password Input */}
        <Animated.View
            entering={FadeInUp.delay(600).duration(1000).springify()}
            className="flex-col items-center content-center justify-center w-full "
        >
            <TextInput
            className="w-4/5 p-3 m-5 text-sm border-primary-200 rounded-xl placeholder:text-behind-input"
            style={{ borderWidth: 1 }}
            placeholder="Mot de passe"
            secureTextEntry={!showPassword}
            ></TextInput>
            <Icon
            style={{ position: "absolute", right: 60 }}
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color={colors.primary}
            onPress={() => setShowPassword(!showPassword)}
            />
        </Animated.View>

        {/** Confirm Password Input */}
        <Animated.View
            entering={FadeInUp.delay(600).duration(1000).springify()}
            className="flex-col items-center content-center justify-center w-full "
        >
            <TextInput
            className="w-4/5 p-3 m-5 text-sm border-primary-200 rounded-xl placeholder:text-behind-input"
            style={{ borderWidth: 1 }}
            placeholder="Confirmez le mot de passe"
            secureTextEntry={!showPassword}
            ></TextInput>
        </Animated.View>

        {/**Accept terms and conditions */}
        </View>

        {/** Action Buttons */}
        <View className="flex items-center content-center justify-center w-full h-1/3">
        {/** Action Buttons : se connecter*/}
        <Animated.View
            entering={FadeInUp.delay(250).duration(1000).springify()}
            className="items-center justify-center w-full pl-8 pr-8 "
        >
            <TouchableOpacity
            className="w-full p-3 m-5 bg-primary rounded-xl"
            onPress={() => navigation.navigate("SignUpFinal")}
            >
            <Text className="font-bold text-center text-white">
                Continuer <Icon name="arrow-right" size={15} color="white" />{" "}
            </Text>
            </TouchableOpacity>
        </Animated.View>
        </View>
    </Animated.View>
    </View>
</TouchableWithoutFeedback>
);
}
