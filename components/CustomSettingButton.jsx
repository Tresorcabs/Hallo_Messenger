import { View, Tex, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CustomSettingButton({ iconSize, iconColor, buttonStyle }) {

    const navigation = useNavigation();

    // Logique de deconnexion de l'utilisateur

    const handleLogout = async () => {

        try {
            await AsyncStorage.removeItem('authToken');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }


    return (

        /** Settings button */

        <TouchableOpacity style={buttonStyle} onPress={handleLogout}>
            <Icon name="ellipsis-vertical" size={iconSize} color={iconColor} />
        </TouchableOpacity >
    )
}