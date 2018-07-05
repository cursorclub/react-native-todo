# react-native-todo
> Example todo list app built with Expo for the Code an App with Cursor workshop

## Steps
#### Each step title links to all the changes made during that step

### [Create a blank project in Expo XDE](https://github.com/cursorclub/react-native-todo/commit/1d41901ffbca511040763e8a48082b06c78c1724)
Once Node.js, Expo XDE, a text editor and the Expo Client are installed, open Expo XDE, create a new project, and select the blank template. This will take a while to finish.

### [Install dependencies](https://github.com/cursorclub/react-native-todo/commit/55bc8aa97406f9ec1903be1d522bd5c22f1e2ca8)
Once the project has opened, press the Project button in XDE and press Open in Cmd. Type `npm install` into the command prompt that opens. NPM is the Node.js Package Manager and it helps keep track of dependencies, the external code that your project depends on to work. Once it is complete, type `npm install uuid react-native-elements` into the command prompt. This installs `uuid`, a random ID generator, and `react-native-elements`, a collection of components like checkboxes and icon buttons which can help our app work better. You'll need to press Restart in XDE once this is finished.

### [Remove centre alignment styles](https://github.com/cursorclub/react-native-todo/commit/0ed50db4d68a47ccf6b3cc9e25d85178562f285f)
Open the project folder in your text editor. In the `container` section of the stylesheet at the bottom of App.js, remove the lines
```JS
alignItems: 'center',
justifyContent: 'center',
```
and add a line at the end of the imports at the top of the file
```JS
import { Constants } from 'expo';
```
and add
```JS
marginTop: Constants.statusBarHeight,
```
to the container styles right after the lines you removed. This aligns the app's content to the top left corner of the screen and makes sure no content is hiding under the status bar.

### [Add a TextInput component](https://github.com/cursorclub/react-native-todo/commit/1aee7047833a08c6963780afff615ddba56f1fee)
Replace the `<Text>` component with a self-closing `<TextInput />` component. Don't forget to import `TextInput` from `'react-native'`. Every component you use must be imported. Add a `placeholder` attribute to the TextInput and give it any text value you want. Once this is complete, your TextInput should look something like this:
```JSX
<TextInput placeholder="What do you want to do?" />
```

### [Add a plus icon beside the TextInput](https://github.com/cursorclub/react-native-todo/commit/1c2c95b5a9cf555ef569704ceed26325e063e0e4)
Import the named export `Icon` from `'react-native-elements'`
```JS
import { Icon } from 'react-native-elements';
```
and add an `<Icon name="add" />` after the `<TextInput />`. Now wrap them in a `<View>` component so they look like this:
```JSX
<View>
  <TextInput placeholder="What do you want to do?" />
  <Icon name="add" />
</View>
```
Now we need to add styles to the text box so that the text box and plus button are on one line. Add a `style={styles.textBox}` property to the `<View>`, a `style={styles.textInput}` prop to the `<TextInput />`, and an `iconStyle={styles.icon}` prop to the `<Icon />`. This new prop syntax, or structure, allows the value of a prop to be the value of a variable in the code instead of just text.

Next, we need to add the styles to the stylesheet. Add these properties to the stylesheet:
```JS
textBox: {
  flexDirection: 'row',
},
textInput: {
  flexGrow: 1,
},
icon: {
  padding: 10,
},
```
This horizontally aligns the components inside the text box, makes the `<TextInput>` expand to fill its container, and adds 10 pixels of space around the button to make it easier to press.

### [Create a constructor and initialize state](https://github.com/cursorclub/react-native-todo/commit/2d3c626393ff2fc4fbfad2ad6dc9ffb53ec05bf1)
Now we are introduced to a new concept in React called state. State is where we store data inside of a component. First we need to create a constructor, a function inside the App class that sets up the component when it is created. We need to call the React.Component constructor, the constructor which creates a component. We can do this by calling super (the class we are extending, in this case React.Component) with our props. Next we need to set this.state to the initial state we want when we start the app. This should look like this:

```JS
constructor(props) {
  super(props);
  this.state = {
    todos: [
      { key: uuid.v4(), done: true, text: 'Host this workshop' },
      { key: uuid.v4(), done: false, text: 'Do something else' },
    ],
  };
}
```

You'll also need to import the default export from `'uuid'` as the variable `uuid`:
```JS
import uuid from 'uuid';
```

