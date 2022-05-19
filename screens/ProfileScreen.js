/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useReducer } from 'react';
import { Avatar, Flex, Text, useToast, Box, Icon, Button, VStack, Stack as UIStack, FormControl, Input, ScrollView } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import constants from '../constants';
import { useFormik } from 'formik';

const Stack = createStackNavigator();

// create a component
export default function ProfileScreen({ id, authKey }) {
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
        setInfo(response)
      })
      .catch((error) => {
        toast.show({
          render: () => (
            <Box bg="red.200" px="2" py="1" rounded="sm" mb={5}>
              {error.message}
            </Box>
          )
        });
      })
  }, [])

  useEffect(() => console.log({ info }), [info])

  return (
    <Stack.Navigator>
      <Stack.Screen name='Profile'>
        {({ navigation }) => <Profile info={info} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name='Edit Profile'>
        {({ navigation }) => <EditProfile authKey={authKey} id={id} info={info} setInfo={setInfo} navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function EditProfile({ id, authKey, info, navigation }) {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      firstName: info.firstName || '',
      lastName: info.lastName || '',
      email: info.email || '',
      highSchoolName: info.highSchoolName || '',
      highSchoolDistrict: info.highSchoolDistrict || '',
    },
    onSubmit(values) {
      console.log(values)
      const json = JSON.stringify(values);

      fetch(`${constants.BACKEND_URL}/student/${id}`, {
        method: 'PATCH',
        body: json,
        headers: {
          Authorization: `Bearer ${authKey}`,
          Accept: 'application/json'
        }
      })
        .then(res => res.json())
        .then(response => {
          setInfo(response.data);
          toast.show({
            render: () => (
              <Box bg="green.200" px="2" py="1" rounded="sm" mb={5}>
                {response.message}
              </Box>
            )
          });
        })
        .catch((err) => {
          console.error(err);

          toast.show({
            render: () => (
              <Box bg="red.200" px="2" py="1" rounded="sm" mb={5}>
                Failed to update profile
              </Box>
            )
          });
        })
    }
  })

  return (
    <Flex flex={1} bg='white' p={12}>
      <FormControl>
        <UIStack space={4}>
          <UIStack>
            <FormControl.Label>First Name</FormControl.Label>
            <Input p={2} placeholder='First name' value={formik.values.firstName} onChangeText={(text) => formik.setFieldValue('firstName', text)} />
          </UIStack>
          <UIStack>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input p={2} placeholder='Last name' value={formik.values.lastName} onChangeText={(text) => formik.setFieldValue('lastName', text)} />
          </UIStack>
          <UIStack>
            <FormControl.Label>Email</FormControl.Label>
            <Input p={2} placeholder='email' value={formik.values.email} onChangeText={(text) => formik.setFieldValue('email', text)} />
          </UIStack>
          <UIStack>
            <FormControl.Label>High School Name</FormControl.Label>
            <Input p={2} placeholder='High School Name' value={formik.values.highSchoolName} onChangeText={(text) => formik.setFieldValue('highSchoolName', text)} />
          </UIStack>
          <UIStack>
            <FormControl.Label>High School District</FormControl.Label>
            <Input p={2} placeholder='High School District' value={formik.values.highSchoolDistrict} onChangeText={(text) => formik.setFieldValue('highSchoolDistrict', text)} />
          </UIStack>
        </UIStack>

        <UIStack py={2}>
          <Flex direction='row' gap={2}>
            <Button colorScheme='blue' onPress={formik.handleSubmit}>Submit</Button>
            <Button colorScheme='gray' onPress={navigation.pop}>Discard</Button>
          </Flex>
        </UIStack>
      </FormControl>
    </Flex>
  )
}

function Profile({ info, navigation }) {
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
