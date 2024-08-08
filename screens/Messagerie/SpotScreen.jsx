import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Platform } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import HeaderComponent from '../../components/HeaderComponent'
import CustomDivider from '../../components/CustomDivider';
import myProfile from '../../assets/my.jpg';
import colors from '../../components/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SpotScreen() {
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={colors.primary} />

        {/** Header Component */}
        <HeaderComponent myProfile={myProfile}
          avatarSize={32}
          headerTextStyle={styles.headerTextStyle}
          headerText="Spots"
          headerStyle={[styles.headerStyle,
          Platform.OS == "ios" ? { height: "10%", paddingHorizontal: 15, marginTop: "5%", marginBottom: 5 }
            : { height: "9%", paddingHorizontal: 15, marginTop: "5%", marginBottom: 5 }]}
          avatarContainerStyle={styles.avatarContainerStyle} />

        {/** Spot container */}

        <View style={styles.spotContainer}>


          {/** spot du user ou son statut */}
          <View style={styles.userSpotContainer}>
            <TouchableOpacity style={styles.userSpotContainerStyle}>
              <Image source={myProfile} style={styles.userSpotProfile} />
              <Icon name="camera" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/** Diviseur */}
          <CustomDivider text="Spots récents" containerStyle={styles.dividerContainer} textStyle={styles.dividerText} barStyle={styles.dividerBar} />

        </View>


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


  userSpotContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 10
  },
  userSpotContainerStyle: {
    display: "flex",
    width: "10%",
    paddingHorizontal: 10,
  },
  userSpotProfile: {
    width: 80,
    height: 80,
    borderRadius: 100
  }
})