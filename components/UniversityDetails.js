import { Avatar, Flex, Text, Box, Button, VStack } from 'native-base';

// here the data is university Details
export default function UniversityDetails({ data }) {
  return (
    <Box _text={{ color: 'black' }} >
      <VStack space={4}>
        <Flex maxW='100%' direction='row' alignItems='center'>
          {/* I am assuming the avatar is like this. 
              if this is the case no worries. 
              Otherwise just change to the proper url */}
          <Avatar size='lg' mr={8} source={{ url: data.avatar }}>P</Avatar>
          <Text fontSize='lg'>{data.name}</Text>
        </Flex>
        <Box>
          <Text fontSize='lg'>Details</Text>
          <Text>Religious Affiliation: {data.religiousAffiliation || ''}</Text>
          <Text>County Name: {data.countyName || ''}</Text>
        </Box>
        <Box>
          <Text fontSize='lg'>Location</Text>
          <Text fontSize='xs' pb={2}>Map would go here</Text>
          <Text>Longitude: {data.longitude || ''}</Text>
          <Text>Latitude: {data.latitude || ''}</Text>
        </Box>
      </VStack>
    </Box>
  )
}