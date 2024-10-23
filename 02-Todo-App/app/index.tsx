import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Alert, ScrollView } from "react-native";

interface ItemProps {
  title: string;
  index: number;
}

let deleteTodo: Function;

const Item = ({ title, index }: ItemProps) => (
  <View style={Todoitem}>
    <Text style={TodoTitle}>{title}</Text>
    <TouchableOpacity style={TodoDeleteButton}>
      <Text style={TodoDeleteButtonText} onPress={() => deleteTodo(index)}>Delete</Text>
    </TouchableOpacity>
  </View>
);

export default function Index() {

  // State For Getting Text
  const [text, setText] = useState<string>("");
  // State For Getting Todo List Items 
  const [todo, setTodo] = useState<string[]>(["Hello"]);

  const addTodo = (): void => {
    const isTodoExists = todo.some(item => item === text);
    if (text) {
      if (!isTodoExists) {
        todo.push(text);
        setTodo([...todo]);
        setText("");
      } else {
        Alert.alert("Message", "This Item Is Already Exists..");
      };
    } else {
      Alert.alert("Message", "Please Enter An Item To Add...")
    };
  };

  deleteTodo = (index: number): void => {
    todo.splice(index, 1);
    setTodo([...todo]);
  }

  return (
    <View style={TodoContainer}>
      <Text style={TodoHeading}>Todo App.</Text>
      <TextInput placeholder="Enter Todo" style={TodoInput} value={text} onChangeText={setText}></TextInput>
      <TouchableOpacity style={TodoButton} onPress={addTodo}>
        <Text style={TodoButtonText}>Add Item</Text>
      </TouchableOpacity>
      {todo.length > 0 && <ScrollView style={TodoScrollView}>
        <FlatList
          data={todo}
          renderItem={({ item, index }) => {
            return <Item title={item} index={index} />
          }}
        />
      </ScrollView>
      }
    </View>
  );
}

const { TodoContainer, TodoHeading, TodoInput, TodoButton, TodoButtonText, Todoitem, TodoTitle, TodoDeleteButton, TodoDeleteButtonText, TodoScrollView } = StyleSheet.create({
  TodoContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 20,
  },
  TodoHeading: {
    textAlign: "center",
    fontSize: 25,
    color: "yellow",
  },
  TodoInput: {
    height: 40,
    marginHorizontal: 12,
    marginVertical: 8,
    borderWidth: 3,
    borderColor: "yellow",
    padding: 10,
    color: "white",
  },
  TodoButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    marginHorizontal: 12,
    padding: 7.75,
  },
  TodoButtonText: {
    fontSize: 18,
  },
  TodoScrollView: {
    marginTop: 20,
  },
  Todoitem: {
    backgroundColor: '#f9c2ff',
    marginHorizontal: 12,
    marginBottom: 15,
  },
  TodoTitle: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 20,
  },
  TodoDeleteButton: {
    backgroundColor: "blue",
    margin: 10,
  },
  TodoDeleteButtonText: {
    color: "white",
    textAlign: "center",
    padding: 5,
    fontSize: 20,
  }
})