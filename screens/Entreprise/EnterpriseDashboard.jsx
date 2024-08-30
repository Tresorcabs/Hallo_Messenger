import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/HeaderComponent';
import colors from '../../components/colors';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomSearchBar from '../../components/CustomSearchBar';
import profil1 from "../../assets/profil1.jpg";
import profil2 from "../../assets/profil2.jpg";
import profil3 from "../../assets/profil3.jpg";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function EnterpriseDashboard({ navigation }) {

    const taskData = [
        {
            id: "t1",
            taskName: "Réaliser la maquette du site vitrine",
            taskDescription: "Vous devrez réaliser la maquette de notre plateforme en ligne...",
            actorsProfiles: [profil1, profil2, profil3],
            taskStatus: "Done",
            expiringDate: "10/09/2024",
        },
        {
            id: "t2",
            taskName: "Réaliser la maquette du site vitrine",
            taskDescription: "Vous devrez réaliser la maquette de notre plateforme en ligne...",
            actorsProfiles: [profil1, profil2, profil3],
            taskStatus: "In progress",
            expiringDate: "10/09/2024",
        },
        {
            id: "t3",
            taskName: "Réaliser la maquette du site vitrine",
            taskDescription: "Vous devrez réaliser la maquette de notre plateforme en ligne...",
            actorsProfiles: [profil1, profil2, profil3],
            taskStatus: "In progress",
            expiringDate: "10/09/2024",
        },
        {
            id: "t4",
            taskName: "Réaliser la maquette du site vitrine",
            taskDescription: "Vous devrez réaliser la maquette de notre plateforme en ligne...",
            actorsProfiles: [profil1, profil2],
            taskStatus: "In progress",
            expiringDate: "10/09/2024",
        },

    ];

    //    récupération des données générales de l'entreprise à travers le contexte



    const renderTask = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.taskContainer}
                onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
            >
                <View style={styles.taskInfos}>
                    <View style={styles.taskNameContainer}>
                        <Text style={styles.taskName}>{item.taskName}</Text>
                        <Text style={styles.taskDescription}>{item.taskDescription}</Text>
                    </View>

                    {/** Status de la tâche (En cours, accomplie...) */}
                    <TouchableOpacity style={styles.taskStatusContainer}>
                        {item.taskStatus === "Done" ? (
                            <Icon name="checkmark-circle" size={20} color={colors.primary_200} />
                        ) : (
                            <Icon name="hourglass" size={20} color={colors.primary_200} />
                        )}
                    </TouchableOpacity>

                </View>




                <View style={styles.actorsProfilesContainer}>
                    {/** Date de fin de la tâche */}
                    <View style={styles.expiringDateContainer}>
                        <Icon name='timer-outline' size={17} color={colors.primary_200} style={{ opacity: 0.8 }} />
                        <Text style={styles.expiringDate}>{item.expiringDate}</Text>
                    </View>

                    <View style={styles.actorsProfiles}>
                        {/** Rendu dynamique des images des profils à partir de la liste d'acteurs */}
                        {item.actorsProfiles.map((profile, index) => (
                            <Image key={index} source={profile} style={styles.actorsProfile} />
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar style="light" backgroundColor={colors.primary} />

                {/** Header Component 
                <HeaderComponent
                    avatarSize={32}
                    headerTextStyle={styles.headerTextStyle}
                    headerText="Entreprise"
                    headerStyle={[styles.headerStyle,
                    Platform.OS == "ios" ? { height: "10%", paddingHorizontal: 15, marginTop: "5%" }
                        : { height: "9%", paddingHorizontal: 15, marginTop: "5%" }]}
                    avatarContainerStyle={styles.avatarContainerStyle} />*/}

                {/** ---------------------------------------------------------- */}

                {/** Menu Principal */}
                <View style={styles.MenuPrincipal}>
                    <View style={styles.headerDuMenu}>
                        {/** Texte Menu */}
                        <Text style={styles.NomMenu}>Données générales</Text>

                        {/** Barre de recherche */}

                        <CustomSearchBar
                            searchBarButtonStyle={{
                                position: "absolute",
                                right: 15,
                                borderRadius: 50,
                                width: 40,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: colors.secondary_btn_bg,
                                elevation: 3,
                            }}
                            searchBarIconButtonStyle={colors.primary_200}
                            searchBarStyle={{
                                height: 45,
                                width: "85%",
                                position: "absolute",
                                borderRadius: 50,
                            }}
                            searchBarPlaceholder="Rechercher..."
                            searchBarInputStyle={{
                                height: 45,
                                width: "100%",
                                backgroundColor: colors.secondary_btn_bg,
                                borderRadius: 50,
                                paddingHorizontal: 20,
                                elevation: 3,

                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                            }}
                        />
                    </View>

                    {/** Les options de menu */}
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 10,
                            height: 260,
                        }}
                    >
                        <View style={styles.menuOptionView}>
                            <TouchableOpacity
                                style={[
                                    styles.menuOption,
                                    { backgroundColor: colors.PersonnelButtonBg },
                                ]}
                                onPress={() => navigation.navigate("Membres")}
                            >
                                <Text style={styles.numbMembres}>20</Text>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: colors.PersonnelTextColor,
                                    }}
                                >
                                    Membres (actifs)
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.menuOption,
                                    { backgroundColor: colors.CommunicationButtonBg },
                                ]}
                                onPress={() => navigation.navigate("Projets")}
                            >
                                <Text style={styles.numbProjets}>
                                    50 <Text style={{ fontSize: 20 }}>/ 100</Text>
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: colors.CommunicationTextColor,
                                    }}
                                >
                                    Projets réalisés
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuOptionView}>
                            <TouchableOpacity
                                style={[
                                    styles.menuOption,
                                    { backgroundColor: colors.MarketingButtonBg },
                                ]}
                                onPress={() => navigation.navigate("Abonnés")}
                            >
                                <Text style={styles.numbAbonnés}>1340</Text>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: colors.MarketingTextColor,
                                    }}
                                >
                                    Abonnés de la communauté
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.menuOption,
                                    { backgroundColor: colors.StatisticsButtonBg },
                                ]}
                            >
                                <Text style={styles.numTest}>140</Text>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: colors.StatisticsTextColor,
                                    }}
                                >
                                    texte facultatif
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/** ---------------------------------------------------------- */}

                {/** Menu des activités */}
                <View style={styles.ActivityMenu}>
                    <View style={styles.headerDuMenu}>
                        {/** Texte Menu */}
                        <Text style={styles.NomMenu}>Activités / Tâches </Text>

                    </View>


                    {/** Liste des Tâches */}
                    <FlatList
                        data={taskData}
                        renderItem={renderTask}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTextStyle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white"
    },
    avatarContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    headerDuMenu: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    MenuPrincipal: {
        height: 350,
        backgroundColor: colors.pureWhite,
        marginBottom: 10,
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
    ActivityMenu: {
        height: 380,
        paddingVertical: 2,
        backgroundColor: colors.pureWhite,
        paddingHorizontal: 5,
    },
    NomMenu: {
        fontSize: 20,
        fontWeight: "500",
    },
    menuOptionView: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    menuOption: {
        height: "85%",
        width: "45%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        borderRadius: 20,
        elevation: 3,
    },
    numbMembres: {
        fontSize: 34,
        fontWeight: 'bold',
        color: colors.PersonnelTextColor,
    },
    numbProjets: {
        color: colors.CommunicationTextColor,
        fontSize: 34,
        fontWeight: 'bold',
    },
    numbAbonnés: {
        color: colors.MarketingTextColor,
        fontSize: 34,
        fontWeight: 'bold',
    },
    numTest: {
        color: colors.StatisticsTextColor,
        fontSize: 34,
        fontWeight: 'bold',
    },

    // style de la liste des activités / Tâches
    taskContainer: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 5,
        backgroundColor: colors.glassBlackBtn,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    taskInfos: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    taskNameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        gap: 10,
        marginVertical: 5,
    },
    taskName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskDescription: {
        fontSize: 12,
    },
    expiringDate: {
        fontWeight: "600",
        fontStyle: "italic",
        color: colors.primary_200,
        opacity: .6
    },
    expiringDateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    actorsProfilesContainer: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    actorsProfiles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actorsProfile: {
        width: 20,
        height: 20,
        borderRadius: 20,
        marginRight: -2,
    },

    taskStatusContainer: {
        width: 20,
        height: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

});