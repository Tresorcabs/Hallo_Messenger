import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../components/colors';
import placeholderImage from '../../../assets/placeholder_avatar.png';
import { Divider, Button } from 'react-native-paper';
import CustomDivider from '../../../components/CustomDivider';

const UserProfileScreen = () => {

    // Ici on récupère les valeurs passées  
    const route = useRoute();
    const { Nom, phoneNumber, profil, statut } = route.params;

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            {/** Header */}
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

            {/** Diviseur
            <CustomDivider text="Informations supplémentaires" containerStyle={styles.dividerContainer} textStyle={styles.dividerText} barStyle={styles.dividerBar} />
 */}

            {/** Boutons d'action directes sur le contact */}
            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.actionButton} contentStyle={{ flexDirection: "column" }} onPress={() => console.log('Pressed')}>
                    {/** Discuter avec le contact */}
                    <Icon name="chatbox-ellipses" size={25} color={colors.primary} style={styles.actionButtonIcon} />
                    <Text style={styles.actionButtonText}> Envoyer un message </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} contentStyle={{ flexDirection: "column" }} onPress={() => console.log('Pressed')}>
                    {/** partager le contact */}
                    <Icon name='arrow-redo' size={25} color={colors.primary} style={styles.actionButtonIcon} />
                    <Text style={styles.actionButtonText}> Partager le contact </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} contentStyle={{ flexDirection: "column" }} onPress={() => console.log('Pressed')}>
                    {/** Modifier le contact */}
                    <Icon name='brush' size={25} color={colors.primary} style={styles.actionButtonIcon} />
                    <Text style={styles.actionButtonText}> Modifier le contact </Text>
                </TouchableOpacity>
            </View>

            {/** Zone de médias communs */}
            <View style={styles.commonMediaContainer}>

                <Text style={styles.commonMediaText}> Aucune Photos & Vidéos pour le moment </Text>

            </View>

            {/** Zone danger */}
            <View style={[styles.dangerousActionButtonsContainer]}>
                <TouchableOpacity style={styles.dangerousActionButton} contentStyle={{ flexDirection: "column" }} onPress={() => console.log('Pressed')}>
                    {/** Bloquer le contact */}
                    <Icon name="remove-circle" size={25} color={colors.redAlert} style={styles.actionButtonIcon} />
                    <Text style={styles.dangerousActionButtonText}> Bloquer le contact </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dangerousActionButton} contentStyle={{ flexDirection: "column" }} onPress={() => console.log('Pressed')}>
                    {/** Supprimer le contact */}
                    <Icon name='trash' size={25} color={colors.redAlert} style={styles.actionButtonIcon} />
                    <Text style={styles.dangerousActionButtonText}> Supprimer le contact </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dangerousActionButton} contentStyle={{ flexDirection: "column" }} onPress={() => console.log('Pressed')}>
                    {/** Signaler le contact */}
                    <Icon name='warning' size={25} color={colors.redAlert} style={styles.actionButtonIcon} />
                    <Text style={styles.dangerousActionButtonText}> Signaler le contact </Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 10,
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
    divider: {
        display: 'flex',
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 10,
        paddingLeft: 20,
    },


    infosContainer: {
        display: "flex",
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        height: 250,
        justifyContent: 'center',
        width: "95%",
        paddingHorizontal: 10,
        backgroundColor: colors.pureWhite,
        elevation: 1,
        borderRadius: 10,
    },
    profilImage: {
        width: 130,
        height: 130,
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
    actionButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.pureWhite,
        elevation: 1,
        width: '95%',
        paddingHorizontal: 10,
        height: 110,
        paddingTop: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    actionButton: {
        flexDirection: "column",
        width: "31%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: colors.secondary_btn_bg,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary_200,
    },
    actionButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.primary_200,
    },
    commonMediaContainer: {
        display: "flex",
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        height: 280,
        justifyContent: 'center',
        width: "95%",
        paddingHorizontal: 10,
        backgroundColor: colors.pureWhite,
        elevation: 1,
        borderRadius: 10,
    },

    dangerousActionButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.pureWhite,
        elevation: 1,
        width: '95%',
        paddingHorizontal: 10,
        height: 110,
        paddingTop: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    dangerousActionButton: {
        flexDirection: "column",
        width: "31%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.redAlert,
        backgroundColor: colors.alertButtonBg,
    },
    dangerousActionButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.redAlert,
    },
});

export default UserProfileScreen;