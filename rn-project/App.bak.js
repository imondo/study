import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BaseButton from './src/components/BaseButton'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="这是个 Button 组件" style={styles.button} />
      <BaseButton title="这是个自定义 Button 组件" style={styles.button}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  }
});
