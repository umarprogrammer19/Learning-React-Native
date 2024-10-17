import React from "react";
import { View, Text } from "react-native";
export default function Index() {
  return (
    <>
      <View style={{
        backgroundColor: "red",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text style={{
          fontSize: 40,
          color: "white",
        }}>Hello World</Text>
        <Text style={{
          fontSize: 20,
          color: "aqua",
        }}>This Is My First React Native App</Text>
      </View>
    </>
  )
}