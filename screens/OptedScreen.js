/* eslint-disable react-native/no-inline-styles */
import {Box, ScrollView, Text, Flex} from 'native-base';
import React, {useState, useEffect} from 'react';
import constants from '../constants';

const ListFromOptions = ({title, list, color}) => {
  return (
    <Box m={4}>
      <Text mt="3" fontWeight="extrabold" fontSize="xl">
        {title}
      </Text>
      <Box>
        <Flex gap={2}>
          {list.map((univ, i) => (
            <Box
              p={2}
              bgColor={color + '.300'}
              borderRadius="md"
              w="100%"
              background="gray.200"
              key={i}>
              <Text fontSize="lg" fontWeight="bold">
                {univ.name}
              </Text>
              <Text fontSize="md">{univ.countyName}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

// create a component
export default function OptedScreen({id, authKey}) {
  const [opted, setOpted] = useState({target: [], reach: [], safety: []});

  useEffect(() => {
    fetch(`${constants.BACKEND_URL}/student/getOptions`, {
      headers: {
        Authorization: `Bearer ${authKey}`,
      },
    })
      .then(res => res.json())
      .then(response => {
        const {data} = response;
        const opt = data.reduce(
          (acc, d) => {
            const {university, type} = d;
            acc[type].push(university);
            return acc;
          },
          {target: [], reach: [], safety: []},
        );
        setOpted(opt);
      })
      .catch(console.error);
  }, []);

  return (
    <Flex flex={1} background={'white'}>
      <ScrollView>
        <ListFromOptions
          color="red"
          title="Target"
          list={opted.target}></ListFromOptions>
        <ListFromOptions
          color="blue"
          title="Reach"
          list={opted.reach}></ListFromOptions>
        <ListFromOptions
          color="green"
          title="Safety"
          list={opted.safety}></ListFromOptions>
      </ScrollView>
    </Flex>
  );
}
