import React, { createContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const GameContext = createContext();

export default function App() {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Make 10 clicks', goal: 10, current: 0, completed: false },
    { id: '2', title: 'Make 5 double clicks', goal: 5, current: 0, completed: false },
    { id: '3', title: 'Hold object for 3 seconds', goal: 1, current: 0, completed: false },
    { id: '4', title: 'Drag object', goal: 1, current: 0, completed: false },
    { id: '5', title: 'Swipe right', goal: 1, current: 0, completed: false },
    { id: '6', title: 'Swipe left', goal: 1, current: 0, completed: false },
    { id: '7', title: 'Resize object', goal: 1, current: 0, completed: false },
    { id: '8', title: 'Earn 100 points', goal: 100, current: 0, completed: false },
  ]);

  const updateTaskProgress = (taskId, increment) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              current: Math.min(task.current + increment, task.goal),
              completed: task.current + increment >= task.goal,
            }
          : task
      )
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameContext.Provider value={{ score, setScore, tasks, updateTaskProgress }}>
        <NavigationContainer>
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </NavigationContainer>
      </GameContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});