import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../components/colors';
import placeholderImage from '../../../assets/placeholder_avatar.png';

const UserProfileScreen = () => {

    // Ici on récupère les valeurs passées  
    const route = useRoute();
    const { Nom, phoneNumber, profil, statut } = route.params;

    const navigation = useNavigation();

    return (
        <View style={StyleSheet.container}>
            <View style={styles.header}>

                {/** Bouton de retour */}
                <TouchableOpacity style={styles.backButton}>
                    <Icon name="arrow-back" size={25} color={colors.pureWhite} onPress={() => navigation.goBack()} />
                </TouchableOpacity>

                {/** Bouton de menu */}
                <TouchableOpacity style={styles.menuButton}>
                    <Icon name="ellipsis-vertical" size={25} color={colors.pureWhite} />
                </TouchableOpacity>
            </View>

            {/** Photo de profil, nom et numéro */}
            <View style={styles.infosContainer}>
                <View>
                    {profil ? <Image source={profil} style={styles.profilImage} />
                        : <Image source={placeholderImage} style={styles.profilImage} />}
                    {/** Indicateur de  Statut du contact */}
                    <View style={[styles.statusIndicator, { backgroundColor: statut === "En ligne" ? colors.statutIndicator : "grey", }]} />
                </View>

                <Text style={styles.nom}>{Nom}</Text>
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            </View>

            {/** Infos supplémentaires  */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        width: "100%",
        height: 100,
        elevation: 5,
        backgroundColor: colors.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingTop: 20,
        alignItems: 'center',
    },
    infosContainer: {
        display: "flex",
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        height: 280,
        justifyContent: 'center',
        width: "100%",
        paddingHorizontal: 10,
    },
    profilImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    statusIndicator: {
        position: 'absolute',
        right: 20,
        bottom: 5,
        width: 20,
        height: 20,
        borderColor: colors.statutIndicatorBorder,
        borderRadius: 50,
        borderWidth: 3,

    },
    nom: {
        fontSize: 26,
        fontWeight: '600'
    },
    phoneNumber: {
        fontSize: 22,
        fontStyle: 'italic',
        letterSpacing: 1.5,
    },
});

export default UserProfileScreen;