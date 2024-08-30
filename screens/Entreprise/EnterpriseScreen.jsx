import * as React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import EnterpriseDashboard from './EnterpriseDashboard';
import EnterpriseProjects from './EnterpriseProjects';
import EnterpriseMembers from './EnterpriseMembers';
import colors from '../../components/colors';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-paper';

const Drawer = createDrawerNavigator();

const EnterpriseScreen = () => {

  function CustomDrawerContent(props) { // il s'agit d'un composant de drawer
    return (
      <DrawerContentScrollView {...props}>
        {/** Ajout du nom de l'entreprise , du logo et d'une icône notification en haut des labels de screen */}

        {/* Ajouter des éléments personnalisés directement dans le Drawer */}
        <View style={{ padding: 10, paddingLeft: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: colors.primary, borderBottomWidth: 0.3, marginBottom: 10 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>
            <Icon name="person-circle-outline" size={30} color={colors.primary} />
            <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: '700', color: colors.primary }}>E-Startup</Text>
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
        <Text style={{ color: colors.primary, fontWeight: '700' }}>{label}</Text>
        {badgeCount > 0 && <Badge style={{ backgroundColor: colors.secondary_btn_bg, color: colors.primary, fontSize: 14 }}>{badgeCount}</Badge>}
      </View>
    );
  }
  return (
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
        drawerLabel: () => customDrawerLabel({ label: 'Membres', badgeCount: 3 }),
      }} />
      <Drawer.Screen name='Projets' component={EnterpriseProjects} options={{ drawerIcon: ({ focused, color, size }) => <Icon name={focused ? "folder-open" : "folder-outline"} size={size} color={color} /> }} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: colors.primary,
  },
})
export default EnterpriseScreen