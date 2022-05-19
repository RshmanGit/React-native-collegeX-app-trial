import React from 'react';
import { Avatar, Flex, Text, Box, Icon, Button, VStack, } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

export default function Profile({ info, navigation }) {
  return (
    <Flex flex={1} bg='white' p={12}>
      <VStack space={4}>
        <Flex direction='row' alignItems='center'>
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
        <Flex direction='row' gap={4}>
          <Button onPress={() => navigation.navigate('Edit Profile')}>Update Profile</Button>
          <Button>Do something</Button>
        </Flex>
      </VStack>
    </Flex>
  )
}
