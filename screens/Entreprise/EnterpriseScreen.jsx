import * as React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import EnterpriseDashboard from './EnterpriseDashboard';
import EnterpriseProjects from './EnterpriseProjects';
import EnterpriseMembers from './EnterpriseMembers';
import colors from '../../components/colors';
import { StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-paper';
import { UserProfileContext } from '../../Contexts/UserProfileContext';
import Carousel from 'react-native-reanimated-carousel';
//import certificationImage from '../../assets/Certification-bro.png';
//import collabImage from '../../assets/Collab.png';
import welcomeImage from '../../assets/welcome.png';
import workImage from '../../assets/Work.png';
import businessImage from '../../assets/Business.png';
import benefitImage from '../../assets/Benefits.png';
//import { certifyAccount } from '../../api/dataServices';
import { useNavigation } from '@react-navigation/native';
import { checkEnterpriseMembership, checkServerConnection, getEnterpriseData } from '../../EntrepriseApi/EntrepriseDataService';
import { useState } from 'react';
import { useEffect } from 'react';
import MemberTaskList from './MemberTaskList';
import EnterpriseCommunicationCanals from './EnterpriseCommunicationCanals';
import { EnterpriseDataContext } from '../../Contexts/EntrepriseDataContext';
import { useContext } from 'react';

const Drawer = createDrawerNavigator();

const EnterpriseScreen = () => {


  // On vérifie si l'utilisateur est certifié pour afficher la partie entreprise
  const { userProfileData, updateUserProfileData } = React.useContext(UserProfileContext);


  const carouselData = [
    {
      id: 1,
      title: 'Bienvenue dans la section Entreprise',
      description: 'La section Entreprise vous permet de suivre vos projets en temps réel et de communiquer avec vos équipes et collaborateurs autour de ces projets. Discutez des avancées, suivez les publications de l\'entreprise, et soyez informé des changements et mises à jour.',
      image: welcomeImage,
    },
    {
      id: 2,
      title: 'De quoi bénéficierez-vous dans cette section ?',
      description: "[b]1. Une fonctionnalité pour le suivi simplifié : [/b] suivre efficacement l'avancement des projets pour suivre l'avancement global du projet \n[b]2. Une fonctionnalité pour la Communication autour des projets :[/b] Les membres de l'équipe peuvent partager des informations, poser des questions, et obtenir des retours sur les projets en cours. \n[b]3. Une fonctionnalité de Publication d'informations publiques :[/b] Les entreprises peuvent publier des informations ou des mises à jour sur leurs projets publics dans l'onglet Communauté. Cela permet de garder les clients et les utilisateurs intéressés informés. ",
      image: benefitImage,
    },
    {
      id: 3,
      title: 'Avantages pour un entrepreneur / une entreprise',
      description: "\t[b]Secteur d'activité: Construction[/b] \n\n\t\tDans l'industrie de la construction, suivez les phases d'un projet en temps réel est essentiel pour le bon déroulement des opérations.La section Entreprise permet à une entreprise de construction de: \n\t\t[b]1. Recevoir des mises à jour sur l'avancement des projets à chaque étape.\n\t\t2. Communiquer rapidement avec les équipes sur le terrain pour signaler les changements de dernière minute.\n\t\t3. Publier des informations sur les projets publics dans l'onglet Communauté, attirant des investisseurs ou des clients intéressés par les projets[/b].",
      image: businessImage,
    },
    {
      id: 4,
      title: 'Comment fonctionne cette section ?',
      description: "1. Vous devrez [b]Certifier votre compte[/b] afin d'accéder à cette section : Il s'agit ici de passer par une étape de vérification de votre identité à travers quelques informations personnelles telles que (l'adresse de domicile, un document d'identification, etc.). \n\n2. Une fois connecté à la section Entreprise, vous pourrez  [b]#[/b]créez ou rejoignez une entreprise, [b]#[/b]créer et suivre l'avancement des projets avec leurs tâches, [b]#[/b]communiquer avec vos collaborateurs, et partager des informations. \n\n3. Vous êtes prêt, alors allons y",
      image: workImage,
      endCard: true,
    }
  ]

  const navigation = useNavigation();

  const [isPartOfEnterprise, setIsPartOfEnterprise] = useState(null);
  const [isConnectedToServer, setIsConnectedToServer] = useState(false);


  useEffect(() => {
    checkUserEnterpriseMembership();
    checkUserServerConnection();

    getEntrepriseData();
  }, []);

  const checkUserServerConnection = async () => {
    const response = await checkServerConnection();
    if (response === 200) {
      setIsConnectedToServer(true);
      console.log("isConnectedToServer : " + isConnectedToServer);
    }
    else {
      setIsConnectedToServer(false);
    }
  }

  const checkUserEnterpriseMembership = async () => {
    const response = await checkEnterpriseMembership();

    if (response.status === 200) {
      setIsPartOfEnterprise(true);
      // Navigate to dashboard if part of enterprise
      navigation.navigate('Enterprise');
    }
    else {
      setIsPartOfEnterprise(false);
    }
  }


  const { updateGeneralData, generalData } = useContext(EnterpriseDataContext);


  const getEntrepriseData = async () => {
    const response = await getEnterpriseData();
    if (response) {
      //console.log(" Réponse de la requête pour les membres:", response);
      updateGeneralData({ enterpriseData: response })

      console.log("enterpriseData:", generalData);
    }
  }




  // Fonction pour rendre le texte en respectant les balises [b][/b]
  const renderBoldText = (text) => {
    // Découper la chaîne en fonction des balises [b] et [/b]
    const parts = text.split(/(\[b\]|\[\/b\])/);

    return parts.map((part, index) => {
      if (part === '[b]') {
        // Commencer une section en gras
        return <Text key={index} style={{ fontWeight: 'bold' }}>{parts[index + 1]}</Text>;
      } else if (part === '[/b]') {
        // Ignorer la balise fermante
        return null;
      } else if (parts[index - 1] !== '[b]') {
        // Si ce n'est pas du texte à rendre en gras, on l'affiche normalement
        return <Text key={index}>{part}</Text>;
      }
      return null; // Ignorer les parties inutiles
    });
  };

  //const [certified, setCertified] = React.useState(null);

  const handleStart = () => {
    console.log("UserProfileData : " + userProfileData);

    if (userProfileData.est_certifie !== false && userProfileData.est_certifie !== null) {
      navigation.navigate('CreateEnterpriseScreen');
    }
    else {
      navigation.navigate('CertifyAccountForm')
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />

      {/* Carousel step indicator */}
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <ScrollView>
          <Text style={styles.description}>{renderBoldText(item.description)}</Text>
        </ScrollView>
      </View>



      {/** Continue button */}
      {item.endCard ?
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
        :
        /** Switching left or right to Continue text */
        <View style={styles.arrowContainer}>
          <Icon name="chevron-back-outline" size={20} color={colors.primary} />
          <Text style={styles.arrowText}>Glisser vers la gauche ou la droite pour naviguer</Text>
          <Icon name="chevron-forward-outline" size={20} color={colors.primary} />
        </View>
      }
    </View>
  )

  const width = Dimensions.get('window').width;

  function CustomDrawerContent(props) { // il s'agit d'un composant de drawer
    return (
      <DrawerContentScrollView {...props}>
        {/** Ajout du nom de l'entreprise , du logo et d'une icône notification en haut des labels de screen */}

        {/* Ajouter des éléments personnalisés directement dans le Drawer */}
        <View style={{ padding: 10, paddingLeft: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: colors.primary, borderBottomWidth: 0.3, marginBottom: 10 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>
            <Text style={{ fontSize: 25, marginVertical: 10, fontWeight: '700', color: colors.primary }}>{generalData?.enterpriseData?.nom}</Text>
          </View>

          {/* Ajouter des boutons ou autres éléments */}
          <TouchableOpacity style={{ padding: 10, }}>
            <Icon name="notifications-outline" size={24} color={colors.primary_bold} />
          </TouchableOpacity>
        </View>

        {/* Inclure les items de navigation */}
        <DrawerItemList {...props} />

      </DrawerContentScrollView>
    );
  }

  function customDrawerLabel({ label, badgeCount }) {
    return (


      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
        <Text style={{ color: colors.primary, fontWeight: '500' }}>{label}</Text>
        {badgeCount > 0 && <Badge style={{ backgroundColor: colors.secondary_btn_bg, color: colors.primary, fontSize: 14 }}>{badgeCount}</Badge>}
      </View>
    );
  }
  return (

    userProfileData.est_certifie !== false && userProfileData.est_certifie !== null && isPartOfEnterprise !== null ? (

      <Drawer.Navigator initialRouteName='Dashboard' screenOptions={{
        headerStyle: styles.drawerHeader,
        headerTintColor: colors.pureWhite,
        headerPressColor: colors.secondary_btn_bg,
        drawerActiveBackgroundColor: colors.secondary_btn_bg,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.primary_bold,

      }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name='Tableau de bord' component={EnterpriseDashboard} options={{
          drawerIcon: ({ focused, color, size }) => <Icon name={focused ? "podium" : "podium-outline"} size={size} color={color} />,

        }} />
        <Drawer.Screen name='Membres' component={EnterpriseMembers} options={{
          drawerIcon: ({ focused, color, size }) => <Icon name={focused ? "people" : "people-outline"} size={size} color={color} />,
          drawerLabel: () => customDrawerLabel({ label: 'Membres', badgeCount: generalData?.countMembers }),
        }} />
        <Drawer.Screen name='Projets' component={EnterpriseProjects} options={{
          drawerIcon: ({ focused, color, size }) => <Icon name={focused ? "folder-open" : "folder-outline"} size={size} color={color} />,
          drawerLabel: () => customDrawerLabel({ label: 'Projets', badgeCount: generalData?.countProjects }),
        }} />

        <Drawer.Screen name='Mes tâches' component={MemberTaskList} options={{
          drawerIcon: ({ focused, color, size }) => <Icon name={focused ? "newspaper" : "newspaper-outline"} size={size} color={color} />,
          drawerLabel: () => customDrawerLabel({ label: 'Mes tâches', badgeCount: 0 }),
        }} />

        <Drawer.Screen name='Canaux de discussion' component={EnterpriseCommunicationCanals} options={{
          drawerIcon: ({ focused, color, size }) => <Icon name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"} size={size} color={color} />
        }} />

      </Drawer.Navigator>

    )

      :
      (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Carousel
            data={carouselData}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            width={width}
            mode="horizontal-stack"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            autoplay={false}
            style={{
              width: width,

            }}
          />
        </View>
      )
  )

}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: colors.primary,
  },
  item: {
    height: "100%",
    alignItems: 'center',
    flexDirection: 'column',
    gap: 5,
    padding: 10,
    paddingTop: 40,
    backgroundColor: colors.pureWhite,
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.3,
  },
  image: {
    width: 280,
    height: 280,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    color: colors.primary,
    lineHeight: 25,
  },

  verifiedIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: colors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  arrowText: {
    fontSize: 12,
    color: colors.primary,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 50,
    width: "80%",

  },
  buttonText: {
    color: colors.pureWhite,
    fontWeight: "700"
  }
})
export default EnterpriseScreen