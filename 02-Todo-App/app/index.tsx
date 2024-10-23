import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Alert, ScrollView, Pressable, Modal } from "react-native";

interface ItemProps {
  title: string;
  index: number;
}

let deleteTodo: Function;
let editTodo: Function;

const Item = ({ title, index }: ItemProps) => (
  <View style={styles.Todoitem}>
    <Text style={styles.TodoTitle}>{title}</Text>
    <TouchableOpacity style={styles.TodoDeleteButton} onPress={() => deleteTodo(index)}>
      <Text style={styles.TodoDeleteButtonText}>Delete</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.TodoEditButton} onPress={() => editTodo(index)}>
      <Text style={styles.TodoEditButtonText}>Edit</Text>
    </TouchableOpacity>
  </View>
);

export default function Index() {

  // State For Getting Text
  const [text, setText] = useState<string>("");
  // State For Getting Todo List Items 
  const [todo, setTodo] = useState<string[]>(["Hello"]);
  // State For Update Todo
  const [updateInput, setUpdateInput] = useState<string>("");

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);

  const addTodo = (): void => {
    const isTodoExists = todo.some(item => item === text);
    if (text) {
      if (!isTodoExists) {
        todo.push(text);
        setTodo([...todo]);
        setText("");
      } else {
        Alert.alert("Message", "This Item Already Exists.");
      }
    } else {
      Alert.alert("Message", "Please Enter An Item To Add.");
    }
  };

  deleteTodo = (index: number): void => {
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  editTodo = (index: number): void => {
    setCurrentEditIndex(index);
    setUpdateInput(todo[index]);
    setModalVisible(true);
  };

  const updateTodo = (): void => {
    if (currentEditIndex !== null && updateInput) {
      const updatedTodos = [...todo];
      updatedTodos[currentEditIndex] = updateInput;
      setTodo(updatedTodos);
      setModalVisible(false);
      setUpdateInput("");
    }
  };

  return (
    <View style={styles.TodoContainer}>
      <Text style={styles.TodoHeading}>Todo App.</Text>
      <TextInput
        placeholder="Enter Todo"
        style={styles.TodoInput}
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.TodoButton} onPress={addTodo}>
        <Text style={styles.TodoButtonText}>Add Item</Text>
      </TouchableOpacity>

      {todo.length > 0 && (
        <ScrollView style={styles.TodoScrollView}>
          <FlatList
            data={todo}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <Item title={item} index={index} />}
          />
        </ScrollView>
      )}

      <View style={styles.TodoCenteredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.TodoCenteredView}>
            <View style={styles.TodoModalView}>
              <Text style={styles.TodoModalText}>Update Todo!</Text>
              <TextInput
                style={styles.TodoUpdateInput}
                onChangeText={setUpdateInput}
                value={updateInput}
              />
              <Pressable
                style={[styles.TodoButton, { marginTop: 10 }]}
                onPress={updateTodo}
              >
                <Text style={styles.TodoButtonText}>Update Todo</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={{ color: "red", marginTop: 10 }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  TodoEditButton: {
    backgroundColor: "green",
    margin: 10,
  },
  TodoEditButtonText: {
    color: "white",
    textAlign: "center",
    padding: 5,
    fontSize: 20,
  },
  TodoCenteredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  TodoModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  TodoModalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  TodoUpdateInput: {
    margin: 20,
    width: 200,
    borderWidth: 1,
  }
});
