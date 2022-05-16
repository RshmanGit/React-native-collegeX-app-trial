import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import OptedScreen from './screens/OptedScreen';
import ChatBotScreen from './screens/ChatBotScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import SplashScreen from 'react-native-splash-screen';
import {useEffect, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

// create a component
// For splash screen, there are many changes done inside the android folder.
//  To change the image, Android > App > Src > main > res > inside all minimap folders, change image.
// Make sure to maintain the name "splash". If it is to be changed, do not use capital letter/s. And change it in required android folders.
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={25} color="white" />
            // <IconRn name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="Opted"
        component={OptedScreen}
        options={{
          tabBarLabel: 'Opted',
          tabBarIcon: ({color, size}) => (
            <Icon name="school" size={25} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="ChatBot"
        component={ChatBotScreen}
        options={{
          tabBarLabel: 'Chatbot',
          tabBarIcon: ({color, size}) => (
            <Icon name="robot" size={25} color="white" />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" size={25} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size}) => (
            <Icon name="tools" size={25} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {!isLoggedIn && hasAccount && (
          <LoginScreen
            setIsLoggedIn={setIsLoggedIn}
            setHasAccount={setHasAccount}
          />
        )}
        {!hasAccount && <SignUpScreen setHasAccount={setHasAccount} />}
        {isLoggedIn && hasAccount && <MyTabs />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
