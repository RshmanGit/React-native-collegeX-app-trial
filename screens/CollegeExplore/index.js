
import React, { useState, useEffect } from 'react';
import { useToast, Box } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';

import UniversityListPage from './UniversityListPage';
import UniversityDetailsPage from './UniversityDetailsPage';
import constants from '../../constants';

const Stack = createStackNavigator();

export default function CollegeExplore({ authKey, id }) {
  const toast = useToast();
  const [universityList, setUniversityList] = useState([]);

  useEffect(() => {
    fetchUniversity(authKey)
      .then(({ isError, message, data }) => {
        if (!isError) {
          setUniversityList(data);
        }

        toast.show({
          render: () => (
            <Box px="2" py="1" rounded="sm" mb={5} bgColor={isError ? 'red.600' : 'green.600'} _text={{ color: 'white' }}>
              {message}
            </Box>
          )
        })
      })
  }, [])

  return (
    <Stack.Navigator initialRouteName='UniversityList'>
      <Stack.Screen name="UniversityList">
        {(reactNavigationProps) => <UniversityListPage authKey={authKey} universityList={universityList} {...reactNavigationProps} />}
      </Stack.Screen>
      <Stack.Screen name='UniversityDetails'>
        {(reactNavigationProps) => <UniversityDetailsPage id={id} authKey={authKey} {...reactNavigationProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// utility for fetching university data
async function fetchUniversity(authKey) {
  try {
    const res = await fetch(`${constants.BACKEND_URL}/university/`, {
      headers: {
        Authorization: `Bearer ${authKey}`,
      },
    });

    const json = await res.json()

    if (!res.ok) {
      return {
        isError: true,
        message: json.error
      }
    }

    return {
      data: json.universities,
      isError: false,
      message: json.message || 'Successfully fetched universities',
    }
  } catch (error) {
    return {
      isError: true,
      message: error.message || 'Failed to fetch universities'
    }
  }
}