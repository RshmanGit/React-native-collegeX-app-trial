import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import OptedScreen from './screens/OptedScreen';
import ChatBotScreen from './screens/ChatBotScreen';
import ProfileScreen from './screens/ProfileScreen/StackNavigator';
import SettingsScreen from './screens/SettingsScreen';
// import SplashScreen from 'react-native-splash-screen';
import { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

// create a component
// For splash screen, there are many changes done inside the android folder.
//  To change the image, Android > App > Src > main > res > inside all minimap folders, change image.
// Make sure to maintain the name "splash". If it is to be changed, do not use capital letter/s. And change it in required android folders.
const Tab = createMaterialBottomTabNavigator();

function MyTabs({ authKey, id }) {
  return (
    <Tab.Navigator initialRouteName="Profile" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={() => <HomeScreen authKey={authKey} id={id} />}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={25} color="white" />
            // <IconRn name="home" />
          ),
        }} >
      </Tab.Screen>
      <Tab.Screen
        name="Opted"
        component={() => <OptedScreen id={id} authKey={authKey} />}
        options={{
          tabBarLabel: 'Opted',
          tabBarIcon: ({ color, size }) => (
            <Icon name="school" size={25} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="ChatBot"
        component={() => <ChatBotScreen authKey={authKey} id={id} />}
        options={{
          tabBarLabel: 'Chatbot',
          tabBarIcon: ({ color, size }) => (
            <Icon name="robot" size={25} color="white" />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={() => <ProfileScreen authKey={authKey} id={id} />}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={25} color="white" />
          ),
        }}
      />
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
    </Tab.Navigator >
  );
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hasAccount, setHasAccount] = useState(true);
  const [id, setId] = useState(1);
  const [authKey, setAuthKey] = useState('a6398e1b-eaee-4af5-8b08-be5d4b75ad79');

  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {!isLoggedIn && hasAccount && (
          <LoginScreen
            setIsLoggedIn={setIsLoggedIn}
            setHasAccount={setHasAccount}
            // signInStudent={signInStudent}
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
