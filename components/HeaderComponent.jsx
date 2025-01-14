import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomSettingButton from './CustomSettingButton';
import placeHolderImage from '../assets/placeholder_avatar.png';

export default function HeaderComponent({ myProfile, avatarStyle, avatarContainerStyle, headerStyle, headerTextStyle, headerText, }) {


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
                        <Image style={avatarStyle} source={{ uri: myProfile }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <Image style={avatarStyle} source={placeHolderImage} />
                    </TouchableOpacity>
                }


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