import { Box, Flex, HStack, Input, ScrollView, Text, useToast, View, VStack } from "native-base";
import UniversityCard from "../../components/UniversityCard";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import constants from '../../constants'

export default function UniversityList({ authKey, universityList, navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayResult, setDisplayResult] = useState(universityList)
  const toast = useToast();

  // to synchronize for first render
  useEffect(() => {
    setDisplayResult(universityList)
  }, [universityList])

  const handleSearch = () => {
    fetchSearchedUniversity(authKey, searchTerm)
      .then(({ isError, message, data }) => {
        if (!isError) {
          setDisplayResult(data);
        } else {
          toast.show({
            render: () => (
              <Box px="2" py="1" rounded="sm" mb={5} bgColor='red.600' _text={{ color: 'white' }}>
                {message}
              </Box>
            )
          })
        }
      })
  }

  return (
    <Flex px={5} flex={1} background="white">
      <Box py={4}>
        <HStack justifyContent='center' alignItems='center' space={4}>
          <Input placeholder='Search' flex={1} onChangeText={val => setSearchTerm(val)} />
          <Icon size={25} name="magnify" onPress={handleSearch}></Icon>
        </HStack>
      </Box>
      <ScrollView>
        <VStack space={2}>
          {displayResult.map((university, i) =>
            <UniversityCard
              key={i}
              data={university}
              color={'gray.200'}
              handleCardClick={() => navigation.navigate('UniversityDetails', { data: university })}
            />)
          }
        </VStack>
      </ScrollView>
    </Flex>
  )
}

async function fetchSearchedUniversity(authKey, searchTerm) {
  try {
    const res = await fetch(`${constants.BACKEND_URL}/university/?search=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${authKey}`,
        Accept: 'application/json'
      },
    });

    const json = await res.json()
    if (!res.ok) {
      return {
        isError: true,
        message: json.error
      }
    }

    return {
      data: json.universities,
      isError: false,
      message: json.message || 'Successfully fetched universities',
    }
  } catch (error) {
    return {
      isError: true,
      message: error.message || 'Failed to fetch universities'
    }
  }
}
