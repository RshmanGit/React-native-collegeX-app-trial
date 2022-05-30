import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import OptedScreen from './screens/OptedScreen';
// import ChatBotScreen from './screens/ChatBotScreen';
import ProfileScreen from './screens/ProfileScreen/StackNavigator';
// import SettingsScreen from './screens/SettingsScreen';
// import SplashScreen from 'react-native-splash-screen';
import { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createMaterialBottomTabNavigator();

function MyTabs({ authKey, id }) {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Icon name="home" size={25} color="white" />,
        }}>
        {props => <HomeScreen {...props} authKey={authKey} id={id} />}
      </Tab.Screen>

      <Tab.Screen
        name="Opted"
        options={{
          tabBarLabel: 'Opted',
          tabBarIcon: () => <Icon name="school" size={25} color="white" />,
        }}>
        {props => <OptedScreen {...props} id={id} authKey={authKey} />}
      </Tab.Screen>

      {/* <Tab.Screen
        name="ChatBot"
        options={{
          tabBarLabel: 'Chatbot',
          tabBarIcon: () => (
            <Icon name="robot" size={25} color="white" />
          ),
        }}>
        {props => <ChatBotScreen {...props} authKey={authKey} id={id} />}
      </Tab.Screen> */}

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <Icon name="account" size={25} color="white" />,
        }}>
        {props => <ProfileScreen {...props} authKey={authKey} id={id} />}
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [id, setId] = useState(null);
  const [authKey, setAuthKey] = useState('');

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {!isLoggedIn && hasAccount && (
          <LoginScreen
            setIsLoggedIn={setIsLoggedIn}
            setHasAccount={setHasAccount}
            setId={setId}
            setAuthKey={setAuthKey}
          />
        )}
        {!hasAccount && <SignUpScreen setHasAccount={setHasAccount} />}
        {isLoggedIn && hasAccount && <MyTabs id={id} authKey={authKey} />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
