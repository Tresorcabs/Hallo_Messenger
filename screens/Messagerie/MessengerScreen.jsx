import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DiscussionSubScreen from './DiscussionSubScreen';
import GroupeScreen from './GroupeScreen'
import EnterpriseScreen from '../Entreprise/EnterpriseScreen';
import SpotScreen from './SpotScreens/SpotScreen';
import colors from '../../components/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

const TabArr = [
  { id: 1, route: 'Discussions', label: 'Discussions', activeIcon: 'chatbox-ellipses', inactiveIcon: 'chatbox-ellipses-outline', component: DiscussionSubScreen },
  { id: 2, route: 'Spots', label: 'Spots', activeIcon: 'flame', inactiveIcon: 'flame-outline', component: SpotScreen },
  { id: 3, route: 'Groupes', label: 'Groupes', activeIcon: 'people', inactiveIcon: 'people-outline', component: GroupeScreen },
  { id: 4, route: 'Entreprise', label: 'Entreprise', activeIcon: 'business', inactiveIcon: 'business-outline', component: EnterpriseScreen },

];

function MessengerScreen() {
  return (
    <Tab.Navigator

      shifting={true}
      activeIndicatorStyle={{ backgroundColor: colors.secondary_btn_bg }}
      activeColor={colors.secondary_btn_bg}

      barStyle={Platform.OS === "android" ? { backgroundColor: colors.primary, bottom: 0, height: "9%", borderTopLeftRadius: 50, borderTopRightRadius: 50, elevation: 5 }
        : { backgroundColor: colors.primary, bottom: 0, height: "10%", borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
    >
      {
        TabArr.map((item, index) => {
          return (
            <Tab.Screen name={item.route} component={item.component}
              key={item.id}
              options={{
                tabBarLabel: item.label,
                tabBarIcon: ({ focused }) => <Icon name={focused ? item.activeIcon : item.inactiveIcon} size={25} color={focused ? colors.primary : colors.secondary_btn_bg} />,

              }}

            />
          )
        })
      }
    </Tab.Navigator>
  );
}
export default MessengerScreen