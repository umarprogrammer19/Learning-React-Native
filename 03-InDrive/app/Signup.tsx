import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './Config/Firebaseconfig';

const signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  const register = () => {
    setLoading(true); 
    console.log(email);
    console.log(password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/Page/Home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      })
      .finally(() => {
        setLoading(false); 
      });

    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <SafeAreaView className='bg-[#3f3f3f] flex-1'>
      <View>
        <Text className='text-center mt-10 text-3xl text-[#c1f11d] font-semibold'>Register</Text>
        <View className='p-3 mt-7 w-[300px] m-auto'>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder='Enter your name'
            placeholderTextColor="#FFFFFF"
            className='border border-[#c1f11d]'
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder='Enter your mail'
            placeholderTextColor="#FFFFFF"
            className='border border-[#c1f11d] lowercase'
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder='Enter your password'
            placeholderTextColor="#FFFFFF"
            className='border border-[#c1f11d]'
          />
          
          
          {loading ? (
            <ActivityIndicator size="large" color="#c1f11d" />
          ) : (
            <TouchableOpacity onPress={register} style={styles.button}>
              <Text style={{ color: 'black' }}>Register</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default signup;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#c1f11d',
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
});
