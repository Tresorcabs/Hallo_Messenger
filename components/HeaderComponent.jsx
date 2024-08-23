import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomSettingButton from './CustomSettingButton'
import { Avatar } from 'react-native-paper';

export default function HeaderComponent({ myProfile, avatarSize, avatarContainerStyle, headerStyle, headerTextStyle, headerText, }) {
    return (

        /** Header */
        < View style={[headerStyle, { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", alignContent: "center" }]} >
            <Text style={headerTextStyle}>
                {headerText}
            </Text>


            {/** Avatar container */}
            <View style={avatarContainerStyle} >
                {/** My Profil image */}
                {myProfile ?
                    <TouchableOpacity>
                        <Avatar.Image size={avatarSize} source={myProfile} />
                    </TouchableOpacity>
                    : null}


                {/** Settings button */}
                <CustomSettingButton iconSize={25} iconColor="white" buttonStyle={styles.settingsButton} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsButton: {
        padding: 5,
    }
})