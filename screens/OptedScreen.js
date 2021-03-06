/* eslint-disable react-native/no-inline-styles */
import { Box, ScrollView, Text, Flex, useToast, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import UniversityCard from '../components/UniversityCard';
import constants from '../constants';

// creates the options from the options
const ListFromOptions = ({ title, list, color, handleButtonClick }) => {
  return (
    <Box m={4}>
      <Text mt="3" fontWeight="bold" fontSize="xl">
        {title}
      </Text>
      <Box>
        <VStack space={4}>
          {list.map((univ, i) => (
            <UniversityCard key={i} data={univ} color={color} showButton buttonText='Details' handleButtonClick={handleButtonClick} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

// fetches teh opted colleges..
// takes in the authkey 
// return { isError, data?, message }
async function fetchOptedColleges(authKey) {
  try {
    const res = await fetch(`${constants.BACKEND_URL}/student/getOptions`, {
      headers: {
        Authorization: `Bearer ${authKey}`,
      },
    });

    const json = await res.json()

    // handle non 200 status code
    if (!res.ok) {
      return {
        isError: true,
        message: json.error
      }
    }

    // converted the data into following format
    // { target: [], reach: [], safety: [] }
    const data = json.data.reduce((acc, d) => {
      const { university, type } = d;
      acc[type].push(university);
      return acc;
    }, { target: [], reach: [], safety: [] });

    return {
      data,
      isError: false,
      message: json.message || 'Successfully fetched universities',
    }
  } catch (error) {
    return {
      isError: true,
      message: error.message || 'Failed to fetch opted universities'
    }
  }
}

// create a component
export default function OptedScreen({ id, authKey, navigation }) {
  const toast = useToast();
  const [opted, setOpted] = useState({ target: [], reach: [], safety: [] });

  const showUniversityScreen = (data) => {
    // navigating to UniversityDetails
    // second argument passes the university data.. 
    // so that it can be accesed in the UniversityDetailscompoenent
    navigation.navigate('UniversityDetails', { data })
  }

  useEffect(() => {
    fetchOptedColleges(authKey)
      .then(response => {
        console.log(response)
        const { isError, message, data } = response;

        if (!isError) {
          setOpted(data)
        }

        toast.show({
          render: () => (
            <Box px="2" py="1" rounded="sm" mb={5} bgColor={isError ? 'red.600' : 'green.600'} _text={{ color: 'white' }}>
              {message}
            </Box>
          )
        })
      })
  }, []);

  return (
    <Flex px={5} pt={10} flex={1} background={'white'}>
      <ScrollView>
        <ListFromOptions
          handleButtonClick={showUniversityScreen}
          color="red.200"
          title="Target"
          list={opted.target}></ListFromOptions>
        <ListFromOptions
          handleButtonClick={showUniversityScreen}
          color="blue.200"
          title="Reach"
          list={opted.reach}></ListFromOptions>
        <ListFromOptions
          handleButtonClick={showUniversityScreen}
          color="green.200"
          title="Safety"
          list={opted.safety}></ListFromOptions>
      </ScrollView>
    </Flex>
  );
}
