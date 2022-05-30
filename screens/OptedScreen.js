/* eslint-disable react-native/no-inline-styles */
import { Box, ScrollView, Text, Flex, Button, Avatar, useToast, VStack, HStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import constants from '../constants';

const ListFromOptions = ({ title, list, color }) => {
  return (
    <Box m={4}>
      <Text mt="3" fontWeight="bold" fontSize="xl">
        {title}
      </Text>
      <Box>
        <VStack space={4}>
          {list.map((univ, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => console.log('heyy! you pressed the button')}>
              <Box bg={color} borderRadius="lg" p={4}>
                <HStack
                  space={4}
                  // alignItems="center"
                  // justifyContent="start"
                  borderRadius="md"
                  direction="row">
                  <Avatar source={{ uri: univ.avatar }}>U</Avatar>
                  <Box flexWrap='wrap'>
                    <Text fontSize="lg" fontWeight="bold">
                      {univ.name}
                    </Text>
                    <Text fontSize="md">{univ.countyName}</Text>
                    <Button mt={2} px={4} color="black" borderRadius="lg" alignSelf="flex-start" bg="rgba(91, 94, 95, 0.4)">
                      Details
                    </Button>
                  </Box>
                </HStack>
              </Box>
            </TouchableOpacity>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

async function fetchOptedColleges(authKey) {
  try {
    const res = await fetch(`${constants.BACKEND_URL}/student/getOptions`, {
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
export default function OptedScreen({ id, authKey }) {
  const toast = useToast();
  const [opted, setOpted] = useState({ target: [], reach: [], safety: [] });

  useEffect(() => {
    fetchOptedColleges(authKey)
      .then(response => {
        console.log(response)
        const { isError, message, data } = response;

        // console.log({ isError, message, data })
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

    // (async () => {
    // })()
    // fetch(`${constants.BACKEND_URL}/student/getOptions`, {
    //   headers: {
    //     Authorization: `Bearer ${authKey}`,
    //   },
    // })
    //   .then(res => {

    //     res.json()
    //   })
    //   .then(response => {
    //     const { data } = response;
    // const opt = data.reduce(
    //   (acc, d) => {
    //     const { university, type } = d;
    //     acc[type].push(university);
    //     return acc;
    //   },
    //   { target: [], reach: [], safety: [] },
    // );
    //     setOpted(opt);
    //   })
    //   .catch(console.error);
  }, []);

  return (
    <Flex px={5} pt={10} flex={1} background={'white'}>
      <ScrollView>
        <ListFromOptions
          color="red.200"
          title="Target"
          list={opted.target}></ListFromOptions>
        <ListFromOptions
          color="blue.200"
          title="Reach"
          list={opted.reach}></ListFromOptions>
        <ListFromOptions
          color="green.200"
          title="Safety"
          list={opted.safety}></ListFromOptions>
      </ScrollView>
    </Flex>
  );
}
