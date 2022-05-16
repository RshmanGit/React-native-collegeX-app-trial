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
} from 'native-base';
import React from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';

function signInStudent(values, setIsLoggedIn) {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer 82dbc427-8ece-4575-9148-9b39eb64aa2b',
  );
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

  fetch(
    'https://c6a0-2405-201-200a-3110-14c3-8def-f4a3-790c.in.ngrok.io/student/signin/',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .then(setIsLoggedIn(true))
    .catch(error => console.log('error', error));
}

// create a component
export default function LoginScreen({setIsLoggedIn, setHasAccount}) {
  const handleSignUp = () => {
    setHasAccount(false);
  };
  const handleSubmit = values => {
    // setIsLoggedIn(true);
    signInStudent(values, setIsLoggedIn);
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
      {({values, handleChange, errors, setFieldTouched, touched, isValid}) => (
        <Box bgColor={'#009be5'} py={'35%'}>
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
                    <Text style={{color: 'white'}}>Email ID</Text>
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
                    <Text style={{fontSize: 12, color: '#FFf'}}>
                      {errors.email}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormControl.Label>
                    <Text style={{color: 'white'}}>Password</Text>
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
                    <Text style={{fontSize: 12, color: '#FFf'}}>
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
                    <Text style={{color: 'white'}}>Forget Password?</Text>
                  </Link>
                </FormControl>
                <Button
                  mt="2"
                  bg={'white'}
                  onPress={() => handleSubmit(values)}>
                  <Text style={{color: '#009be5'}}>Sign in</Text>
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
                    <Text style={{color: 'white'}}> Sign Up</Text>
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
          <Text> </Text>
        </Box>
      )}
    </Formik>
  );
}
