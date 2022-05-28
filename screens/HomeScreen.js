import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Box, Text, Flex, Center, ScrollView, VStack, Circle } from 'native-base';
import { Calendar } from 'react-native-calendars';
import constants from '../constants';

const lookupDay = num => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (num < 0 || num > 6) return '';

  return days[num];
};

const CalenderComp = ({
  keyDates,
  setActiveDate,
  markedDates,
  setMarkedDates,
}) => {
  return (
    <Box mt={4}>
      <Calendar
        firstDay={0}
        hideExtraDays={true}
        enableSwipeMonths={true}
        onDayPress={day => {
          setActiveDate(day.dateString);
          setMarkedDates({
            [day.dateString]: {
              selected: true,
              selectedColor: '#3B82F6',
              textColor: 'white',
            },
          });
        }}
        onMonthChange={month => {
          setActiveDate(month.dateString);
        }}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#3B82F6',
          'stylesheet.calendar.header': {
            dayHeader: {
              color: '#616061',
              fontWeight: 'bold',
            },
          },
          arrowColor: '#3B82F6',
        }}
      />
    </Box>
  );
};

// create a component
export default function HomeScreen({ id, authKey }) {
  const [keyDates, setKeyDates] = useState([]);
  const [activeDate, setActiveDate] = useState();
  const [markedDates, setMarkedDates] = useState({});

  // copied form stackoverflow
  // function getRandomColor() {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  useEffect(() => {
    fetch(`${constants.BACKEND_URL}/keyDate/?studentId=${id}`, {
      headers: {
        Authorization: `Bearer ${authKey}`,
      },
    })
      .then(res => res.json())
      .then(response => {
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
        <CalenderComp
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
                  {Object.entries(keyDates).map(([name, keyDate]) => {
                    if (activeDate === name)
                      return keyDate.map((kd, i) => (
                        <TouchableOpacity>
                          <Box textAlign="start" borderRadius="lg" p={4} backgroundColor="gray.200" key={i}>
                            <Text fontSize="lg" fontWeight="bold">
                              {kd.title}
                            </Text>
                            <Text>{kd.description}</Text>
                          </Box>
                        </TouchableOpacity>
                      ));

                    return 'No tasks for you.. Enjoy!!';
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
