import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper';


export default function CustomDivider({ text, containerStyle, textStyle, barStyle }) {
    return (

        /** Diviseur */

        <View style={containerStyle} >
            <Text style={textStyle}> {text} </Text>
            <Divider style={barStyle} />
        </View>
    )
}
