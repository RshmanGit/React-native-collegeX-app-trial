import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Box, Text, Flex, Select, Center, HStack, ScrollView, VStack } from 'native-base'
import { Calendar } from 'react-native-calendars';
import constants from '../constants';

const lookupDay = (num) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (num < 0 || num > 6) return ''

  return days[num]
}

const CalenderComp = ({ keyDates, setActiveDate, markedDates }) => {
  return (
    <Box mt={4}>
      <Calendar
        firstDay={0}
        hideExtraDays={true}
        enableSwipeMonths={true}
        onDayPress={day => {
          setActiveDate(day.dateString)
        }}
        monthFormat={'yyyy MM'}
        onMonthChange={month => {
          setActiveDate(month.dateString)
        }}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        markedDates={markedDates}
      />
    </Box>
  )
}

// create a component
export default function HomeScreen({ id, authKey }) {
  const [keyDates, setKeyDates] = useState([])
  const [activeDate, setActiveDate] = useState();
  const [markedDates, setMarkedDates] = useState({});

  // copied form stackoverflow 
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    fetch(
      `${constants.BACKEND_URL}/keyDate/?studentId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${authKey}`
        }
      }
    )
      .then(res => res.json())
      .then((response) => {
        const data = response.data.reduce((acc, keyDate) => {
          const date = new Date(keyDate.endDate).getDate().toString().padStart(2, '0');
          const month = new Date(keyDate.endDate).getMonth().toString().padStart(2, '0');
          const year = new Date(keyDate.endDate).getFullYear().toString().padStart(4, '0');
          const str = `${year}-${month}-${date}`;

          if (!Array.isArray(acc[str])) {
            acc[str] = []
          }

          acc[str].push({
            id: keyDate.id,
            title: keyDate.title,
            date: keyDate.endDate,
            description: keyDate.description,
            universityId: keyDate.universityId,
          })

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

        setKeyDates(data)
        setMarkedDates(markedDates)
      })
      .catch(console.error)
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Flex direction='column' flex={1} w='100%' textAlign='center'>
        <CalenderComp setActiveDate={setActiveDate} keyDates={keyDates} />
        <Box w='100%' flex={1} borderTopWidth={1} borderTopColor='black'>
          {activeDate && (
            <Flex h='100%' direction='row' padding='3.5'>
              <Box h='100%' pr={3} borderRightColor={'gray.400'} borderRightWidth={1}>
                {lookupDay(new Date(activeDate).getDay())}
                <Box borderRadius={'full'} p='1.5' w={8} h={8} backgroundColor='blue.500' _text={{ color: 'white' }}>
                  {new Date(activeDate).getDate()}
                </Box>
              </Box>

              <ScrollView>
                <VStack space={3} px={2} py={3}>
                  {Object.entries(keyDates).map(([name, keyDate]) => {

                    if (activeDate === name)
                      return (
                        keyDate.map((kd, i) => (
                          <TouchableOpacity >
                            <Box textAlign={'start'} borderRadius={'lg'} p={4} backgroundColor='gray.200' key={i} >
                              <Text fontSize='lg' fontWeight='bold'>
                                {kd.title}
                              </Text>
                              <Text>
                                {kd.description}
                              </Text>
                            </Box>
                          </TouchableOpacity>
                        ))
                      )

                    return 'No tasks for you.. Enjoy!!'
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
