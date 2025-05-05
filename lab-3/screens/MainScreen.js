import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import CounterDisplay from '../components/CounterDisplay';
import ClickerObject from '../components/ClickerObject';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CounterDisplay />
      <View style={styles.objectContainer}>
        <ClickerObject />
      </View>
      <Button
        title="Go to Tasks"
        onPress={() => navigation.navigate('Tasks')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  objectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});