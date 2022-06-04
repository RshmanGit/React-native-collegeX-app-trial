import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Box, Text, Flex, Center, ScrollView, VStack, Circle } from 'native-base';
import CalenderComponent from '../components/CalenderComponent';
import constants from '../constants';

const lookupDay = num => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (num < 0 || num > 6) return '';
  return days[num];
};


// create a component
export default function HomeScreen({ id, authKey, logout }) {
  const [keyDates, setKeyDates] = useState([]);
  const [activeDate, setActiveDate] = useState();
  const [markedDates, setMarkedDates] = useState({});

  // -- not implemented
  // copied form stackoverflow 
  // for dynamic color generation for calendar highlight
  // function getRandomColor() {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  // this is the first screen that is showed on login
  // so fetching keydates is gaurnteed and if user is logged in with wrong credentials
  // then log him out and show the login screen
  useEffect(() => {
    fetch(`${constants.BACKEND_URL}/keyDate/?studentId=${id}`, {
      headers: {
        Authorization: `Bearer ${authKey}`,
      },
    })
      .then(res => {
        // here is where logout happens
        if (!res.ok && res.status == 401) {
          logout()
        }

        try {
          return res.json();
        } catch (err) {
          return {
            isError: true,
            message: 'Something went wrong! Try logging in again!'
          }
        }
      })
      .then(response => {
        if (!response.data) {
          return
        }
        const data = response.data.reduce((acc, keyDate) => {
          const date = new Date(keyDate.endDate)
            .getDate()
            .toString()
            .padStart(2, '0');
          const month = new Date(keyDate.endDate)
            .getMonth()
            .toString()
            .padStart(2, '0');
          const year = new Date(keyDate.endDate)
            .getFullYear()
            .toString()
            .padStart(4, '0');

          // formatting the way calendar component wants
          const str = `${year}-${month}-${date}`;

          if (!Array.isArray(acc[str])) {
            acc[str] = [];
          }

          acc[str].push({
            id: keyDate.id,
            title: keyDate.title,
            date: keyDate.endDate,
            description: keyDate.description,
            universityId: keyDate.universityId,
          });

          return acc;
        }, {});

        // this part is to highlight the calendar component
        // i was not able to figure it out previously.. 

        // const marked = response.data.reduce((acc, keyDate) => {
        //   const date = new Date(keyDate.endDate).getDate().toString().padStart(2, '0');
        //   const month = new Date(keyDate.endDate).getMonth().toString().padStart(2, '0');
        //   const year = new Date(keyDate.endDate).getFullYear().toString().padStart(4, '0');
        //   const str = `${year}-${month}-${date}`;
        //   acc[str] = { marked: true, selected: true, dotColor: 'blue', selectedColor: 'green' }
        //   return acc;
        // }, {})

        setKeyDates(data);
        setMarkedDates(markedDates);
      })
      .catch(console.error);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Flex direction="column" flex={1} w="100%" textAlign="center">
        <CalenderComponent
          setActiveDate={setActiveDate}
          keyDates={keyDates}
          markedDates={markedDates}
          setMarkedDates={setMarkedDates}
        />
        <Box w="100%" flex={1} borderTopWidth={1} borderTopColor="#ccc">
          {activeDate && (
            <Flex
              flex={1}
              direction="row"
              padding="3.5"
              justifyContent="center">
              <Box
                h="100%"
                pr={3}
                borderRightColor="gray.400"
                borderRightWidth={1}>
                <Center>{lookupDay(new Date(activeDate).getDay())}</Center>
                <Circle size={10} backgroundColor="blue.500">
                  <Text color="white">{new Date(activeDate).getDate()}</Text>
                </Circle>
              </Box>

              <ScrollView>
                <VStack space={3} px={2} py={3}>
                  {Object.entries(keyDates).length > 0 && Object.entries(keyDates).map(([name, keyDate]) => {
                    if (activeDate === name)
                      return keyDate.map((kd, i) => (
                        <TouchableOpacity key={i}>
                          <Box textAlign="start" borderRadius="lg" p={4} backgroundColor="gray.200" key={i}>
                            <Text fontSize="lg" fontWeight="bold">
                              {kd.title}
                            </Text>
                            <Text>{kd.description}</Text>
                          </Box>
                        </TouchableOpacity>
                      ));
                  })}
                </VStack>
              </ScrollView>
            </Flex>
          )}
        </Box>
      </Flex>
    </View>
  );
}
