import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textBox}>
          <TextInput
            placeholder="What do you want to do?"
            style={styles.textInput}
          />
          <Icon
            name="add"
            iconStyle={styles.icon}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  textBox: {
    flexDirection: 'row',
  },
  textInput: {
    flexGrow: 1,
  },
  icon: {
    padding: 10,
  },
});
