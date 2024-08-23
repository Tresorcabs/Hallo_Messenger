import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Platform, Animated, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import HeaderComponent from '../../../components/HeaderComponent'
import CustomDivider from '../../../components/CustomDivider';
import myProfile from '../../../assets/my.jpg';
import colors from '../../../components/colors';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ProgressBar } from 'react-native-paper'
import { useSpotContext } from '../../../Contexts/spotProvider'
import { CircularProgress } from 'react-native-circular-progress'
import { SpotVisualizer } from '../../../components/SpotVisualizer'

const { height, width } = Dimensions.get('window');
export default function SpotScreen() {

  const navigation = useNavigation();

  const SpotArr = [

    {
      id: 1,
      name: "Spot 1",
      description: "Description du spot 1",
      image: myProfile,
      heure: "14 : 13",

    },

    {
      id: 2,
      name: "Spot 2",
      description: "Description du spot 2",
      image: myProfile,
      heure: "14 : 13",

    },

    {
      id: 3,
      name: "Spot 3",
      description: "Description du spot 3",
      image: myProfile,
      heure: "14 : 13",
    },

    {
      id: 4,
      name: "Spot 4",
      description: "Description du spot 4",
      image: myProfile,
      heure: "14 : 13",
    },

    {
      id: 5,
      name: "Spot 5",
      description: "Description du spot 5",
      image: myProfile,
      heure: "14 : 13",

    },

    {
      id: 6,
      name: "Spot 6",
      description: "Description du spot 6",
      image: myProfile,
      heure: "14 : 13",
    },

    {
      id: 7,
      name: "Spot 7",
      description: "Description du spot 7",
      image: myProfile,
      heure: "14 : 13",
    },

    {
      id: 8,
      name: "Spot 8",
      description: "Description du spot 8",
      image: myProfile,
      heure: "14 : 13",
    },

    {
      id: 9,
      name: "Spot 9",
      description: "Description du spot 9",
      image: myProfile,
      heure: "14 : 13",
    },

    {
      id: 10,
      name: "Spot 10",
      description: "Description du spot 10",
      image: myProfile,
      heure: "14 : 13",
    },

  ];





  // On utilise notre hook personnalisé pour accéder au contexte

  const { spots, addSpot, spotVisualizerVisible, setSpotVisualizerVisible } = useSpotContext();
  const spotCount = spots.length;


  const otherSpotsRenderItem = ({ item }) =>
    // Composant d'un spot
    <TouchableOpacity style={{ width: "100%", paddingHorizontal: 10, marginTop: 10, display: "flex", flexDirection: "row", gap: 15, paddingVertical: 10, alignItems: "center", borderRadius: 10, borderBottomColor: "#000", borderBottomWidth: .1, }}>

      <TouchableOpacity>
        <Image source={item.image} style={styles.otherSpotProfile} />
      </TouchableOpacity>


      <View style={styles.otherSpotDetails}>
        <Text style={styles.otherSpotName}>{item.name}</Text>
        <Text style={styles.otherSpotMemo}>{item.description}</Text>

      </View>

      <Text style={styles.otherSpotTime}>{item.heure}</Text>
    </TouchableOpacity>


  const handleShowSpotVisualiser = () => {
    setSpotVisualizerVisible(!spotVisualizerVisible);
  }

  return (

    <GestureHandlerRootView style={{ flex: 1, }}>

      <StatusBar style="light" backgroundColor={colors.primary} />

      {/** Header Component */}
      <HeaderComponent myProfile={myProfile}
        avatarSize={32}
        headerTextStyle={styles.headerTextStyle}
        headerText="Spots"
        headerStyle={[styles.headerStyle,
        Platform.OS == "ios" ? { height: "10%", paddingHorizontal: 15, marginTop: "5%" }
          : { height: "9%", paddingHorizontal: 15, marginTop: "5%" }]}
        avatarContainerStyle={styles.avatarContainerStyle} />

      {/** Spot container */}

      <View style={styles.spotContainer}>


        {/** spot du user ou son statut */}


        <View style={styles.userSpotContainer}>

          {
            spotCount == 0 ?
              // Spot du user lorsqu'il n'a aucun spot
              <TouchableOpacity style={styles.userSpotButton} onPress={() => navigation.navigate("SpotSelector")}>
                <Image source={myProfile} style={styles.userSpotProfile} />
                <View style={styles.userSpotIconContainer}>
                  <Icon name="add" size={15} color={colors.secondary_btn_bg} />
                </View>
              </TouchableOpacity>

              :
              // Spot du user avec indicateur du nombre de statut

              <TouchableOpacity style={styles.userSpotButton2} onPress={handleShowSpotVisualiser}>

                <CircularProgress
                  size={80}
                  width={3}
                  fill={100}
                  progressValue={spotCount}
                  tintColor={colors.primary}
                  backgroundColor="transparent"
                  lineCap="round"
                  style={styles.userSpotProgress}
                />
                <Image source={myProfile} style={styles.userSpotProfile} />
              </TouchableOpacity>
          }

          <Text style={styles.spotUserName}>Votre spot</Text>
        </View>

        {/** Visualiser de spot */}
        <SpotVisualizer visible={spotVisualizerVisible} />

        {/** Diviseur */}
        <CustomDivider text="Spots récents" containerStyle={styles.dividerContainer} textStyle={styles.dividerTextStyle} barStyle={styles.dividerBar} />

        {/** Spots récents */}

        <FlatList
          data={SpotArr}
          renderItem={otherSpotsRenderItem}
          keyExtractor={item => item.id}
          style={styles.spotListContentContainer}
        />

        {/** Bouton pour ajouter un spot */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate("SpotSelector")}
        >
          <Icon name="camera" size={24} color={colors.pureWhite} />
        </TouchableOpacity>

      </View>

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

  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userSpotContainer: {
    flexDirection: "column",
    width: 100,
    gap: 8,
    alignItems: 'center',
    paddingVertical: 15,
  },
  userSpotButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    borderRadius: 100,
  },
  userSpotButton2: {
    width: 70,
    borderRadius: 100,
  },
  userSpotProfile: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  userSpotIconContainer: {
    padding: 5,
    borderRadius: 100,
    backgroundColor: colors.primary,
    position: "absolute",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    right: 0,
  },
  spotUserName: {
    alignSelf: "center",
  },

  dividerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  dividerTextStyle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.primary_bold,
    opacity: 0.7,
  },
  dividerBar: {
    backgroundColor: colors.primary_bold,
    width: "75%",
  },

  spotListContentContainer: {
    paddingHorizontal: 10,
    height: '67%',
    paddingVertical: 1,
  },
  otherSpotProfile: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  otherSpotDetails: {
    flexDirection: 'column',
    justifyContent: "space-between",
    height: 50,
    width: "65%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  otherSpotName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  otherSpotTime: {
    fontSize: 12,
  },

  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.pureWhite,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButton: {
    marginRight: 16,
  },
  stopButton: {
    marginRight: 16,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  spotPreviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotPreview: {
    width: width * 0.8,
    height: height * 0.6,
    resizeMode: 'contain',
  },
  spotPreviewText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  userSpotProgress: {
    position: 'absolute',
    bottom: 0,
    left: -5,
    right: 0,
    top: -5,
  },
})