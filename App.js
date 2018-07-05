import React from 'react';
import { StyleSheet, TextInput, View, FlatList, Text } from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import uuid from 'uuid';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { key: uuid.v4(), done: true, text: 'Host this workshop' },
        { key: uuid.v4(), done: false, text: 'Do something else' },
      ],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.todos}
          renderItem={({item}) => <Text>{item.text}</Text>}
        />
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
