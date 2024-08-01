import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, FlatList, Keyboard } from 'react-native'
import React, { useState } from 'react';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import colors from '../../components/colors';
import myProfile from '../../assets/my.jpg';
import profil1 from '../../assets/profil1.jpg';
import profil2 from '../../assets/profil2.jpg';
import profil3 from '../../assets/profil3.jpg';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DiscussionSubScreen() {

  const navigation = useNavigation();

  const discussionsData = [
    { id: '1', senderProfile: profil1, senderName: 'Romy', dernierMessage: 'Salut toi ! ', time: '14 : 00', },
    { id: '2', senderProfile: profil2, senderName: 'Emmanuel', dernierMessage: 'La marchandise à été vendue avec succès mon chaud on peut dèja se faire plaisir  ! ', time: '13 : 20', },
    { id: '3', senderProfile: profil3, senderName: 'Stéphane', dernierMessage: 'Tu es un chef ', time: '13 : 45', },
    { id: '4', senderProfile: profil2, senderName: 'Ariane ', dernierMessage: 'Je t\'adore', time: '13 : 20', },
    { id: '5', senderProfile: profil1, senderName: 'Andy', dernierMessage: 'Je veux continuer avec kivyMD ', time: '13 : 08', },
    { id: '6', senderProfile: profil3, senderName: 'Romy', dernierMessage: 'Salut toi ! ', time: '12 : 45', },
    { id: '7', senderProfile: profil2, senderName: 'Emmanuel', dernierMessage: 'La marchandise à été vendue avec succès ! ', time: '11 : 06', },
    { id: '8', senderProfile: profil1, senderName: 'Stéphane', dernierMessage: 'Tu es un chef ', time: '10 : 00', },
    { id: '9', senderProfile: profil3, senderName: 'Ariane ', dernierMessage: 'Je t\'adore', time: '09 : 30', },
    { id: '10', senderProfile: profil2, senderName: 'Andy', dernierMessage: 'Je veux continuer avec kivyMD ', time: '07 : 08', },
  ]


  const renderItem = ({ item }) =>
    // Composant d'une discussion
    <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 10 }}>

      {/** ---------------------------------------------------------- */}

      <TouchableOpacity style={{ flexDirection: "row", paddingVertical: 5, alignItems: "center", gap: 20, width: "100%", borderBottomColor: "#f0f0f0", borderBottomWidth: 0.7, overflow: 'hidden' }}
        onPress={() => navigation.navigate('ChatScreen', { discussionId: item.id, nom: item.senderName, profile: item.senderProfile })}
      >

        {/** Profil image */}
        <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 50 }}>
          <Image source={item.senderProfile} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
        </TouchableOpacity>

        {/** ---------------------------------------------------------- */}

        {/** Sender Name */}
        <View className="flex-col w-full gap-2 overflow-x-hidden">

          <Text className="font-semibold text-black" style={{ fontSize: 18 }}>{item.senderName}</Text>

          {/** Message */}
          <View className="overflow-hidden">
            <Text className="font-light text-black overflow-x-clip" style={{ maxWidth: "70%", }}>{item.dernierMessage.length > 50 ? item.dernierMessage.substring(0, 40) + '...' : item.dernierMessage}</Text>
          </View>
          {/** Time */}
          <Text className="text-black font-extralight" style={{ position: "absolute", right: 100, fontSize: 12, }}>{item.time}</Text>

        </View>
      </TouchableOpacity>

    </View>

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen)
  };

  const closeSearchBar = () => {
    if (!textInputRef.current?.props.value) {
      setIsSearchBarOpen(false);
    }
  };

  const startKeyboard = () => {
    Keyboard.show();
  }

  const textInputRef = React.useRef();

  const [filterBtnIsFocused, setFilterBtnIsFocused] = useState(true);

  const filterDiscussion = () => {
    setFilterBtnIsFocused(!filterBtnIsFocused)
  }


  {/** ------------ Application Principale -------------  */ }
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <View className="flex-col items-center w-full h-full bg-primary">


          {/** Header */}
          <View className="flex-row items-center content-center justify-between w-full " style={{ height: 100, paddingHorizontal: 15, marginTop: 20, marginBottom: -10 }}>
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
            className="flex-col items-center content-center justify-between w-full pt-6 pb-16 bg-white rounded-l-3xl h-5/6"
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              width: "99%",
              shadowColor: "#000",
              zIndex: -100,
            }}
          >


            {/** search bar & Filter buttons */}

            {/** Filter buttons */}

            <View style={{ flexDirection: "row", alignItems: "center", gap: 15, width: "50%" }} >

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

            <View style={{ height: 50, paddingHorizontal: 10, marginHorizontal: 10, }} className="flex-row items-center content-center w-full">
              <TouchableOpacity style={{ position: "absolute", right: 15, borderRadius: 50, padding: 10, backgroundColor: colors.secondary_btn_bg }} onPress={() => { toggleSearchBar(); startKeyboard(); }}>
                <Icon name="search" size={30} color={colors.primary_200} />
              </TouchableOpacity>

              {isSearchBarOpen && <><TextInput
                placeholder="Rechercher"
                ref={textInputRef}
                onPointerLeave={closeSearchBar}
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
              </>
              }

            </View>

            {/** ---------------------------------------------------------- */}

            {/** Messages view */}
            <View className="flex-col items-center content-center h-full" style={{ gap: 15, paddingTop: 20, paddingBottom: 20, width: "100%" }}>

              <FlatList
                data={discussionsData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{
                  width: "100%",
                }}
              />
            </View>

          </Animated.View>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}