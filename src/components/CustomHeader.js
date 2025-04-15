import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Header} from '@react-navigation/elements';
import {colors} from '../constants/colors';

const CustomHeader = ({title, count, back}) => {
  return (
    <Header
      title={
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          {typeof count === 'number' && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          )}
        </View>
      }
      back={back}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  badge: {
    backgroundColor: colors.red,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
