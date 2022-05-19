import React from 'react';
import { useFormik } from 'formik';
import { Flex, useToast, Box, Button, Stack, FormControl, Input } from 'native-base';

import constants from '../../constants';

export default function EditProfile({ id, authKey, info, navigation }) {
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
        <Stack space={4}>
          <Stack>
            <FormControl.Label>First Name</FormControl.Label>
            <Input p={2} placeholder='First name' value={formik.values.firstName} onChangeText={(text) => formik.setFieldValue('firstName', text)} />
          </Stack>
          <Stack>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input p={2} placeholder='Last name' value={formik.values.lastName} onChangeText={(text) => formik.setFieldValue('lastName', text)} />
          </Stack>
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input p={2} placeholder='email' value={formik.values.email} onChangeText={(text) => formik.setFieldValue('email', text)} />
          </Stack>
          <Stack>
            <FormControl.Label>High School Name</FormControl.Label>
            <Input p={2} placeholder='High School Name' value={formik.values.highSchoolName} onChangeText={(text) => formik.setFieldValue('highSchoolName', text)} />
          </Stack>
          <Stack>
            <FormControl.Label>High School District</FormControl.Label>
            <Input p={2} placeholder='High School District' value={formik.values.highSchoolDistrict} onChangeText={(text) => formik.setFieldValue('highSchoolDistrict', text)} />
          </Stack>
        </Stack>

        <Stack py={2}>
          <Flex direction='row' gap={2}>
            <Button colorScheme='blue' onPress={formik.handleSubmit}>Submit</Button>
            <Button colorScheme='gray' onPress={navigation.pop}>Discard</Button>
          </Flex>
        </Stack>
      </FormControl>
    </Flex>
  )
}
