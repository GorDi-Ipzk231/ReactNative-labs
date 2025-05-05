import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GameContext } from '../App';

export default function CounterDisplay() {
  const { score } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});