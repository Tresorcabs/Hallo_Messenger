import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated';
import colors from './colors';
const DataContainer = ({ children }) => {
    return (
        /** Discussions container */
        < Animated.View
            entering={FadeInDown.delay(250).duration(5000).springify()}
            className="flex-col items-center content-center justify-between w-full pt-6 pb-2"
            style={
                Platform.OS == "android" ?
                    {
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: colors.pureWhite,
                        paddingTop: 24,
                        paddingBottom: 8,
                        width: "98%",
                        height: "90%",
                        shadowColor: "#000",
                        zIndex: -100,
                    }
                    : {
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: colors.pureWhite,
                        paddingTop: 24,
                        paddingBottom: 8,
                        width: "98%",
                        height: "90%",
                        shadowColor: "#000",
                        zIndex: -100,
                    }
            }
        >

            {children}

        </Animated.View >
    )
}

const styles = StyleSheet.create({});

export default DataContainer
