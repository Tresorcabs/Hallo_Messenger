// ActionBar.js
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from './colors';

const MenuActionBar = ({ isVisible, position, onClose, options }) => {

    // on utilise les composants Reanimated pour realiser une animation 
    const animatedStyle = useAnimatedStyle(() => {

        return {
            transform: [
                { translateX: withSpring(isVisible ? 0 : 400) }, // animation de l'ouverture et de la fermeture du menu '0' ou '400' correspondant a l'épaisseur du menu avant et après l'ouverture
            ],
        };
    });

    return (
        //on map sur options pour afficher options du menu sous forme de boutons 
        <Animated.View style={[styles.actionBar, position, animatedStyle]}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.actionButton}
                    onPress={() => {
                        option.onPress();
                        onClose();
                    }}
                >
                    <Icon name={option.icon} size={24} color={colors.primary} />

                </TouchableOpacity>

            ))}
            <TouchableOpacity style={{ backgroundColor: colors.secondary_btn_bg, borderRadius: 50, padding: 8, marginLeft: 4 }} >
                <Icon name="close" size={24} color={colors.primary} onPress={onClose} />
            </TouchableOpacity>
        </Animated.View>
    );
};

// Styles

const styles = StyleSheet.create({
    actionBar: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 50,
        paddingHorizontal: 8,
        paddingVertical: 4,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    actionButton: {
        padding: 8,
        marginHorizontal: 4,
    },
});

export default MenuActionBar;