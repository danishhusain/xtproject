import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Responsive from '../constants/responsive';
import {colors} from '../constants/colors';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  error,
  style,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  required = false,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          !editable && styles.disabled,
          multiline && {height: numberOfLines * 24},
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : undefined}
        maxLength={maxLength}
        editable={editable}
      />
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Responsive.width(15),
    width: '100%',
  },
  label: {
    fontSize: Responsive.width(14),
    marginBottom: Responsive.width(5),
    color: colors.textPrimary,
    fontWeight: '400',
  },
  required: {
    color: colors.red,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: Responsive.width(4),
    padding: Responsive.width(10),
    fontSize: Responsive.width(14),
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.red,
  },
  disabled: {
    backgroundColor: colors.inputBorder,
    color: colors.placeholderBackground,
  },
  errorText: {
    color: colors.red,
    fontSize: Responsive.width(12),
    marginTop: Responsive.width(4),
  },
});

export default CustomTextInput;
