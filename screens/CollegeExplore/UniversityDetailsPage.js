import { Box, useToast, Flex, Button, VStack, Modal, FormControl, Input, Select, CheckIcon, Center, WarningOutlineIcon } from 'native-base'
import UniversityDetails from '../../components/UniversityDetails';
import { useState } from 'react';
import constants from '../../constants';

export default function UniversityDetailsPage({ id, authKey, route, navigation }) {
  const toast = useToast();
  const { data } = route.params;
  const [type, setType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    setShowModal(false);
    const payload = {
      universityId: data.id,
      studentId: id,
      type
    };

    postOpting(authKey, payload)
      .then(({ isError, message, data }) => {
        console.log({ data, isError, message })
        if (!isError) {
          navigation.navigate('Opted')
        }
        toast.show({
          render: () => (
            <Box px="2" py="1" rounded="sm" mb={5} bgColor={isError ? 'red.600' : 'green.600'} _text={{ color: 'white' }}>
              {message}
            </Box>
          )
        });
      })
  }

  return (
    <Flex flex={1} p={5}>
      <UniversityDetails data={data} />
      <VStack space={2} pt={4}>
        <Button onPress={() => { setShowModal(true); console.log(data) }}>Apply</Button>
        <Button onPress={navigation.goBack}>GO Back</Button>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Select Option</Modal.Header>
          <Modal.Body>
            <Center>
              <FormControl w="3/4" maxW="300" isRequired isInvalid={!type}>
                <FormControl.Label>Choose Type</FormControl.Label>
                <Select minWidth="200" accessibilityLabel="Choose Type" placeholder="Choose Type" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />
                }} mt="1" onValueChange={val => setType(val)}>
                  <Select.Item label="Target" value="target" />
                  <Select.Item label="Reach" value="reach" />
                  <Select.Item label="Safety" value="safety" />
                </Select>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  Please make a selection!
                </FormControl.ErrorMessage>
              </FormControl>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onPress={() => handleSubmit(authKey)}>
                Apply
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Flex>
  )
}


async function postOpting(authKey, payload) {
  try {
    const res = await fetch(`${constants.BACKEND_URL}/student/addOption/`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${authKey}`,
        'Content-type': 'application/json',
      },
    });

    console.log({ status: res.status, headers: res.headers });
    const json = await res.json();
    console.log(json)
    if (!res.ok) {
      return {
        isError: true,
        message: json.error
      }
    }

    return {
      data: json,
      isError: false,
      message: json.message || 'Successfully added opting',
    }
  } catch (error) {
    return {
      isError: true,
      message: error.message || 'Failed!'
    }
  }
}
