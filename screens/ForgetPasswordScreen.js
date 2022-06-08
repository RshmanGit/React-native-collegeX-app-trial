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

// Takes navigation props
export default function ForgetPasswordScreen({ navigation }) {
  const toast = useToast();
  
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(4).max(14, 'Password should not excced 14 chars.').required(),
        confirmPassword: yup.string().min(4).max(14, 'Password should not excced 14 chars.').required(),
      })}>
      {({ values, handleChange, errors, setFieldTouched, touched, isValid }) => (
        <Box bgColor="#009be5" py="40%">
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="xl"
                fontWeight="800"
                color="white"
                _dark={{ color: 'white'}}>
                <Text>Forgot Password</Text>
              </Heading>
              <Text color='white'>Your new password must be different from previous used password</Text>

              <VStack space={3} mt="5">
                {/* email field */}
                <FormControl color="white">
                  <FormControl.Label>
                    <Text style={{ color: 'white' }}>Email ID</Text>
                  </FormControl.Label>
                  <Input
                    color="black"
                    bgColor="white"
                    placeholder="Enter Email Here"
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

                {/* new password */}
                <FormControl>
                  <FormControl.Label>
                    <Text style={{ color: 'white' }}>New Password</Text>
                  </FormControl.Label>
                  <Input
                    type="password"
                    bgColor="white"
                    color="black"
                    placeholder="Enter Password Here"
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

                {/* confirm password */}
                <FormControl>
                  <FormControl.Label>
                    <Text style={{ color: 'white' }}>Confirm Password</Text>
                  </FormControl.Label>
                  <Input
                    type="password"
                    bgColor="white"
                    color="black"
                    placeholder="Confirm Passwrod"
                    value={values.password}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={() => setFieldTouched('confirmPassword')}
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
                  onPress={() => toast.show({
                    render: () => <Box px="2" py="1" rounded="sm" mb={5} bgColor='red.600' _text={{ color: 'white' }}>Not implemented</Box>
                  })}>
                  <Text style={{ color: '#009be5' }}>Reset password</Text>
                </Button>

                <HStack space={4} pt={2} justifyContent='center' alignItems='center'>
                  <Text color='white'>Head back to</Text>
                  <Link onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text color='white' fontWeight='bold' underline>Signup</Text>
                  </Link>
                  <Link onPress={() => navigation.navigate('LoginScreen')}>
                    <Text color='white' fontWeight='bold' underline>Login</Text>
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </Box>
      )}
    </Formik>
  )
}