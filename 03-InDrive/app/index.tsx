import { View, Text, SafeAreaView,  } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Index = () => {

 

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.centered}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}><Link href={'/Signup'}>Sign In</Link></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}><Link href={'/Login'}>Login</Link></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#3f3f3f',
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#c1f11d',
    padding: 10,
    marginTop: 10,
    width:200,
    borderRadius:10,
  },
});
