import React, { useState, useEffect } from 'react';
import { useToast, Box } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from './Profile';
import EditProfile from './EditProfile';
import constants from '../../constants';

const Stack = createStackNavigator();

// Create a Stack navigator that renders the profile or edit profile component
export default function ProfileScreen({ id, authKey, logout }) {
  const [info, setInfo] = useState({});
  const toast = useToast();

  useEffect(() => {
    fetch(`${constants.BACKEND_URL}/student/${id}`, {
      headers: {
        Authorization: `Bearer ${authKey}`
      }
    })
      .then(res => res.json())
      .then(response => {
        setInfo(response);
      })
      .catch(error => {
        toast.show({
          render: () => (
            <Box bg="red.200" px="2" py="1" rounded="sm" mb={5}>
              {error.message}
            </Box>
          ),
        });
      });
  }, []);

  return (
    <Stack.Navigator initialRouteName='Show Profile' screenOptions={{ header: () => null }}>
      <Stack.Screen name="Show Profile">
        {({ navigation }) => <Profile info={info} navigation={navigation} logout={logout} />}
      </Stack.Screen>
      <Stack.Screen name='Edit Profile'>
        {({ navigation }) => <EditProfile authKey={authKey} id={id} info={info} setInfo={setInfo} navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
