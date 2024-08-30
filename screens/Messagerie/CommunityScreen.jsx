import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import HeaderComponent from '../../components/HeaderComponent'
import CustomDivider from '../../components/CustomDivider';
import myProfile from '../../assets/my.jpg';
import colors from '../../components/colors';
import DataContainer from '../../components/DataContainer'
import CustomSearchBar from '../../components/CustomSearchBar'
import { useNavigation } from '@react-navigation/native'
import placeholderGroup from '../../assets/placeholder_group.jpg';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomSearchBarTwo from '../../components/CustomSearchBarTwo'

export default function CommunityScreen() {

  const navigation = useNavigation();

  // Community Datas

  const communitiesData = [
    { id: 1, name: "F-Society", logo: placeholderGroup, lastPost: "Hello World", members: 5, posts: 10, lastPostDate: "10:00", lastPostUser: "John Doe", lastPostUserAvatar: myProfile, isCommunity: true },
    { id: 2, name: "Afriland ", logo: placeholderGroup, lastPost: "We are going to Africa", members: 5, posts: 10, lastPostDate: "10:00", lastPostUser: "Eric Doe", lastPostUserAvatar: myProfile, isCommunity: true },
    { id: 3, name: "Tunisia", logo: placeholderGroup, lastPost: "Hello World", members: 5, posts: 10, lastPostDate: "10:00", lastPostUser: "John Doe", lastPostUserAvatar: myProfile, isCommunity: true },
    { id: 4, name: "Sudan", logo: placeholderGroup, lastPost: "Hello World", members: 5, posts: 10, lastPostDate: "10:00", lastPostUser: "John Doe", lastPostUserAvatar: myProfile, isCommunity: true },
    { id: 5, name: "Algeria", logo: placeholderGroup, lastPost: "Hello World", members: 5, posts: 10, lastPostDate: "10:00", lastPostUser: "John Doe", lastPostUserAvatar: myProfile, isCommunity: true },
    { id: 6, name: "Egypt", logo: placeholderGroup, lastPost: "Hello World", members: 5, posts: 10, lastPostDate: "10:00", lastPostUser: "John Doe", lastPostUserAvatar: myProfile, isCommunity: true },
  ];



  const renderCommunity = ({ item }) => {
    return (
      <TouchableOpacity style={{ width: "88%", }} onPress={() => navigation.navigate("ChatScreen", { communityId: item.id, nom: item.name, profile: item.logo, members: item.members, isCommunity: item.isCommunity })}>
        <View style={{ flexDirection: "row", alignItems: "center", padding: 10, gap: 10, }}>
          <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center" }}>
            <Image source={item.logo} style={{ width: 50, height: 50, borderRadius: 50 }} />

            <View style={{ position: "absolute", bottom: 0, right: 0, width: 15, height: 15, borderRadius: 50, backgroundColor: colors.pureWhite, justifyContent: "center", alignItems: "center", }}>
              <MaterialIcons name="verified" size={15} color={colors.statutIndicator} style={styles.verifiedIndicator} />
            </View>
          </View>

          <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: 10, width: "100%" }}>
            <View style={{ height: 60, flexDirection: 'column', justifyContent: 'space-evenly', flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: colors.pureBlack, fontWeight: "500" }}>{item.lastPost}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 12, color: colors.pureBlack, fontWeight: "300" }}>{item.lastPostDate}</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    )
  };

  return (

    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.primary, paddingLeft: 10, alignContent: "center", justifyContent: "center", }}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={colors.primary} />

        {/** Header Component */}
        <HeaderComponent myProfile={myProfile}
          avatarSize={32}
          headerTextStyle={styles.headerTextStyle}
          headerText="Communautés"
          headerStyle={[styles.headerStyle,
          Platform.OS == "ios" ? { height: "10%", paddingHorizontal: 15, marginTop: "5%", marginBottom: 5 }
            : { height: "9%", paddingHorizontal: 15, marginTop: "5%", marginBottom: 5 }]}
          avatarContainerStyle={styles.avatarContainerStyle} />

        {/** Container des groupes de discussion */}
        <DataContainer>

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

          {/** Liste des communautés */}

          <FlatList
            data={communitiesData}
            renderItem={renderCommunity}
            keyExtractor={item => item.id}
          />
        </DataContainer>

      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({
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
    paddingVertical: 5,
    paddingTop: 15,
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",

  },
  verifiedIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
})