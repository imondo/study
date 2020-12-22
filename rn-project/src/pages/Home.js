import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';

export default ({ navigation }) => {
  return <View style={styles.container}>
    <Text>主页</Text>
    <Button title="go details" onPress={() => {
      navigation.navigate('Details')
    }}/>
  </View>
}