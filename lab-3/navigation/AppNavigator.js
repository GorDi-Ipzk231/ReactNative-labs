import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import TasksScreen from '../screens/TasksScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Clicker Game' }} />
      <Stack.Screen name="Tasks" component={TasksScreen} options={{ title: 'Tasks' }} />
    </Stack.Navigator>
  );
}