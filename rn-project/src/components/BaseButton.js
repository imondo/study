import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity
      style={[Styles.button, props.style]}
      onPress={() => props.onPress && props.onPress()}>
      <Text style={Styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  button: {
    // alignSelf: 'flex-start',
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#409EFF',
    color: '#fff',
    borderRadius: 3,
  },
});

export default Button;
