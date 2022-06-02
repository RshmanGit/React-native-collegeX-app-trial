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
import CollegeExplore from './screens/CollegeExplore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialBottomTabNavigator();

function MyTabs({ authKey, id, logout }) {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Icon name="home" size={25} color="white" />,
        }}>
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
        name="CollegeBrowse"
        options={{
          tabBarLabel: 'Browse College',
          tabBarIcon: () => <Icon name="earth" size={25} color="white" />,
        }}>
        {props => <CollegeExplore {...props} id={id} authKey={authKey} />}
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [id, setId] = useState(null);
  const [authKey, setAuthKey] = useState('');

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@collegex_credentials');
    } catch (error) {
      console.log(error);
    }

    setId(null);
    setAuthKey('');
    setHasAccount(true);
    setIsLoggedIn(false);
  }

  // check if admin key and id exists in asyncstorage..
  // if they exist well login them, else show login/signup screen
  const handleLogin = async () => {
    try {
      const cred = await AsyncStorage.getItem('@collegex_credentials');
      const parse = JSON.parse(cred);
      console.log('sucess!!', parse);

      // since parsing can result into null values
      if (parse) {
        return {
          ...parse,
          isError: false,
        }
      }

      return {
        isError: true,
      }

    } catch (error) {
      return {
        isError: true,
      }
    }
  }

  useEffect(() => {
    handleLogin()
      .then(({ isError, authKey, id }) => {
        if (!isError) {
          setId(id);
          setAuthKey(authKey);
          setIsLoggedIn(true);
          setHasAccount(true);
        }
      })
  }, [])

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
        {isLoggedIn && hasAccount && <MyTabs id={id} authKey={authKey} logout={logout} />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
