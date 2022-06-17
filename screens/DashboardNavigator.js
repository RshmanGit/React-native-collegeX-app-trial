import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from './HomeScreen';
import OptedScreen from './OptedScreen';
import ChatBotScreen from './ChatBotScreen';
import ProfileScreen from './ProfileScreen/StackNavigator';
// import SettingsScreen from './SettingsScreen';
// import SplashScreen from 'react-native-splash-screen';
import CollegeExplore from './CollegeExplore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

// create blue tab navigation menu on bottom of screen
// Takes in navigation props, but are not required
// and others which i guess are self explainatory
export default function DashboardNavigator({ authKey, id, logout }) {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Icon name="home" size={25} color="white" />,
        }}>
        {/* Similar to stack navigator,
         tab navigator also accepts a function as a child and calls when needed to render teh screen */}
        {props => <HomeScreen {...props} authKey={authKey} id={id} logout={logout} />}
      </Tab.Screen>

      <Tab.Screen
        name="Opted"
        options={{
          tabBarLabel: 'Opted',
          tabBarIcon: () => <Icon name="school" size={25} color="white" />,
        }}>
        {props => <OptedScreen {...props} id={id} authKey={authKey} />}
      </Tab.Screen>

      <Tab.Screen
        name="ChatBot"
        options={{
          tabBarLabel: 'Chatbot',
          tabBarIcon: () => (
            <Icon name="robot" size={25} color="white" />
          ),
        }}>
        {props => <ChatBotScreen {...props} authKey={authKey} id={id} />}
      </Tab.Screen>

      <Tab.Screen
        name="CollegeBrowse"
        options={{
          tabBarLabel: 'Browse College',
          tabBarIcon: () => <Icon name="earth" size={25} color="white" />,
        }}>
        {props => <CollegeExplore {...props} id={id} authKey={authKey} />}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <Icon name="account" size={25} color="white" />,
        }}>
        {props => <ProfileScreen {...props} authKey={authKey} id={id} logout={logout} />}
      </Tab.Screen>

      {/* <Tab.Screen
        name="Settings"
        component={() => <SettingsScreen authKey={authKey} id={id} />}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <Icon name="tools" size={25} color="white" />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
