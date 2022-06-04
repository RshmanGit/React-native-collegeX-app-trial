import { Calendar } from 'react-native-calendars';

export default function CalenderComp ({
  keyDates,
  setActiveDate,
  markedDates,
  setMarkedDates,
}) {
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
