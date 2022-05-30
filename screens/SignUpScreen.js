/* eslint-disable react-native/no-inline-styles */
//import liraries
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  HStack,
  useToast,
  Link,
  VStack,
} from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import constants from '../constants';

async function signUpStudent(values, setHasAccount, toast) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    `${constants.BACKEND_URL}/student/signup/`,
    requestOptions,
  )
    .then(res => res.json())
    .then(res => {
      if (!res.ok) {
        return {
          isError: true,
          message: res.error
        }
      }

      setHasAccount(true);
      return {
        isError: false,
        message: 'Successfully logged in!'
      }
    })
    .catch(err => {
      toast.show({
        render() {
          return <Box>Error signing up: {JSON.stringify(err)}</Box>
        }
      })

      return {
        isError: true,
        message: err.message || 'failed to signup',
      }
    });
}

const SignUpScreen = ({ setHasAccount }) => {
  const toast = useToast();
  const handleSubmit = async (values) => {
    const { isError, message } = await signUpStudent(values, setHasAccount);

    toast.show({
      render() {
        if (isError) {
          return <Box bg='red.600' color='white'>{message}</Box>
        } else {
          return <Box bg='green.600'>{message}</Box>
        }
      }
    })
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }}
      validationSchema={yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(4)
          .max(14, 'Password should not excced 14 chars.')
          .required(),
      })}>
      {({ values, handleChange, errors, setFieldTouched, touched, isValid }) => (
        <Box bgColor={'#009be5'} py={'35%'}>
          <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
              <Heading
                size="xl"
                color="white"
                _dark={{
                  color: 'white',
                }}
                fontWeight="semibold">
                Welcome
              </Heading>
              <Heading
                mt="1"
                color="white"
                _dark={{
                  color: 'white',
                }}
                fontWeight="medium"
                size="xs">
                Sign up to continue!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl color="white">
                  <FormControl.Label color="white">
                    <Text style={{ color: 'white' }}>First Name</Text>
                  </FormControl.Label>
                  <Input
                    bgColor={'white'}
                    color={'black'}
                    placeholder={'Enter Name Here'}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={() => setFieldTouched('firstName')}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={{ fontSize: 12, color: '#FFf' }}>
                      {errors.firstName}
                    </Text>
                  )}
                </FormControl>

                <FormControl color="white">
                  <FormControl.Label color="white">
                    <Text style={{ color: 'white' }}>Last Name</Text>
                  </FormControl.Label>
                  <Input
                    bgColor={'white'}
                    color={'black'}
                    placeholder={'Enter Name Here'}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={() => setFieldTouched('lastName')}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={{ fontSize: 12, color: '#FFf' }}>
                      {errors.lastName}
                    </Text>
                  )}
                </FormControl>

                <FormControl color="white">
                  <FormControl.Label>
                    <Text style={{ color: 'white' }}>Email</Text>
                  </FormControl.Label>
                  <Input
                    bgColor={'white'}
                    color={'black'}
                    placeholder={'Enter Email Here'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={{ fontSize: 12, color: '#FFf' }}>
                      {errors.email}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormControl.Label>
                    <Text style={{ color: 'white' }}>Password</Text>
                  </FormControl.Label>
                  <Input
                    type="password"
                    bgColor={'white'}
                    color={'black'}
                    placeholder={'Enter Password Here'}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password && (
                    <Text style={{ fontSize: 12, color: '#FFf' }}>
                      {errors.password}
                    </Text>
                  )}
                </FormControl>
                <Button
                  mt="2"
                  bg="white"
                  type="submit"
                  onPress={() => handleSubmit(values)}>
                  <Text style={{ color: '#009be5' }}>Sign up</Text>
                </Button>

                <Center>
                  <HStack>
                    <Text style={{ color: 'white' }}>Already have an account? </Text>
                    <Link
                      _text={{
                        color: 'white',
                        fontWeight: 'medium',
                        fontSize: 'sm',
                      }}
                      onPress={() => setHasAccount(true)}>
                      <Text style={{ color: 'white', fontWeight: 'bold', }}>Sign In</Text>
                    </Link>
                  </HStack>
                </Center>
              </VStack>
            </Box>
          </Center>
        </Box>
      )}
    </Formik>
  );
};

//make this component available to the app
export default SignUpScreen;
