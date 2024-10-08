import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Pressable,
  Dimensions,
  Platform,
  Modal
} from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import colors from "../../components/colors";
import myProfile from "../../assets/my.jpg";
import placeholderProfile from "../../assets/placeholder_avatar.png";
import profil1 from "../../assets/profil1.jpg";
import profil2 from "../../assets/profil2.jpg";
import profil3 from "../../assets/profil3.jpg";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import discussionsPlaceHolder from "../../assets/New-message-bro.png";
import { AnimatedFAB } from "react-native-paper";
import HeaderComponent from "../../components/HeaderComponent";
import CustomSearchBar from "../../components/CustomSearchBar";
import DataContainer from "../../components/DataContainer";
import ContactList from "../../components/ContactList";
import AddContactModal from "../../components/AddContactModal";
import * as Contacts from 'expo-contacts';

export default function DiscussionSubScreen() {
  const navigation = useNavigation();

  const discussionsData = [
    {
      id: "1",
      senderProfile: profil1,
      statut: "En ligne",
      senderName: "Romy",
      senderPhone: "+237 654 28 55 30",
      dernierMessage: "Salut toi ! ",
      time: "14 : 00",
    },
    {
      id: "2",
      senderProfile: "",
      statut: "Hors ligne",
      senderName: "",
      senderPhone: "+237 698 24 25 36",
      dernierMessage:
        "La marchandise à été vendue avec succès mon chaud on peut dèja se faire plaisir  ! ",
      time: "13 : 20",
    },
    {
      id: "3",
      senderProfile: profil3,
      statut: "Hors ligne",
      senderName: "Louane",
      senderPhone: "+237 696 25 25 42",
      dernierMessage: "Tu es un chef ",
      time: "13 : 45",
    },
    {
      id: "4",
      senderProfile: profil2,
      statut: "En ligne",
      senderName: "Ariane ",
      senderPhone: "+237 677 54 12 26",
      dernierMessage: "Je t'adore",
      time: "13 : 20",
    },
    {
      id: "5",
      senderProfile: "",
      statut: "En ligne",
      senderName: "Andy",
      senderPhone: "+237 698 10 46 36",
      dernierMessage: "Je veux continuer avec kivyMD ",
      time: "13 : 08",
    },
    {
      id: "6",
      senderProfile: profil3,
      statut: "Hors ligne",
      senderName: "Emilie",
      senderPhone: "+237 696 20 25 53",
      dernierMessage: "Salut toi ! ",
      time: "12 : 45",
    },
    {
      id: "7",
      senderProfile: profil2,
      statut: "En ligne",
      senderName: "",
      senderPhone: "+237 697 27 23 32",
      dernierMessage: "La marchandise à été vendue avec succès ! ",
      time: "11 : 06",
    },
    {
      id: "8",
      senderProfile: profil1,
      statut: "Hors ligne",
      senderName: "Fred",
      senderPhone: "+237 699 14 22 36",
      dernierMessage: "Tu es un chef ",
      time: "10 : 00",
    },
    {
      id: "9",
      senderProfile: profil3,
      statut: "En ligne",
      senderName: "Rose ",
      senderPhone: "+237 695 34 35 36",
      dernierMessage: "Je t'adore",
      time: "09 : 30",
    },
    {
      id: "10",
      senderProfile: profil2,
      statut: "En ligne",
      senderName: "",
      senderPhone: "+237 653 34 42 36",
      dernierMessage: "Je veux continuer avec kivyMD ",
      time: "07 : 08",
    },
  ];
  const DISCUSSION_LENGTH = discussionsData.length;

  const renderItem = ({ item }) => (
    // Composant d'une discussion
    <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 10 }}>
      {/** ---------------------------------------------------------- */}

      <TouchableOpacity
        style={{
          flexDirection: "row",
          paddingVertical: 5,
          alignItems: "center",
          gap: 20,
          width: "100%",
          borderBottomColor: "#f0f0f0",
          borderBottomWidth: 0.7,
          overflow: "hidden",
        }}
        onPress={() =>
          navigation.navigate("ChatScreen", {
            discussionId: item.id,
            nom: item.senderName,
            phoneNumber: item.senderPhone,
            profile: item.senderProfile,
            statut: item.statut,
          })
        }
      >
        {/** Profil image */}
        <TouchableOpacity
          style={{ width: 60, height: 60, borderRadius: 50 }}
          onPress={() =>
            navigation.navigate("userProfile", {
              Nom: item.senderName,
              phoneNumber: item.senderPhone,
              profil: item.senderProfile,
              statut: item.statut,
            })
          }
        >
          {!item.senderProfile ? (
            <Image
              source={placeholderProfile}
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 10,
              }}
            />
          ) : (
            <Image
              source={item.senderProfile}
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 10,
              }}
            />
          )}

          {/** statut indicator */}
          <View
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
            style={{
              borderColor: colors.statutIndicatorBorder,
              borderWidth: 1.5,
              backgroundColor:
                item.statut === "En ligne" ? colors.statutIndicator : "grey",
            }}
          />
        </TouchableOpacity>

        {/** ---------------------------------------------------------- */}

        {/** Sender Name or number */}
        <View className="flex-col w-full gap-2 overflow-x-hidden">
          <Text className="font-semibold text-black" style={{ fontSize: 18 }}>
            {item.senderName === "" ? item.senderPhone : item.senderName}
          </Text>

          {/** Message */}
          <View className="overflow-hidden">
            <Text
              className="font-light text-black overflow-x-clip"
              style={{ maxWidth: "70%" }}
            >
              {item.dernierMessage.length > 40
                ? item.dernierMessage.substring(0, 40) + "..."
                : item.dernierMessage}
            </Text>
          </View>
          {/** Time */}
          <Text
            className="text-black font-extralight"
            style={{ position: "absolute", right: 100, fontSize: 12 }}
          >
            {item.time}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const { width } = Dimensions.get("window");
  const flatListRef = React.useRef(null);
  const { flatLisLength, setFlatListLength } = useState(discussionsData.length);
  const [filterBtnIsFocused, setFilterBtnIsFocused] = useState(true);

  const filterDiscussion = () => {
    setFilterBtnIsFocused(!filterBtnIsFocused);
  };

  // Bouton de création d'une nouvelle discussion

  const [isExtended, setIsExtended] = React.useState(true);
  const onScroll = (event) => {
    const currentScrollPosition = event.nativeEvent?.contentOffset?.y; // On récupère la position du scroll actuelle
    const isScrollingUp =
      currentScrollPosition < (onScroll.lastScrollPosition || 0); // On compare la position actuelle avec la position précédente
    setIsExtended(false); // on compare la position du scroll avec 0

    onScroll.lastScrollPosition = currentScrollPosition; // On met a jour la position
  };

  /** Gestion du modal des contacts  */
  const [isContactsModalVisible, setIsContactsModalVisible] = useState(false);
  const [isAddContactModalVisible, setIsAddContactModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);

  // Fonction de création d'une nouvelle discussion
  const newDiscussion = () => {
    setIsContactsModalVisible(true);
  };
  const hideContactsModal = () => {
    setIsContactsModalVisible(false);
  };

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();
      if (data.length > 0) {
        setContacts(data);
      }
    }
  };


  const handleAddContact = () => {
    fetchContacts(); // On refresh la liste des contacts
  }

  {
    /** ------------ Application Principale -------------  */
  }
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Pressable>
          <StatusBar style="light" backgroundColor={colors.primary} />
          <View className="flex-col items-center w-full h-full bg-primary">
            {/** Header component */}

            <HeaderComponent
              myProfile={myProfile}
              avatarSize={32}
              headerTextStyle={styles.headerTextStyle}
              headerText="Hallo Messenger"
              headerStyle={[
                styles.headerStyle,
                Platform.OS == "ios"
                  ? { height: "10%", paddingHorizontal: 15, marginTop: "5%" }
                  : { height: "9%", paddingHorizontal: 15, marginTop: "5%" },
              ]}
              avatarContainerStyle={styles.avatarContainerStyle}
            />

            {/** Discussions container */}
            <DataContainer>
              {/** search bar & Filter buttons */}

              <View
                style={{ height: 50, paddingHorizontal: 10 }}
                className="flex-row items-center content-center w-full"
              >
                {/** Filter buttons */}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                    width: "35%",
                  }}
                >
                  {/**Filter button: Toutes les discussions */}
                  <TouchableOpacity
                    onPress={filterDiscussion}
                    style={{
                      borderRadius: 50,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: filterBtnIsFocused
                        ? colors.primary_200
                        : colors.secondary_btn_bg,
                    }}
                  >
                    <Icon
                      name="grid"
                      size={20}
                      style={{
                        color: filterBtnIsFocused
                          ? colors.secondary_btn_bg
                          : colors.primary,
                      }}
                    />
                  </TouchableOpacity>

                  {/**Filter button: Non lue */}
                  <TouchableOpacity
                    onPress={filterDiscussion}
                    style={{
                      borderRadius: 50,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: !filterBtnIsFocused
                        ? colors.primary_200
                        : colors.secondary_btn_bg,
                    }}
                  >
                    <Icon
                      name="mail-unread"
                      size={20}
                      style={{
                        color: !filterBtnIsFocused
                          ? colors.secondary_btn_bg
                          : colors.primary_200,
                      }}
                    />
                  </TouchableOpacity>
                </View>

                {/** ---------------------------------------------------------- */}

                {/** search bar */}
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
                    width: "90%",
                    position: "absolute",
                    paddingLeft: 10,
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

              {/** ---------------------------------------------------------- */}

              {/** Messages view */}
              <View
                className="flex-col items-center content-center "
                style={{
                  gap: 15,
                  paddingTop: 20,
                  paddingBottom: 40,
                  width: "100%",
                  height: "98%",
                }}
              >
                {discussionsData.length == 0 ? (
                  /** No discussions message */

                  <View
                    className="flex-col items-center content-center justify-between"
                    style={{
                      gap: 10,
                      paddingBottom: 10,
                      width: "100%",
                      height: "90%",
                    }}
                  >
                    <View
                      className="flex-col items-center content-center justify-center "
                      style={{
                        gap: 5,
                        paddingBottom: 20,
                        width: "80%",
                        height: "80%",
                      }}
                    >
                      <Image
                        source={discussionsPlaceHolder}
                        style={{ width: "85%", height: "85%" }}
                      />
                      <Text
                        className="font-semibold"
                        style={{
                          fontSize: 20,
                          color: colors.smokeBlack,
                          fontWeight: "400",
                        }}
                      >
                        Vous n'avez aucune discussion
                      </Text>
                    </View>

                    <View>
                      <TouchableOpacity
                        style={{
                          borderRadius: 10,
                          paddingHorizontal: 25,
                          paddingVertical: 20,
                          backgroundColor: colors.primary_200,
                          elevation: 3,
                        }}
                      >
                        <Text
                          className="font-semibold "
                          style={{
                            fontSize: 18,
                            color: colors.secondary_btn_bg,
                          }}
                        >
                          Créer une nouvelle discussion
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  /** discussions list */

                  <FlatList
                    ref={flatListRef}
                    data={discussionsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onScroll={({ nativeEvent }) => onScroll(nativeEvent)}
                    scrollEventThrottle={16}
                    keyboardDismissMode="on-drag"
                    style={{
                      width: "100%",
                    }}
                  />
                )}
              </View>

              {/** New discussion Button */}

              <AnimatedFAB
                icon="plus"
                label="Nouvelle"
                animateFrom="right"
                extended={isExtended}
                visible={true}
                iconMode="dynamic"
                color={colors.secondary_btn_bg}
                style={styles.fabStyle}
                customStyle={styles.customStyle}
                onPress={newDiscussion}
              />

              {/** ---------------------------------------------------------- */}

              {/** Modal pour afficher les contacts */}

              <Modal
                animationType="slide"
                transparent={true}
                visible={isContactsModalVisible}
                onRequestClose={hideContactsModal}
              >
                <View style={styles.modalContainer}>

                  <View style={styles.modalHeader}>

                    {/* Bouton pour fermer le modal */}
                    <TouchableOpacity
                      style={styles.modalCloseButton}
                      onPress={hideContactsModal}
                    >
                      <Icon
                        name="arrow-back"
                        size={25}
                        style={{ color: colors.pureWhite }}
                      />
                    </TouchableOpacity>

                    {/* Titre du modal */}
                    <Text style={styles.modalTitle}>Avec qui voulez-vous discuter ?</Text>


                  </View>

                  {/* Affichage de la liste des contacts */}

                  {/** Bouton pour Ajouter un nouveau contact */}
                  <TouchableOpacity style={styles.addNewContactButtonContainer} onPress={() => setIsAddContactModalVisible(true)}>
                    <TouchableOpacity style={styles.addNewContactButton}>
                      <Icon name="person-add" size={25} color={colors.secondary_btn_bg} />
                    </TouchableOpacity>

                    <Text style={styles.addNewContactButtonText}>Ajouter un contact</Text>
                  </TouchableOpacity>

                  <ContactList />

                </View>
              </Modal>

              {/** Modal d'ajout d'un contact */}
              <AddContactModal
                visible={isAddContactModalVisible}
                onClose={() => setIsAddContactModalVisible(false)}
                onAdd={handleAddContact}
              />


            </DataContainer>
          </View>
        </Pressable>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTextStyle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  avatarContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  fabStyle: {
    bottom: 40,
    right: 20,
    position: "absolute",
    backgroundColor: colors.primary,
  },
  customStyle: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addNewContactButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.secondary_btn_bg,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  addNewContactButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addNewContactButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  modalHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.primary,
  },
  modalCloseButton: {
    padding: 10,
  },
  modalTitle: {
    fontSize: 24,
    color: colors.pureWhite,
    fontWeight: "bold",
  },
});
