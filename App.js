import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="What do you want to do?"
        />
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
});
