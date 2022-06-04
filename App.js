import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardNavigator from './screens/DashboardNavigator';

const LoginStack = createStackNavigator();

// using stack navigator inplace of state
const App = () => {
  // capture the id and authkey of student 
  // this would be used in subsequent requests to server
  const [id, setId] = useState(null);
  const [authKey, setAuthKey] = useState('');

  // well.. logs out the user
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@collegex_credentials');
    } catch (error) {
      console.log(error);
    }

    setId(null);
    setAuthKey('');
    navigator.navigate('LoginScreen');
  }

  // check if admin key and id exists in asyncstorage..
  // if they exist well login them, else show login/signup screen
  const handleLogin = async () => {
    try {
      const cred = await AsyncStorage.getItem('@collegex_credentials');
      const parse = JSON.parse(cred);

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
          navigator.navigate('Dashboard');
        }
      })
  }, [])

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {/* creating a stack navigtor to handle login signup and dashboard screens */}
        <LoginStack.Navigator screenOptions={{ header: () => null }}>
          <LoginStack.Screen name='SignUpScreen'>
            {/* here we need to pass a function which will be called on the SignupScreen render */}
            {(props) => <SignUpScreen {...props} />}
          </LoginStack.Screen>
          <LoginStack.Screen name='LoginScreen'>
            {props => <LoginScreen setId={setId} setAuthKey={setAuthKey}  {...props} />}
          </LoginStack.Screen>
          <LoginStack.Screen name='ForgetPasswordScreen'>
            {props => <ForgetPasswordScreen {...props} />}
          </LoginStack.Screen>
          <LoginStack.Screen name='Dashboard'>
            {props => <DashboardNavigator id={id} authKey={authKey} logout={logout} {...props} />}
          </LoginStack.Screen>
        </LoginStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
