import { Dimensions, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    runOnJS
} from "react-native-reanimated";
import colors from './colors';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomSearchBarTwo = ({ searchBarButtonStyle, searchBarIconButtonStyle, searchBarStyle, searchBarInputStyle, searchBarPlaceholder }) => {

    const [isSearchBarOpen, setIsSearchBarOpen] = useState(true);
    const [searchText, setSearchText] = useState('');
    const textInputRef = useRef(null);

    const handleTextChangeOnSearchBar = (text) => {
        setSearchText(text)
    }

    return (
        <>
            {/** search bar */}

            <TouchableOpacity style={searchBarButtonStyle}>
                {/*search button */}
                <Icon name="search" size={25} color={searchBarIconButtonStyle} />
            </TouchableOpacity>
            <Animated.View style={searchBarStyle}>
                <TextInput
                    placeholder={searchBarPlaceholder}
                    ref={textInputRef}
                    value={searchText}
                    onChangeText={handleTextChangeOnSearchBar}
                    style={searchBarInputStyle} />
            </Animated.View>
        </>
    )
}


const styles = StyleSheet.create({});

export default CustomSearchBarTwo
