import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  return (
    <View style={TodoContainer}>
      <Text style={TodoHeading}>Todo App.</Text>
      <TextInput placeholder="Enter Todo" style={TodoInput}></TextInput>
    </View>
  );
}

const { TodoContainer, TodoHeading, TodoInput } = StyleSheet.create({
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
  }
})