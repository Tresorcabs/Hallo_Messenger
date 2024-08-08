import { View, Tex, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

export default function CustomSettingButton({ iconSize, iconColor, buttonStyle }) {
    return (

        /** Settings button */

        <TouchableOpacity style={buttonStyle}>
            <Icon name="ellipsis-vertical" size={iconSize} color={iconColor} />
        </TouchableOpacity >
    )
}