import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function Index() {
  return (
    <View style={TodoContainer}>
      <Text style={TodoHeading}>Todo App.</Text>
      <TextInput placeholder="Enter Todo" style={TodoInput}></TextInput>
      <TouchableOpacity style={TodoButton}>
        <Text style={TodoButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const { TodoContainer, TodoHeading, TodoInput, TodoButton, TodoButtonText } = StyleSheet.create({
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
  }
})