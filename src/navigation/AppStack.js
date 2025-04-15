import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from '../constants/screenNames';
import * as Screens from '../screens/index';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <>
      <Stack.Screen name={screenNames.HOME} component={Screens.HomeScreen} />
      <Stack.Screen
        name={screenNames.DETAILS}
        component={Screens.DetailsScreen}
      />
    </>
  );
};

export default AppStack;
