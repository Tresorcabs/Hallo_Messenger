import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from './colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SpotActionModal({ visible, onClose, onViewSpots, onAddNewSpot }) {


    return (
        <GestureHandlerRootView>
            {/** Header Component */}



            <View style={styles.container}>
                {/** Le modal */}
                <View style={styles.modal}>
                    {/** Voir mes spots */}
                    <TouchableOpacity style={styles.actionItem} onPress={onViewSpots}>
                        <Icon name="eye-outline" size={25} color="white" />
                        <Text style={styles.actionText}>Voir mes spots</Text>
                    </TouchableOpacity>

                    {/** Ajouter un nouveau spot */}
                    <TouchableOpacity style={styles.actionItem} onPress={onAddNewSpot}>
                        <Icon name="add-outline" size={25} color="white" />
                        <Text style={styles.actionText}>Ajouter un nouveau spot</Text>
                    </TouchableOpacity>


                    {/** Fermer le modal */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close-outline" size={25} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: colors.pureWhite,
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    actionText: {
        marginLeft: 12,
        fontSize: 16,
        color: colors.primary,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 8,
    },
});

