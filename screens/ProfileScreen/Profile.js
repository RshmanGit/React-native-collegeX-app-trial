import React from 'react';
import { Avatar, Flex, Text, Box, Icon, Button, VStack, Heading } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

// gets all props of stacknavigator + those passed by us and render student details
export default function Profile({ info, navigation, logout }) {
  return (
    <Flex flex={1} bg='white' p={12} >
      <Heading pb={12}>Profile</Heading>
      <VStack space={4}>
        <Flex direction='row' alignItems='center'>
          {/* stuedent avatar need to go in the url */}
          <Avatar size='lg' mr={8} source={{ url: 'https://profile.url' }}>P</Avatar>
          <Box>
            <Text fontSize='lg'>{(info.firstName || '') + ' ' + (info.lastName || '')}</Text>
            <Text>
              {info.email || ''}
              {'  '}
              {info.emailVerified ? <Icon as={FontAwesome} color='green.500' name="check" /> : ''}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Text fontSize='lg' fonWeight='bold'>High School Details</Text>
          <Text>Name: {info.highSchoolName || 'Not specified'}</Text>
          <Text>District: {info.highSchoolDistrict || 'Not specified'}</Text>
        </Box>
        <Flex direction='row'>
          <Button borderRadius={'lg'} mr={4} onPress={() => navigation.navigate('Edit Profile')}>Update Profile</Button>
          <Button borderRadius={'lg'} colorScheme='gray' onPress={logout}>Logout</Button>
        </Flex>
      </VStack>
    </Flex>
  )
}
