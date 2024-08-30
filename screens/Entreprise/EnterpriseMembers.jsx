import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import placeholderProfile from "../../assets/placeholder_avatar.png";
import profil1 from "../../assets/profil1.jpg";
import profil2 from "../../assets/profil2.jpg";
import profil3 from "../../assets/profil3.jpg";
import CustomSettingButton from '../../components/CustomSettingButton';
import colors from '../../components/colors';
import CustomSearchBarTwo from '../../components/CustomSearchBarTwo';
import { EntrepriseDataProvider } from '../../Contexts/EntrepriseDataContext';

const EnterpriseMembers = () => {

    // Données des membres de l'Entreprise

    const MembersData = [
        { memberId: 1, name: "Kalidou Koulibaly", profile: profil1, Bio: "Je suis Manager ", memberSince: "10/10/2023", userRole: "Admin" },
        { memberId: 2, name: "Rasmus Leerdof ", profile: profil3, Bio: "Je suis Programmeur", memberSince: "10/10/2023", userRole: "Member" },
        { memberId: 3, name: "Linus Torvalds", profile: profil2, Bio: "Je suis Programmeur", memberSince: "10/10/2023", userRole: "Member" },
        { memberId: 4, name: "Patrick Jane", profile: profil1, Bio: "Je suis marketeur", memberSince: "10/10/2023", userRole: "Member" },
        { memberId: 5, name: "Ryan Reenolds", profile: profil3, Bio: "Hello World", memberSince: "10/10/2023", userRole: "Member" },
        { memberId: 6, name: "Stanley Omah", profile: profil2, Bio: "Hello World", memberSince: "10/10/2023", userRole: "Member" },
    ];

    const countMembers = MembersData.length;
    const { updateGeneralData } = useContext(EntrepriseDataProvider);

    useEffect(() => {
        updateGeneralData({ countMembers: countMembers })
    }, []);

    const renderMember = ({ item }) => {
        return (
            <TouchableOpacity style={styles.memberContainer}>
                {/** MemberProfile */}
                <View style={styles.memberProfileContainer}>
                    <Image source={item.profile} style={styles.memberProfile} />
                </View>

                {/** Infos du membre  */}
                {/** Nom et bio du membre*/}
                <View style={styles.memberInfos}>
                    <View style={styles.memberNameContainer}>
                        <Text style={styles.memberName}>{item.name}</Text>
                        {/** Indicateur du rôle du membre */}
                        {
                            item.userRole === "Admin" ?
                                <Text style={styles.userRoleIndicator}>[ {item.userRole} ]</Text>
                                :
                                null
                        }
                    </View>
                    <Text style={styles.memberBio}>{item.Bio}</Text>
                </View>

                {/** bouton pour les options */}
                <TouchableOpacity>
                    <CustomSettingButton iconColor={colors.pureBlack} iconSize={30} buttonStyle={styles.settingButtonStyle} />
                </TouchableOpacity>

            </TouchableOpacity>
        )
    };

    // Rendu de la liste des membres de l'entreprise 
    return (
        <View style={styles.container}>

            {/** Barre de recherche */}
            <View style={styles.headerDuMenu}>
                <CustomSearchBarTwo
                    searchBarButtonStyle={{ position: "absolute", right: 15, borderRadius: 50, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: colors.secondary_btn_bg, elevation: 3 }}
                    searchBarIconButtonStyle={colors.primary_200}
                    searchBarStyle={{ height: 45, width: "90%", position: "absolute", paddingLeft: 10, borderRadius: 50, }}
                    searchBarPlaceholder="Rechercher..."
                    searchBarInputStyle={{
                        height: 45,
                        width: "95%",
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


            {/** Liste des membres de l'entreprise */}
            <FlatList
                data={MembersData}
                renderItem={renderMember}
                keyExtractor={(item) => item.memberId}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pureWhite,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    memberContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 10,
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 0.7,
    },
    memberProfileContainer: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "blue"
    },
    memberProfile: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    memberInfos: {
        flex: 1,
    },
    memberNameContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    memberName: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 5,
    },
    memberBio: {
        fontSize: 14,
        fontWeight: "300",
    },
    userRoleIndicator: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.primary,
    },
    settingButtonStyle: {
        backgroundColor: colors.secondary_btn_bg,
        padding: 5,
        borderRadius: 5,
    },
    headerDuMenu: {
        paddingVertical: 5,
        paddingTop: 15,
        marginBottom: 30,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",

    },
})
export default EnterpriseMembers