import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DiscussionSubScreen from './DiscussionSubScreen';
import CommunityScreen from './CommunityScreen'
import EnterpriseScreen from '../Entreprise/EnterpriseScreen';
import colors from '../../components/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();

const TabArr = [
  { id: 1, route: 'Discussions', label: 'Discussions', activeIcon: 'chatbox-ellipses', inactiveIcon: 'chatbox-ellipses-outline', component: DiscussionSubScreen },
  { id: 3, route: 'Communautés', label: 'Communautés', activeIcon: 'people', inactiveIcon: 'people-outline', component: CommunityScreen },
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