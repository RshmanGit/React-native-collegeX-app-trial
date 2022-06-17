import React, { useState, useEffect } from 'react';
import { useToast, Box } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from './Profile';
import EditProfile from './EditProfile';
import constants from '../../constants';

// Create a Stack navigator that renders the profile or edit profile component
const Stack = createStackNavigator();

export default function ProfileScreen({ id, authKey, logout }) {
  // student info storage
  const [info, setInfo] = useState({});
  const toast = useToast();

  // making network request for student details
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
    // <Stack.Navigator initialRouteName='Show Profile' screenOptions={{ header: () => null }}>
    //   <Stack.Screen name="Show Profile">
    //     {(props) => <Profile info={info} navigation={navigation} logout={logout} {...props} />}
    //   </Stack.Screen>
    //   <Stack.Screen name='Edit Profile'>
    //     {(props) => <EditProfile authKey={authKey} id={id} info={info} setInfo={setInfo} navigation={navigation} {...props} />}
    //   </Stack.Screen>
    // </Stack.Navigator>
    <Stack.Navigator initialRouteName='Show Profile' screenOptions={{ header: () => null }}>
       <Stack.Screen name="Show Profile">
          {(props) => <Profile info={info} logout={logout} {...props} />}
        </Stack.Screen>
        <Stack.Screen name='Edit Profile'>
          {(props) => <EditProfile authKey={authKey} id={id} info={info} setInfo={setInfo} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
  );
}
