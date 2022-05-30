/* eslint-disable react-native/no-inline-styles */
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
  useToast
} from 'native-base';
import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import constants from '../constants'

async function signInStudent(values) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    email: values.email,
    password: values.password,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${constants.BACKEND_URL}/student/signin/`,
      requestOptions,
    );

    const result = await res.json();
    if (!res.ok) {
      return {
        isError: true,
        message: result.error,
      }
    }

    return {
      isError: false,
      message: result.message,
      data: result.data
    };
  } catch (err) {
    return {
      isError: true,
      message: error.error || error.message || 'Failed to login'
    }
  }

  // .then(response => {
  //   const json = response.json();
  //   if (!response.ok) {
  //     console.log('response:', response)
  //     throw new Error(response.error)
  //     // console.log({ response, json })
  //     // return {
  //     //   isError: true,
  //     //   message: response.error
  //     // }
  //   }

  //   return json;
  // })
  // .then(result => {
  //   console.log('result: ', result);

  //   return {
  //     isError: false,
  //     data: result.data,
  //     message: 'Succesfully logged in!'
  //   }
  // })
  // // .then(() => {
  // //   toast.show({
  // //     render: () => (
  // //       <Box bg="green.200" px="2" py="1" rounded="sm" mb={5}>login success</Box>
  // //     ),
  // //   });
  // // })
  // .catch(error => {
  //   // toast.show({
  //   //   render() {
  //   //     return <Box>Error: {JSON.stringify(error)}</Box>
  //   //   }
  //   // })
  //   console.log(error)
  //   return {
  //     isError: true,
  //     message: error.error || error.message || 'Failed to login'
  //   }
  // });
}


// create a component
export default function LoginScreen({ setIsLoggedIn, setHasAccount, setId, setAuthKey }) {
  const toast = useToast();
  const handleSignUp = () => {
    setHasAccount(false);
  };
  const handleSubmit = async (values) => {
    const { data, isError, message } = await signInStudent(values, setIsLoggedIn, setAuthKey, setId, toast)
    console.log({ data, isError, message })
    if (!isError) {
      const { authKey, id } = data
      setId(id)
      setAuthKey(authKey)
      setIsLoggedIn(true)
    }
    toast.show({
      render() {
        return <Box px="2" py="1" rounded="sm" mb={5} bgColor={isError ? 'red.600' : 'green.600'} _text={{ color: 'white' }}>{message}</Box>
      }
    })
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required('Please, provide your name!'),
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(4)
          .max(14, 'Password should not excced 14 chars.')
          .required(),
      })}>
      {({ values, handleChange, errors, setFieldTouched, touched, isValid }) => (
        <Box bgColor={'#009be5'} py={'40%'}>
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="xl"
                fontWeight="800"
                color="white"
                _dark={{
                  color: 'white',
                }}>
                <Text>Welcome</Text>
              </Heading>
              <Heading mt="1" color="white" fontWeight="medium" size="xs">
                <Text>Sign in to continue!</Text>
              </Heading>

              <VStack space={3} mt="5">
                <FormControl color="white">
                  <FormControl.Label>
                    <Text style={{ color: 'white' }}>Email ID</Text>
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
                  <Link
                    _text={{
                      fontSize: 'xs',
                      fontWeight: '500',
                      color: 'indigo.500',
                    }}
                    alignSelf="flex-end"
                    mt="1">
                    <Text style={{ color: 'white' }}>Forget Password?</Text>
                  </Link>
                </FormControl>
                <Button
                  mt="2"
                  bg={'white'}
                  onPress={() => handleSubmit(values)}>
                  <Text style={{ color: '#009be5' }}>Sign in</Text>
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text fontSize="sm" color="white">
                    I'm a new user.
                  </Text>
                  <Link
                    _text={{
                      color: 'white',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    onPress={handleSignUp}>
                    <Text style={{ color: 'white' }}> Sign Up</Text>
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </Box>
      )}
    </Formik>
  );
}
