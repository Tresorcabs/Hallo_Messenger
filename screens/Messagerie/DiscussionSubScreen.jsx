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
  Modal,
  ScrollView,
  AppState
} from "react-native";
import React, { useState, useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import colors from "../../components/colors";
import myProfile from "../../assets/my.jpg";
import placeholderProfile from "../../assets/placeholder_avatar.png";
import profil1 from "../../assets/profil1.jpg";
import profil2 from "../../assets/profil2.jpg";
import profil3 from "../../assets/profil3.jpg";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import discussionsPlaceHolder from "../../assets/New-message-bro.png";
import { AnimatedFAB } from "react-native-paper";
import HeaderComponent from "../../components/HeaderComponent";
import CustomSearchBar from "../../components/CustomSearchBar";
import DataContainer from "../../components/DataContainer";
import ContactList from "../../components/ContactList";
import AddContactModal from "../../components/AddContactModal";
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import axios from 'axios';
import UserContactList from "../../components/UserContactList";
import { getDiscussions, getProfileInfos, getUserContacts } from "../../api/dataServices";
import moment from "moment/moment";
import NetInfo from "@react-native-community/netinfo";
import { UserProfileContext } from "../../Contexts/UserProfileContext";

export default function DiscussionSubScreen() {
  const navigation = useNavigation();

  //const discussionsData = [
  //   {
  //     id: "1",
  //     contactProfile: profil1,
  //     contactStatut: "En ligne",
  //     contactName: "Romy",
  //     contactPhone: "+237 654 28 55 30",
  //     dernierMessage: "Salut toi ! ",
  //     time: "14 : 00",
  //   },
  //   {
  //     id: "2",
  //     contactProfile: "",
  //     contactStatut: "Hors ligne",
  //     contactName: "",
  //     contactPhone: "+237 698 24 25 36",
  //     dernierMessage:
  //       "La marchandise à été vendue avec succès mon chaud on peut dèja se faire plaisir  ! ",
  //     time: "13 : 20",
  //   },
  //   {
  //     id: "3",
  //     contactProfile: profil3,
  //     contactStatut: "Hors ligne",
  //     contactName: "Louane",
  //     contactPhone: "+237 696 25 25 42",
  //     dernierMessage: "Tu es un chef ",
  //     time: "13 : 45",
  //   },
  //   {
  //     id: "4",
  //     contactProfile: profil2,
  //     contactStatut: "En ligne",
  //     contactName: "Ariane ",
  //     contactPhone: "+237 677 54 12 26",
  //     dernierMessage: "Je t'adore",
  //     time: "13 : 20",
  //   },
  //   {
  //     id: "5",
  //     contactProfile: "",
  //     contactStatut: "En ligne",
  //     contactName: "Andy",
  //     contactPhone: "+237 698 10 46 36",
  //     dernierMessage: "Je veux continuer avec kivyMD ",
  //     time: "13 : 08",
  //   },
  //   {
  //     id: "6",
  //     contactProfile: profil3,
  //     contactStatut: "Hors ligne",
  //     contactName: "Emilie",
  //     contactPhone: "+237 696 20 25 53",
  //     dernierMessage: "Salut toi ! ",
  //     time: "12 : 45",
  //   },
  //   {
  //     id: "7",
  //     contactProfile: profil2,
  //     contactStatut: "En ligne",
  //     contactName: "",
  //     contactPhone: "+237 697 27 23 32",
  //     dernierMessage: "La marchandise à été vendue avec succès ! ",
  //     time: "11 : 06",
  //   },
  //   {
  //     id: "8",
  //     contactProfile: profil1,
  //     contactStatut: "Hors ligne",
  //     contactName: "Fred",
  //     contactPhone: "+237 699 14 22 36",
  //     dernierMessage: "Tu es un chef ",
  //     time: "10 : 00",
  //   },
  //   {
  //     id: "9",
  //     contactProfile: profil3,
  //     contactStatut: "En ligne",
  //     contactName: "Rose ",
  //     contactPhone: "+237 695 34 35 36",
  //     dernierMessage: "Je t'adore",
  //     time: "09 : 30",
  //   },
  //   {
  //     id: "10",
  //     contactProfile: profil2,
  //     contactStatut: "En ligne",
  //     contactName: "",
  //     contactPhone: "+237 653 34 42 36",
  //     dernierMessage: "Je veux continuer avec kivyMD ",
  //     time: "07 : 08",
  //   },
  //];
  //const DISCUSSION_LENGTH = discussionsData.length;

  const [isConnected, setIsConnected] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.log('Token d\'authentification non trouvé');
      throw new Error('Token d\'authentification non trouvé');
    }
    return token;
  }

  useEffect(() => {


    // Requête pour obtenir les informations du profil
    getProfileInfosData();

    // Charger les discussions depuis le serveur ensuite depuis AsyncStorage si elles existent
    getDiscussionsData();
    loadDiscussionsFromStorage();

    //getDiscussionsData();

    // On écoute l'état de la connexion internet 
    const unSubscribeNetInfo = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    })

    // On écoute l'état de l'application (active/en arrière-plan)
    const appStateSubscription = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
    })

    //Intervalle de 10 secondes
    const interval = setInterval(() => {
      //if (isConnected && appState == "active") {
      // Requête pour obtenir les discussions si la connexion est active
      //console.log(" // ------- > [ L'utilisateur est connecté ]; statut connexion : ", isConnected, "; statut application: ", appState);
      //console.log("Liste de contacts de l'utilisateur : ", userContactsData);
      //getProfileInfosData();
      getDiscussionsData();
      loadDiscussionsFromStorage();
      //}
      //else {
      //console.log(" // ------- > [ L'utilisateur n'est pas connecté ]; statut connexion : ", isConnected, "; statut application: ", appState);
      loadDiscussionsFromStorage();
      //}
    }, 2000);

    // Nettoyage de l'intervalle
    return () => {
      appStateSubscription.remove(); // Suppression de l'abonnement à l'état de l'application
      unSubscribeNetInfo(); // Suppression de l'abonnement à l'état de la connexion internet
      clearTimeout(interval); // Suppression de l'intervalle de chargement des messages
    }

    // }, [isConnected, appState]);
  }, []);


  // -------------- Gestion de la messagerie --------------

  const [discussionsData, setDiscussionsData] = useState(null);



  // Fonction pour récupérer et stocker les discussions
  const getDiscussionsData = async () => {
    try {
      const token = await getToken();
      if (token) {

        // Récupération des discussions via votre fonction API
        const data = await getDiscussions();

        // Stockage des données dans l'état local
        //setDiscussionsData(data);

        // Stockage des données dans AsyncStorage
        await AsyncStorage.setItem('discussionsData', JSON.stringify(data));
        //console.log(" // -----> [Discussions provenant de GetDiscussionData] ")
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des discussions:', error);
    }
  };

  // Charger les discussions depuis AsyncStorage si elles existent
  const loadDiscussionsFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('discussionsData');
      if (storedData) {
        //console.log('Chargement des discussions depuis AsyncStorage :', JSON.parse(storedData));

        setDiscussionsData(JSON.parse(storedData));
        //console.log(" // -----> [Discussions provenant de loadDiscussionsFromStorage ] ")
      }
    } catch (error) {
      console.error('Erreur lors du chargement des discussions depuis AsyncStorage:', error);
    }
  };


  {/** ------------ Gestion de l'accès à la messagerie -------------  */ }

  // A chaque lancement de l'application au niveau de la page home, on vérifie le token stocké dans AsyncStorage en l'envoyant au serveur


  const [userProfile, setUserProfile] = useState(null);
  const [userContactsData, setUserContactData] = useState(null)
  // On met à jour les information du contexte de l'utilisateur
  const { userProfileData, updateUserProfileData } = useContext(UserProfileContext);

  const getProfileInfosData = async () => {
    // On vérifie s'il a un token d'authentification sinon on redirige vers la page de connexion
    const token = await getToken();
    if (!token) {
      navigation.navigate("Login");
    }

    const data = await getProfileInfos(navigation);
    setUserProfile(data);
    updateUserProfileData(data)
    console.log("Informations du profil (local):", userProfileData);

  }


  const getUserContactsData = async () => {
    const data = await getUserContacts();
    setUserContactData(data);
    //console.log("user contacts", userContactsData);
  };



  const renderItem = ({ item }) => (
    //console.log(item),
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
          navigation.replace("ChatScreen", {
            discussionId: item.id,
            nom: item.autre_utilisateur.nom,
            phoneNumber: item.autre_utilisateur.numero_de_telephone,
            profile: item.autre_utilisateur.photo_de_profil,
            statut: item.autre_utilisateur.statut,
          })
        }
      >
        {/** Profil image */}
        <TouchableOpacity
          style={{ width: 60, height: 60, borderRadius: 50 }}
          onPress={() =>
            navigation.navigate("userProfile", {
              Nom: item.autre_utilisateur.nom,
              phoneNumber: item.autre_utilisateur.numero_de_telephone,
              profil: item.autre_utilisateur.photo_de_profil,
              statut: item.autre_utilisateur.statut,
            })
          }
        >
          {!item.autre_utilisateur.photo_de_profil ? (
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
              source={{ uri: item.autre_utilisateur.photo_de_profil }}
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
                item.autre_utilisateur.statut === "En ligne" ? colors.statutIndicator : "grey",
            }}
          />
        </TouchableOpacity>

        {/** ---------------------------------------------------------- */}

        {/** Sender Name or number */}
        <View className="flex-col w-full gap-2 overflow-x-hidden">
          <Text className="font-semibold text-black" style={{ fontSize: 18 }}>
            {item.autre_utilisateur.nom === "" ? item.autre_utilisateur.numero_de_telephone : item.autre_utilisateur.nom + " " + item.autre_utilisateur.prenom}
          </Text>

          {/** Message */}
          <View className="overflow-hidden">
            <Text
              className="font-light text-black overflow-x-clip"
              style={{ maxWidth: "70%" }}
            >
              {item.dernier_message.id_expediteur == item.utilisateur_actuel.id ?
                <Text className="font-normal text-black">Vous :   </Text>
                : null}

              {item.dernier_message.contenu?.length > 40
                ? item.dernier_message.contenu.substring(0, 40) + "..." // only first 40 characters
                : item.dernier_message.contenu}
            </Text>
          </View>
          {/** Time */}
          <Text
            className="text-black font-extralight"
            style={{ position: "absolute", right: 100, fontSize: 12 }}
          >
            { // formatted date
              moment(item.dernier_message.date_envoi).format("HH:mm")
            }
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const { width } = Dimensions.get("window");
  const flatListRef = React.useRef(null);
  //const { flatListLength, setFlatListLength } = useState(discussionsData.length);
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
    getUserContactsData();
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
              myProfile={userProfile ? userProfile.photo_de_profil : null}
              avatarStyle={{ width: 30, height: 30, borderRadius: 50 }}
              headerTextStyle={styles.headerTextStyle}
              headerText="Hallo Messenger"
              headerStyle={[
                styles.headerStyle,
                Platform.OS == "ios"
                  ? { height: "12%", paddingHorizontal: 15, marginTop: "5%" }
                  : { height: "10%", paddingHorizontal: 15, marginTop: "5%" },
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
                {discussionsData?.length === 0 ? (
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
                          backgroundColor: colors.primary,
                          elevation: 3,
                        }}
                        onPress={newDiscussion}
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

              {discussionsData?.length !== 0 ?
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
                : null
              }

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

                  {/** UserContactList */}
                  <View style={styles.userContactList}>
                    <View style={styles.userContactListHeader}>
                      <Text style={styles.userContactListHeaderText}>Votre liste de contacts</Text>
                    </View>

                    <View style={styles.userContactListBody}>
                      {userContactsData ?

                        <UserContactList userContactData={userContactsData} discussionsData={discussionsData} onPress={hideContactsModal} />
                        :
                        <View style={styles.noContactsContainer}>
                          <Text style={{ fontSize: 16, color: colors.pureBlack, fontWeight: "600" }}>Il n'y a encore aucun contact enregistré </Text>
                        </View>}

                    </View>
                  </View>

                  <View style={styles.contactList}>
                    <View style={styles.userContactListHeader}>
                      <Text style={styles.userContactListHeaderText}>Vos contacts à inviter</Text>
                    </View>

                    <ContactList />

                  </View>
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
  userContactList: {
    flex: 1,
    backgroundColor: colors.pureWhite,
    marginBottom: 20,
  },
  contactList: {
    flex: 1,
    backgroundColor: colors.pureWhite,
  },
  userContactListHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  userContactListBody: {
    paddingHorizontal: 20,
  },
  userContactListHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noContactsContainer: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});
