import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

export default ({ text, done, onToggleCheck, onDeleteTask }) =>
  <View style={styles.container}>
    <CheckBox
      checked={done}
      onPress={onToggleCheck}
      containerStyle={styles.checkBox}
    />
    <View style={styles.wrapper}>
      <Text>{text}</Text>
    </View>
    <Icon
      name="clear"
      onPress={onDeleteTask}
      iconStyle={styles.icon}
    />
  </View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  icon: {
    padding: 10,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});