import React from 'react';
import { StyleSheet, TextInput, View, FlatList, Text, KeyboardAvoidingView } from 'react-native';
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
  submitTodo = () => {
    this.setState(({todos, textInput}) => ({
      todos: [...todos, { key: uuid.v4(), done: false, text: textInput }],
      textInput: '',
    }))
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <FlatList
          data={this.state.todos}
          renderItem={({item}) => <Text>{item.text}</Text>}
        />
        <View style={styles.textBox}>
          <TextInput
            placeholder="What do you want to do?"
            onChangeText={textInput => this.setState({textInput})}
            onSubmitEditing={this.submitTodo}
            value={this.state.textInput}
            style={styles.textInput}
          />
          <Icon
            name="add"
            onPress={this.submitTodo}
            iconStyle={styles.icon}
          />
        </View>
      </KeyboardAvoidingView>
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
