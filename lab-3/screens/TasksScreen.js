import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import TaskItem from '../components/TaskItem';
import { GameContext } from '../App';

export default function TasksScreen({ navigation }) {
  const { tasks } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Back to Main"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});