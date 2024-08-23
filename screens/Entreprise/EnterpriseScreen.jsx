import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/HeaderComponent';
import colors from '../../components/colors';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomSearchBar from '../../components/CustomSearchBar';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EnterpriseScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <View style={styles.container}>

        <StatusBar style="light" backgroundColor={colors.primary} />

        {/** Header Component */}
        <HeaderComponent
          avatarSize={32}
          headerTextStyle={styles.headerTextStyle}
          headerText="Entreprise"
          headerStyle={[styles.headerStyle,
          Platform.OS == "ios" ? { height: "10%", paddingHorizontal: 15, marginTop: "5%" }
            : { height: "9%", paddingHorizontal: 15, marginTop: "5%" }]}
          avatarContainerStyle={styles.avatarContainerStyle} />

        {/** ---------------------------------------------------------- */}

        {/** Menu Principal */}
        <View style={styles.MenuPrincipal}>
          <View style={styles.headerDuMenu}>
            {/** Texte Menu */}
            <Text style={styles.NomMenu}>Menu Principal </Text>

            {/** Barre de recherche */}

            <CustomSearchBar
              searchBarButtonStyle={{ position: "absolute", right: 15, borderRadius: 50, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: colors.secondary_btn_bg, elevation: 3 }}
              searchBarIconButtonStyle={colors.primary_200}
              searchBarStyle={{ height: 45, width: "85%", position: "absolute", borderRadius: 50, }}
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
          <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 10, height: "85%" }}>
            <View style={styles.menuOptionView}>

              <TouchableOpacity style={[styles.menuOption, { backgroundColor: colors.PersonnelButtonBg, }]}>
                <Icon name="body" size={30} color={colors.PersonnelTextColor} />
                <Text style={{ fontWeight: "bold", color: colors.PersonnelTextColor }}>Personnel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.menuOption, { backgroundColor: colors.CommunicationButtonBg, }]}>
                <Icon name="chatbox-ellipses" size={30} color={colors.CommunicationTextColor} />
                <Text style={{ fontWeight: "bold", color: colors.CommunicationTextColor }}>Communication</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuOptionView}>
              <TouchableOpacity style={[styles.menuOption, { backgroundColor: colors.MarketingButtonBg, }]}>
                <Icon name="chatbox-ellipses" size={30} color={colors.CommunicationTextColor} />
                <Text style={{ fontWeight: "bold", color: colors.CommunicationTextColor }}>Marketing</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.menuOption, { backgroundColor: colors.StatisticsButtonBg, }]}>
                <Icon name="chatbox-ellipses" size={30} color={colors.CommunicationTextColor} />
                <Text style={{ fontWeight: "bold", color: colors.CommunicationTextColor }}>Statistiques</Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>

        {/** ---------------------------------------------------------- */}

        {/** Menu Principal */}
        <View style={styles.MenuPrincipal}>
          <View style={styles.headerDuMenu}>
            {/** Texte Menu */}
            <Text>Activités / Tâches </Text>

            {/** Liste des Tâches */}

          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  )
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
  },
  MenuPrincipal: {
    height: 350,
    backgroundColor: colors.pureWhite,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  NomMenu: {
    fontSize: 20,
    fontWeight: "500",
  },
  menuOptionView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuOption: {
    height: "85%",
    width: "45%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 20,
    elevation: 3,


  }
});