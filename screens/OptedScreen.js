/* eslint-disable react-native/no-inline-styles */
import { Box, ScrollView, Text, Flex, Button, Avatar } from 'native-base';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import constants from '../constants';

const ListFromOptions = ({ title, list, color }) => {
  return (
    <Box m={4}>
      <Text mt="3" fontWeight="extrabold" fontSize="xl">
        {title}
      </Text>
      <Box>
        <Flex gap={2}>
          {list.map((univ, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => console.log('heyy! you pressed the button')}>
              <Flex
                gap={4}
                alignItems="center"
                justifyContent="start"
                borderRadius="md"
                direction="row">
                <Avatar source={{ uri: univ.avatar }}>U</Avatar>
                <Box bg={color} flex={1} borderRadius="lg" p={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    {univ.name}
                  </Text>
                  <Text fontSize="md">{univ.countyName}</Text>
                  <Button mt={2} px={4} color="black" borderRadius="lg" alignSelf="flex-start" bg="rgba(91, 94, 95, 0.4)">
                    Details
                  </Button>
                </Box>
              </Flex>
            </TouchableOpacity>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

// create a component
export default function OptedScreen({ id, authKey }) {
  const [opted, setOpted] = useState({ target: [], reach: [], safety: [] });

  useEffect(() => {
    fetch(`${constants.BACKEND_URL}/student/getOptions`, {
      headers: {
        Authorization: `Bearer ${authKey}`,
      },
    })
      .then(res => res.json())
      .then(response => {
        const { data } = response;
        const opt = data.reduce(
          (acc, d) => {
            const { university, type } = d;
            acc[type].push(university);
            return acc;
          },
          { target: [], reach: [], safety: [] },
        );
        setOpted(opt);
      })
      .catch(console.error);
  }, []);

  return (
    <Flex flex={1} background={'white'}>
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
