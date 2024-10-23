import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ItemProps {
  title: string;
}

const Item = ({ title }: ItemProps) => (
  <View style={Todoitem}>
    <Text style={TodoTitle}>{title}</Text>
  </View>
);

export default function Index() {

  // State For Getting Text
  const [text, setText] = useState<string>("");
  // State For Getting Todo List Items 
  const [todo, setTodo] = useState<string[]>(["Hello"]);

  const addTodo = (): void => {
    if (text) {
      todo.push(text);
      setTodo([...todo]);
      setText("");
    } else {
      Alert.alert("Message", "Please Enter An Item To Add...")
    }
  }

  return (
    <View style={TodoContainer}>
      <Text style={TodoHeading}>Todo App.</Text>
      <TextInput placeholder="Enter Todo" style={TodoInput} value={text} onChangeText={setText}></TextInput>
      <TouchableOpacity style={TodoButton} onPress={addTodo}>
        <Text style={TodoButtonText}>Add Item</Text>
      </TouchableOpacity>
      {todo.length > 0 && <View>
        <SafeAreaView>
          <FlatList
            data={todo}
            renderItem={({ item }) => <Item title={item} />}
            keyExtractor={index => index}
          />
        </SafeAreaView>
      </View>}

    </View>
  );
}

const { TodoContainer, TodoHeading, TodoInput, TodoButton, TodoButtonText, Todoitem, TodoTitle } = StyleSheet.create({
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
    margin: 12,
    borderWidth: 3,
    borderColor: "yellow",
    padding: 10,
    color: "white",
  },
  TodoButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 12,
    padding: 7.75,
  },
  TodoButtonText: {
    fontSize: 18,
  },
  Todoitem: {
    backgroundColor: '#f9c2ff',
    height: 45,
    marginHorizontal: 12,
    marginBottom: 15,
  },
  TodoTitle: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 20,
  },
})