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

const CustomSearchBar = ({ searchBarButtonStyle, searchBarIconButtonStyle, searchBarStyle, searchBarInputStyle, searchBarPlaceholder }) => {

    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const translateX = useSharedValue(0); // Commence hors écran à droite
    const textInputRef = useRef(null);
    const SEARCH_BUTTON_WIDTH = 2;
    const { width } = Dimensions.get('window');

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        }
    });
    const toggleSearchBar = () => {

        if (isSearchBarOpen && !searchText) {
            // Fermer seulement si le TextInput est vide
            closeSearchBar();
        } else if (!isSearchBarOpen) {
            // Ouvrir le TextInput
            openSearchBar();
        }

    };

    const openSearchBar = () => {

        // Animation d'ouverture
        translateX.value = withTiming(0 - SEARCH_BUTTON_WIDTH, {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }, () => {
            // Lorsque le textInput est affiche, il est focus
            runOnJS(focusSearchBarInput)();
        });

        setIsSearchBarOpen(true);
    };

    const closeSearchBar = () => {
        Keyboard.dismiss();
        // Animation de fermeture
        translateX.value = withTiming(0, {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
        if (searchText === '') {
            setIsSearchBarOpen(false);
        }
    };

    const focusSearchBarInput = useCallback(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);
    const handleTextChangeOnSearchBar = (text) => {
        setSearchText(text);
        // ferme si le contenu est vide 
        if (text == '' && !isSearchBarOpen) {
            closeSearchBar();
        }
    };

    return (
        <>
            {/** search bar */}

            <TouchableOpacity style={searchBarButtonStyle} onPress={toggleSearchBar}>
                {
                    isSearchBarOpen
                        ? //Close button
                        <Icon name="close" size={25} color={searchBarIconButtonStyle} />
                        : //search button
                        <Icon name="search" size={25} color={searchBarIconButtonStyle} />

                }
            </TouchableOpacity>

            {isSearchBarOpen && <Animated.View style={[searchBarStyle, animatedStyles]}>
                <TextInput
                    placeholder={searchBarPlaceholder}
                    ref={textInputRef}
                    value={searchText}
                    onChangeText={handleTextChangeOnSearchBar}
                    style={searchBarInputStyle} />
            </Animated.View>
            }
        </>
    )
}


const styles = StyleSheet.create({});

export default CustomSearchBar
