import {Pressable, Text, StyleSheet} from 'react-native';
import React from 'react';
import Responsive from '../constants/responsive';
import {colors} from '../constants/colors';

const CustomButton = ({title, onPress, style, disabled = false}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        style,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: Responsive.width(10),
    paddingHorizontal: Responsive.width(20),
    borderRadius: Responsive.width(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Responsive.width(5),
  },
  buttonPressed: {
    backgroundColor: colors.primary,
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
    opacity: 0.5,
  },
  buttonText: {
    color: colors.white,
    fontSize: Responsive.width(16),
    fontWeight: '600',
  },
});

export default CustomButton;