### [Output the state with a FlatList](https://github.com/cursorclub/react-native-todo/commit/9b3e2c4e43e57d4764f044b713c7855dfe09fcdf)
Import the named export `FlatList` from `'react-native'` and place a `<FlatList />` at the top of the root, or main, `<View>`. Add a data prop and set it to the value of the `this.state.todos` variable (remember that you'll need to use the curly brace `{}` syntax here). We now need to provide it with a function that can render every item in the list. Curly brace prop syntax also lets you embed any code, even functions. Add a renderItem prop with its value set to `({item}) => <Text>{item.text}</Text>`. At the end of this step, your `<FlatList />` should look like this:
```JSX
<FlatList
  data={this.state.todos}
  renderItem={({item}) => <Text>{item.text}</Text>}
/>
```

### [Link the text box to the state](https://github.com/cursorclub/react-native-todo/commit/185da7969e0a879785c59c9e95b9037dfcb453e8)
Add a new submitTodo arrow function inside of the App class body. It can't be a regular function because it wouldn't know what `this` is. The submitTodo function should look like this:
```JS
submitTodo = () => {
  this.setState(({todos, textInput}) => ({
    todos: [...todos, { key: uuid.v4(), done: false, text: textInput }],
    textInput: '',
  }))
}
```
Notice how we had to use `this.setState` instead of setting the state directly. This is because React needs to know when data changes so it can tell other components to rerender, or redraw themselves. `setState` can either take an object which tells it which properties to replace, or it can take a function which takes the old state and returns the new state. This is what we used here. The `...todos` tells JavaScript that we should 'spread' out the values in the `todos` array, or list, so that they become direct values of the new array.

Edit your `<TextInput>` and `<Icon>` components so that they look like this:
```JS
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
```
We just connected a bunch of action handlers so that every time you change the text, it changes the state, and every time you press enter on your keyboard or press the plus button, it submits the task.

### [Replace the root View with a KeyboardAvoidingView](https://github.com/cursorclub/react-native-todo/commit/12466dfe59ba004ab841f42d04216968330d01f2)
Import the named export `KeyboardAvoidingView` from `'react-native'` and replace the root view with a `<KeyboardAvoidingView>` that has the prop behavior set to `"padding"`. You can now see the textbox when the keyboard is open.

### [Make Todo its own component](https://github.com/cursorclub/react-native-todo/commit/9ccbf5b3f86e5c5d007c3cb683255b4d921cb2b8)
Create a new file in the folder named Todo.js and add this content to it:
```JS
import { React } from 'react';
import { Text } from 'react-native';

export default ({ text }) => <Text>{text}</Text>
```
React components can also be plain functions which take props and return JSX, the language used to write the contents of components. We just wrote a simple React component in 3 lines! Go back to App.js so we can use this new component.

Import the default export from `'./Todo.js'` as the variable Todo. This line should look like this:
```JS
import Todo from './Todo.js';
```
Change `<Text>{item.text}</Text>` in the `renderItem` function to `<Todo text={item.text} />`. We have now mirrored the same functionality as before, but now the Todo is its own component. This will become more important in the next step.

### [Add a checkbox and delete button to the Todo component](https://github.com/cursorclub/react-native-todo/commit/8f8fa732dfd5ac1a0afbd6b2431fed4de29d1629)
First we need to write the functions that are called when tasks are deleted or completed. Add these two arrow functions to the App class body:
```JS
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
```
The `toggleCheck` function toggles the `done` property on the todo which matches the given key and the `deleteTask` function filters the todo list so it contains every todo except the one with the given key.

Now in the `renderItem` function, we need to update the props on the `<Todo />` component so that it can call these functions:
```JSX
<Todo
  text={item.text}
  done={item.done}
  onToggleCheck={() => this.toggleCheck(item.key)}
  onDeleteTask={() => this.deleteTask(item.key)}
/>
```

Go to Todo.js so we can add the new components. Change the contents of Todo.js to this:
```JS
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
    <Text style={styles.text}>{text}</Text>
    <Icon
      name="clear"
      onPress={onDeleteTask}
      iconStyle={styles.icon}
    />
  </View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  text: {
    flexGrow: 1,
  },
  icon: {
    padding: 10,
  },
});
```
We just imported two new components from 'react-native-elements', used them, attached their onPress handlers to the functions we defined in App.js, and styled them.

### [Wrap Text and TextInput in a View to stop them from pushing other components off the screen](https://github.com/cursorclub/react-native-todo/commit/48373367b2fabfde930a0d93e9d12a18a9d6cc16)
One issue we left until the end was that if the title of a todo was too long, it would push the buttons on the right off the edge of the screen. We can fix this by wrapping all Text and TextInput components in View components with the flex property in their styles set to 1.

Wrap the `<Text>` component in Todo.js in a `<View>` and set its style prop to the value of the variable `styles.wrapper`. You can now remove all styles from the text component (its style prop and the text property in the stylesheet). Remove `alignItems: 'center',` from the container styles and add this to the end of the stylesheet:
```JS
wrapper: {
  flex: 1,
  justifyContent: 'center',
},
```

Wrap the `<TextInput />` component in App.js with a `<View>` component and set its style prop to the value of the variable `styles.wrapper`, just like in Todo.js. Add a wrapper property to the end of the stylesheet and set its flex property to 1.

### [Remove the example todos from the initial state](https://github.com/cursorclub/react-native-todo/commit/001ceaee9262d22ae9abec3fa3c70ba602f127cf)
Set todos in the initial state in the constructor to an empty array `[]`.