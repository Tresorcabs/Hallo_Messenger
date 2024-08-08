import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Platform } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import HeaderComponent from '../../components/HeaderComponent'
import CustomDivider from '../../components/CustomDivider';
import myProfile from '../../assets/my.jpg';
import colors from '../../components/colors';

export default function GroupeScreen() {
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={colors.primary} />

        {/** Header Component */}
        <HeaderComponent myProfile={myProfile}
          avatarSize={32}
          headerTextStyle={styles.headerTextStyle}
          headerText="Groupes"
          headerStyle={[styles.headerStyle,
          Platform.OS == "ios" ? { height: "10%", paddingHorizontal: 15, marginTop: "5%", marginBottom: 5 }
            : { height: "9%", paddingHorizontal: 15, marginTop: "5%", marginBottom: 5 }]}
          avatarContainerStyle={styles.avatarContainerStyle} />



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
})