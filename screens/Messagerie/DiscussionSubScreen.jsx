import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, FlatList, Keyboard, Pressable, Dimensions } from 'react-native'
import React, { useState, useRef, useCallback } from 'react';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS
} from "react-native-reanimated";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import colors from '../../components/colors';
import myProfile from '../../assets/my.jpg';
import placeholderProfile from '../../assets/placeholder_avatar.png';
import profil1 from '../../assets/profil1.jpg';
import profil2 from '../../assets/profil2.jpg';
import profil3 from '../../assets/profil3.jpg';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import discussionsPlaceHolder from '../../assets/New-message-bro.png';




export default function DiscussionSubScreen() {

  const navigation = useNavigation();

  const discussionsData = [
    { id: '1', senderProfile: profil1, statut: "En ligne", senderName: 'Romy', senderPhone: "+237 654 28 55 30", dernierMessage: 'Salut toi ! ', time: '14 : 00', },
    { id: '2', senderProfile: "", statut: "Hors ligne", senderName: '', senderPhone: "+237 698 24 25 36", dernierMessage: 'La marchandise à été vendue avec succès mon chaud on peut dèja se faire plaisir  ! ', time: '13 : 20', },
    { id: '3', senderProfile: profil3, statut: "Hors ligne", senderName: 'Louane', senderPhone: "+237 696 25 25 42", dernierMessage: 'Tu es un chef ', time: '13 : 45', },
    { id: '4', senderProfile: profil2, statut: "En ligne", senderName: 'Ariane ', senderPhone: "+237 677 54 12 26", dernierMessage: 'Je t\'adore', time: '13 : 20', },
    { id: '5', senderProfile: "", statut: "En ligne", senderName: 'Andy', senderPhone: "+237 698 10 46 36", dernierMessage: 'Je veux continuer avec kivyMD ', time: '13 : 08', },
    { id: '6', senderProfile: profil3, statut: "Hors ligne", senderName: 'Emilie', senderPhone: "+237 696 20 25 53", dernierMessage: 'Salut toi ! ', time: '12 : 45', },
    { id: '7', senderProfile: profil2, statut: "En ligne", senderName: '', senderPhone: "+237 697 27 23 32", dernierMessage: 'La marchandise à été vendue avec succès ! ', time: '11 : 06', },
    { id: '8', senderProfile: profil1, statut: "Hors ligne", senderName: 'Fred', senderPhone: "+237 699 14 22 36", dernierMessage: 'Tu es un chef ', time: '10 : 00', },
    { id: '9', senderProfile: profil3, statut: "En ligne", senderName: 'Rose ', senderPhone: "+237 695 34 35 36", dernierMessage: 'Je t\'adore', time: '09 : 30', },
    { id: '10', senderProfile: profil2, statut: "En ligne", senderName: '', senderPhone: "+237 653 34 42 36", dernierMessage: 'Je veux continuer avec kivyMD ', time: '07 : 08', },
  ]


  const renderItem = ({ item }) =>
    // Composant d'une discussion
    <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 10 }}>

      {/** ---------------------------------------------------------- */}

      <TouchableOpacity style={{ flexDirection: "row", paddingVertical: 5, alignItems: "center", gap: 20, width: "100%", borderBottomColor: "#f0f0f0", borderBottomWidth: 0.7, overflow: 'hidden' }}
        onPress={() => navigation.navigate('ChatScreen', { discussionId: item.id, nom: item.senderName, phoneNumber: item.senderPhone, profile: item.senderProfile, statut: item.statut })}
      >

        {/** Profil image */}
        <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 50 }} onPress={() => navigation.navigate("userProfile", { Nom: item.senderName, phoneNumber: item.senderPhone, profil: item.senderProfile, statut: item.statut })}>

          {!item.senderProfile ?
            <Image source={placeholderProfile} style={{ width: "100%", height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 10 }} />
            :
            <Image source={item.senderProfile} style={{ width: "100%", height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 10 }} />}

          {/** statut indicator */}
          <View className="absolute bottom-0 right-0 w-3 h-3 rounded-full" style={{ borderColor: colors.statutIndicatorBorder, borderWidth: 1.5, backgroundColor: item.statut === "En ligne" ? colors.statutIndicator : "grey" }} />

        </TouchableOpacity>


        {/** ---------------------------------------------------------- */}

        {/** Sender Name or number */}
        <View className="flex-col w-full gap-2 overflow-x-hidden">

          <Text className="font-semibold text-black" style={{ fontSize: 18 }}>{item.senderName === "" ? item.senderPhone : item.senderName}</Text>

          {/** Message */}
          <View className="overflow-hidden">
            <Text className="font-light text-black overflow-x-clip" style={{ maxWidth: "70%", }}>{item.dernierMessage.length > 40 ? item.dernierMessage.substring(0, 40) + '...' : item.dernierMessage}</Text>
          </View>
          {/** Time */}
          <Text className="text-black font-extralight" style={{ position: "absolute", right: 100, fontSize: 12, }}>{item.time}</Text>

        </View>
      </TouchableOpacity>

    </View>

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const translateX = useSharedValue(0); // Commence hors écran à droite
  const textInputRef = useRef(null);
  const SEARCH_BUTTON_WIDTH = 2;
  const { width } = Dimensions.get('window');

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  });
  const toggleSearchBar = () => {

    if (isSearchBarOpen && !searchText) {
      // Fermer seulement si le TextInput est vide
      closeSearchBar();
    } else if (!isSearchBarOpen) {
      // Ouvrir le TextInput
      openSearchBar();
    }

  };

  const openSearchBar = () => {

    // Animation d'ouverture
    translateX.value = withTiming(0 - SEARCH_BUTTON_WIDTH, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }, () => {
      // Lorsque le textInput est affiche, il est focus
      runOnJS(focusSearchBarInput)();
    });

    setIsSearchBarOpen(true);
  };

  const closeSearchBar = () => {
    Keyboard.dismiss();
    // Animation de fermeture
    translateX.value = withTiming(0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
    if (searchText === '') {
      setIsSearchBarOpen(false);
    }
  };

  const focusSearchBarInput = useCallback(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);
  const handleTextChangeOnSearchBar = (text) => {
    setSearchText(text);
    // ferme si le contenu est vide 
    if (text == '' && !isSearchBarOpen) {
      closeSearchBar();
    }
  };

  const handleBlurSearchBar = (text) => {
    setSearchText(text);
    if (text === '') {
      closeSearchBar();
    }
  };


  const [filterBtnIsFocused, setFilterBtnIsFocused] = useState(true);

  const filterDiscussion = () => {
    setFilterBtnIsFocused(!filterBtnIsFocused)
  }


  {/** ------------ Application Principale -------------  */ }
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Pressable onPress={closeSearchBar}>
          <StatusBar style="light" />
          <View className="flex-col items-center w-full h-full bg-primary">


            {/** Header */}
            <View className="flex-row items-center content-center justify-between w-full " style={{ height: "10%", paddingHorizontal: 15, marginTop: 20, marginBottom: -10, backgroundColor: colors.smokeBlack }}>
              <Text className="font-bold text-white " style={{ fontSize: 28 }}>
                Hallo Messenger
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }} >
                {/**Profil image */}
                <TouchableOpacity>
                  <Image source={myProfile} style={{ width: 30, height: 30, borderRadius: 50 }} />
                </TouchableOpacity>

                {/** Settings button */}
                <TouchableOpacity>
                  <Icon name="ellipsis-vertical" size={30} color="white" />
                </TouchableOpacity>
              </View>

            </View>


            {/** Discussions container */}
            <Animated.View
              entering={FadeInDown.delay(250).duration(5000).springify()}
              className="flex-col items-center content-center justify-between w-full pt-6 pb-4 bg-white"
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                width: "98%",
                height: "95%",
                shadowColor: "#000",
                zIndex: -100,
              }}
            >


              {/** search bar & Filter buttons */}





              <View style={{ height: 50, paddingHorizontal: 10 }} className="flex-row items-center content-center w-full">

                {/** Filter buttons */}

                <View style={{ flexDirection: "row", alignItems: "center", gap: 15, width: "35%" }} >

                  {/**Filter button: Toutes les discussions */}
                  <TouchableOpacity onPress={filterDiscussion} style={{ borderRadius: 50, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: filterBtnIsFocused ? colors.primary_200 : colors.secondary_btn_bg }}>
                    <Icon name="grid" size={20} style={{ color: filterBtnIsFocused ? colors.secondary_btn_bg : colors.primary }} />
                  </TouchableOpacity>


                  {/**Filter button: Non lue */}
                  <TouchableOpacity onPress={filterDiscussion} style={{ borderRadius: 50, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: !filterBtnIsFocused ? colors.primary_200 : colors.secondary_btn_bg }}>

                    <Icon name="mail-unread" size={20} style={{ color: !filterBtnIsFocused ? colors.secondary_btn_bg : colors.primary_200 }} />
                  </TouchableOpacity>

                </View>

                {/** ---------------------------------------------------------- */}

                {/** search bar */}

                <TouchableOpacity style={{ position: "absolute", right: 15, borderRadius: 50, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: colors.secondary_btn_bg, elevation: 3 }} onPress={toggleSearchBar}>
                  {
                    isSearchBarOpen
                      ? //Close button
                      <Icon name="close" size={25} color={colors.primary_200} />
                      : //search button
                      <Icon name="search" size={25} color={colors.primary_200} />

                  }
                </TouchableOpacity>

                {isSearchBarOpen && <Animated.View style={[{ height: 45, width: "90%", position: "absolute", paddingLeft: 10, borderRadius: 50, }, animatedStyles]}><TextInput
                  placeholder="Rechercher"
                  ref={textInputRef}
                  value={searchText}
                  onChangeText={handleTextChangeOnSearchBar}
                  style={{
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
                  }} />
                </Animated.View>
                }

              </View>

              {/** ---------------------------------------------------------- */}

              {/** Messages view */}
              <View className="flex-col items-center content-center " style={{ gap: 15, paddingTop: 20, paddingBottom: 40, width: "100%", height: "98%" }}>

                {discussionsData.length == 0 ?

                  /** No discussions message */

                  <View className="flex-col items-center content-center justify-between" style={{ gap: 10, paddingBottom: 10, width: "100%", height: "90%" }}>

                    <View className="flex-col items-center content-center justify-center " style={{ gap: 5, paddingBottom: 20, width: "80%", height: "80%" }}>
                      <Image source={discussionsPlaceHolder} style={{ width: "85%", height: "85%" }} />
                      <Text className="font-semibold" style={{ fontSize: 20, color: colors.smokeBlack, fontWeight: '400' }}>Vous n'avez aucune discussion</Text>
                    </View>

                    <View>
                      <TouchableOpacity style={{ borderRadius: 10, paddingHorizontal: 25, paddingVertical: 20, backgroundColor: colors.primary_200, elevation: 3 }}>
                        <Text className="font-semibold " style={{ fontSize: 18, color: colors.secondary_btn_bg }}>Créer une nouvelle discussion</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  /** discussions list */

                  : <FlatList
                    data={discussionsData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{
                      width: "100%",
                    }}
                  />
                }


              </View>

              {/** New discussion Button */}

              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 50,
                  right: 20,
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.primary_200,
                  elevation: 3
                }}>
                <Icon name="add" size={35} color={colors.secondary_btn_bg} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Pressable>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}