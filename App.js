import React from 'react';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import uuid from 'uuid';
import Todo from './Todo.js';

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
  toggleCheck = key => {
    this.setState(({todos}) => ({
      todos: todos.map(todo => {
        if (todo.key === key) {
          todo.done = !todo.done;
        }
        return todo;
      }),
    }));
  }
  deleteTask = key => {
    this.setState(({todos}) => ({
      todos: todos.filter(todo => todo.key !== key),
    }));
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <FlatList
          data={this.state.todos}
          renderItem={({item}) =>
            <Todo
              text={item.text}
              done={item.done}
              onToggleCheck={() => this.toggleCheck(item.key)}
              onDeleteTask={() => this.deleteTask(item.key)}
            />}
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
