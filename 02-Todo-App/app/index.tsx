import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Alert, Pressable, Modal } from "react-native";

interface ItemProps {
  title: string;
  index: number;
}

let deleteTodo: Function;
let editTodo: Function;

const Item = ({ title, index }: ItemProps) => (
  <View style={styles.todoItem}>
    <Text style={styles.todoTitle}>{title}</Text>
    <TouchableOpacity style={styles.todoDeleteButton} onPress={() => deleteTodo(index)}>
      <Text style={styles.todoDeleteButtonText}>Delete</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.todoEditButton} onPress={() => editTodo(index)}>
      <Text style={styles.todoEditButtonText}>Edit</Text>
    </TouchableOpacity>
  </View>
);

export default function Index() {
  const [text, setText] = useState<string>("");
  const [todo, setTodo] = useState<string[]>([]);
  const [updateInput, setUpdateInput] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);

  const addTodo = (): void => {
    const isTodoExists = todo.some(item => item.trim() === text.trim());
    if (text) {
      if (!isTodoExists) {
        todo.push(text.trim());
        setTodo([...todo]);
        setText("");
      } else {
        Alert.alert("Message", "This Item Already Exists.");
      };
    } else {
      Alert.alert("Message", "Please Enter An Item To Add.")
    };
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
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <TextInput placeholder="Enter Todo" placeholderTextColor="#777" style={styles.input} value={text} onChangeText={setText} />
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
      {todo.length > 0 && (
        <FlatList
          data={todo}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <Item title={item} index={index} />}
          contentContainerStyle={styles.scrollView}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Todo</Text>
            <TextInput
              style={styles.updateInput}
              onChangeText={setUpdateInput}
              value={updateInput}
            />
            <Pressable style={styles.modalButton} onPress={updateTodo}>
              <Text style={styles.modalButtonText}>Update</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  heading: {
    textAlign: "center",
    fontSize: 28,
    color: "#f5f5f5",
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#f5f5f5",
    backgroundColor: "#2b2b2b",
    marginBottom: 10,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#6200ea',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollView: {
    marginTop: 20,
  },
  todoItem: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  todoTitle: {
    color: "#f5f5f5",
    fontSize: 18,
    flex: 1,
  },
  todoDeleteButton: {
    backgroundColor: "#ff3b30",
    borderRadius: 6,
    padding: 8,
    marginLeft: 10,
  },
  todoDeleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  todoEditButton: {
    backgroundColor: "#34c759",
    borderRadius: 6,
    padding: 8,
    marginLeft: 10,
  },
  todoEditButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: 300,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  updateInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#444",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#6200ea",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  closeButton: {
    color: "#ff3b30",
    marginTop: 15,
  },
});
