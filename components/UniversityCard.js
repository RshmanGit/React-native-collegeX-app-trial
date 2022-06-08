import { Box, Text, Button, Avatar, HStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

export default function UniversityCard({ handleCardClick, data, showButton, buttonText, handleButtonClick, color = 'white' }) {
  return (
    <TouchableOpacity
      onPress={handleCardClick}>
      <Box bg={color} _text={{ color: 'black' }} borderRadius="lg" p={4}>
        <HStack
          space={4}
          borderRadius="md"
          direction="row">
          <Avatar source={{ uri: data.avatar }}>U</Avatar>
          <Box flexWrap='wrap'>
            <Text fontSize="lg" fontWeight="bold">
              {data.name}
            </Text>
            <Text fontSize="md">{data.countyName}</Text>
            {showButton && <Button
              mt={2}
              px={4}
              color="black"
              borderRadius="lg"
              alignSelf="flex-start"
              bg="rgba(91, 94, 95, 0.4)"
              onPress={() => handleButtonClick(data)}
            >
              {buttonText}
            </Button>}
          </Box>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}