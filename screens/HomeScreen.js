/* eslint-disable react-native/no-inline-styles */
//import liraries
import React from 'react';
import {View, Text} from 'react-native';

// create a component
export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text>Home!</Text>
    </View>
  );
}
